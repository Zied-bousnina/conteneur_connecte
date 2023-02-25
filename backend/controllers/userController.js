const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js')
const User = require('../models/userModel.js')
var crypto = require('crypto');
var mailer = require('../utils/mailer');
const { generateOtp,verifyOtp } = require('../utils/otp.js');
const validateRegisterInput = require('../validation/Register')
const validateLoginInput = require('../validation/login')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verificationTokenModels = require("../models/verificationToken.models");
const { generateOTP, mailTransport, generateEmailTemplate, plainEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail");
const { isValidObjectId } = require('mongoose');
const { sendError, createRandomBytes } = require("../utils/helper");
const resetTokenModels = require("../models/resetToken.models");
const imageToBase64 = require("image-to-base64");
const multer = require('multer')
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
let responseSent = false;
const authUser = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  try {
    if (isValid) {
      const user = await User.findOne({ email: req.body.email });
      console.log(user)
      if (!user) {
        errors.email = "Email not found";
        responseSent = true;
        return res.status(404).json(errors);
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified:user.verified,
            profile: user.profile
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        responseSent = true;
        return res.header("auth-token", token).status(200).json({ status: true, token: "Bearer " + token });
      } else {
        errors.password = "Password incorrect";
        responseSent = true;
        return res.status(404).json(errors);
      }
    } else {
      responseSent = true;
      return res.status(404).json(errors);
    }
  } catch (error) {
    if (!responseSent) {
      responseSent = true;
      console.log(error);
      console.log("hi")
      return res.status(500).json({success:false, message: "error" });
    }
  }
  
}

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  const {avatar} = req.body;

  console.log(avatar)
  
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      User.findOne({ email: req.body.email })
        .then(async exist => {
          if (exist) {
            res.status(404).json({success:true, email: "Email already exist" })
          } else {
            // req.body.role = "USER"
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
              role: req.body.role
            })

            const OTP = generateOTP()
            const verificationToken = new verificationTokenModels({
              owner: user._id,
              token: OTP
            })
            await verificationToken.save()
              .then(token => {
                console.log(token)
              })
              .catch(err => {
                console.log(err)
              })
              
            mailer.send({
              to: ["zbousnina@yahoo.com",user.email ],
              subject: "Verification code",
              html: generateEmailTemplate(OTP)
            }, (err)=>{
              console.log(err)
            })

            user.save()
              .then(user => {
                res.status(200).json({ success: true,user, msg: 'A Otp has been sent to your registered email address.'} )
              })
              .catch(err => {
                console.log(err)
                res.status(500).json({ success:false, message: "error" })
              })
              
          }
        })
    }



  } catch (error) {
    res.status(500).json({ message: error })
    console.log(error)

  }
})

// @desc    Register a new user
// @route   POST /api/users/resendotp
// @access  Public
const resendOTP = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({success:false, email: "Email not found" });
    } else if(user.verified){
      return res.status(404).json({success:false, email: "Email already verified" });
    } else {
      const OTP = generateOTP();

      // Find and delete existing verification token for the user
      await verificationTokenModels.findOneAndDelete({ owner: user._id });

      const verificationToken = new verificationTokenModels({
        owner: user._id,
        token: OTP,
      });
      await verificationToken.save();
      mailer.send(
        {
          to: ["zbousnina@yahoo.com", user.email],
          subject: "Verification code",
          html: generateEmailTemplate(OTP),
        },
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ OTP: {success:false ,message: "Error sending OTP email" }});
          }
        }
        );
        res.status(200).json({ OTP: {success:true ,message: "OTP sent" }});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ OTP: {success:false ,message: "Error sending OTP email" }});
  }
};

// @desc    Verify user email
// @route   POST /api/users/verifyemail
// @access  Public
const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp.trim()) {
    return sendError(res, 'Invalid request, missing parameters!');
  }

  if (!isValidObjectId(userId)) {
    return sendError(res, 'Invalid user id!');
  }

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, 'Sorry! User not found!');
  }

  if (user.verified) {
    return sendError(res, 'This account is already verified!');
  }

  const token = await verificationTokenModels.findOne({ owner: user._id });
  if (!token) {
    return sendError(res, 'Sorry, user not found');
  }

  const isMatched = await token.compareToken(otp);
  if (!isMatched) {
    return sendError(res, 'Please provide a valid token!');
  }
  
  user.verified = true;
  await verificationTokenModels.findByIdAndDelete(token._id);
  await user.save();

  mailer.send({
        to: ["zbousnina@yahoo.com",user.email ],
        subject: "Verification code",
        html: plainEmailTemplate("Email Verified Successfully",
        "Your email has been verified successfully!"
      )
      }, (err)=>{
        console.log(err)
      })

  res.status(200).json({ message: "Email verified successfully" });
};

// @desc    Forgot password
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return sendError(res, 'Please provide a valid email!');
  }

  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, 'Sorry! User not found!');
  }

  const token = await resetTokenModels.findOne({ owner: user._id });
  if (token ) {
    return sendError(res, 'You can request a new token after one hour!');
  }

  const resetToken = await createRandomBytes();
  // const resetTokenExpire = Date.now() + 3600000;

  const newToken = new resetTokenModels({
    owner: user._id,
    token: resetToken
   
    
  });

  await newToken.save();

  // mailTransport().sendMail({
  //   from: 'security@email.com',
  //   to: user.email,
  //   subject: 'Reset Password',
  //   html: generatePasswordResetTemplate(`https://63f664f4a776c104594b5c77--meek-salmiakki-3b9078.netlify.app//reset-password?token=${resetToken}&id=${user._id}`),
    
  // }, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  mailer.send({
    to: ["zbousnina@yahoo.com",user.email ],
    subject: "Verification code",
    html: generatePasswordResetTemplate(`https://63f65c5511afdd01e0b43f83--conteneur.netlify.app/reset-password?token=${resetToken}&id=${user._id}`)
  }, (err)=>{
    console.log(err)
  })

  res.status(200).json({ message: 'Reset password link has been sent to your email!' });
};

// @desc    Reset password
// @route   POST /api/users/resetpassword
// @access  Public
const resetPassword = async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    return sendError(res, 'User not found');
  }

  const isSamePassword = await user.comparePassword(password);
  if (isSamePassword) {
    return sendError(res, 'You cannot use the same password');
  }

  if (password.trim().length < 8 || password.trim().length > 20) {
    return sendError(res, 'Password must be between 8 and 20 characters');
  }

  user.password = password.trim();
  await user.save();

  await resetTokenModels.findOneAndDelete({ owner: user._id });

  mailTransport().sendMail(
    {
      from: 'security@email.com',
      to: user.email,
      subject: 'Reset Password successfully',
      html: plainEmailTemplate('Password reset successfully', 'Your password has been reset successfully!'),
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  mailer.send({
    to: ["zbousnina@yahoo.com",user.email ],
    subject: "Verification code",
    html: plainEmailTemplate('Password reset successfully', 'Your password has been reset successfully!'),
  }, (err)=>{
    console.log(err)
  })

  res.status(200).json({ message: 'Password reset successfully', success:true });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       avatar: user.avatar,
//       favorites: user.favorites,
//       otp: user.otp
//     })
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.avatar = req.body.avatar || user.avatar;
//     if (req.body.password) {
//       user.password = req.body.password
//     }

//     const updatedUser = await user.save()

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       avatar: updatedUser.avatar,
//       token: generateToken(updatedUser._id),
//     })
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


//  const resetPassword = asyncHandler(async(req,res) => {
//   console.log(verifyOtp(req.body.token));
//   console.log(req.body.token)
//   res.json({
//     token: verifyOtp(req.body.token)
//   })
//   const user = await User.findById(req.user._id)
//   const {oldPassword = ''} = req.body;
//   // For old password
//   if (user && (await user.matchPassword(oldPassword))) {
//     let randomOtp = Math.floor(100000 + Math.random() * 900000);
//     user.otp = randomOtp;
//     await user.save();

//     mailer.send({
//       to: user.email,
//       subject: 'Reset your password. ReactNews',
//       html: `Your otp for reset password is ${randomOtp}`
//     })

//     res.status(200).json({
//       success: true,
//       msg: 'A Otp has been sent to your registered email address.'
//     })
//   } else {
//     res.status(404).json({
//       success: false,
//       msg: 'Entered Old Password is Incorrect.'
//     })
//   }
// // });

// const addToFav = asyncHandler(async(req, res) => {
//     const newsId = req.params.newsId;
//     const userId = req.user._id;

//     // let obj = arr.find(o => o.name === 'string 1');
//     // check if exist news in fav array or not

//     let user = await User.findById(userId);
//     console.log("user", user)

//     let foundNews = user.favorites.find( obj => {
//       console.log(obj)
//       return obj.news == newsId
//     });

//     console.log("foundNews", foundNews)
//     if(foundNews) {


//     let newUserData = user.favorites.filter((obj) => {
//       return obj.news != newsId
//     })


//     user.favorites = newUserData;

//       await user.save()

//       return res.status(201).json({
//         success: true,
//         msg: 'Removed from your favorite lists.'
//       })
//     }

//    let user1 =  user.favorites.push({news: newsId});
//     await user.save();
//     console.log(user1)

//      res.status(201).json({
//       success: true,
//       msg: 'Added to your favorite lists.'
//     })

// })



// const getFavorites = asyncHandler(async(req, res) => {
//   const userId = req.user._id;
//   const user = await User.findById(userId)
//     .populate({path: 'favorites.news',
//     populate: ('category')
// })


//   console.log(req)
//   res.json({
//     success: true,
//     data: user.favorites,
//     msg: 'Successfully fetched'
//   })
// })


// const checkFavExistsOrNot = asyncHandler(async(req, res) => {
//   const userId = req.user._id;
//   const newsId = req.params.newsId

//   let user = await User.findById(userId);
//   console.log("user", user)

//   let foundNews = user.favorites.find( obj => {
//     console.log(obj)
//     return obj.news == newsId
//   });

//   console.log("foundNews", foundNews)
//   if(!foundNews) {
//     return res.json({
//       success: true,
//       exists: false,
//       msg: 'News id not exists in your favorite list.'
//     })
//   }
//   res.json({
//     success: true,
//     exists: true,
//     msg: 'News id exists in your favorite list.'
//   })

// })



// const removeFavorite = asyncHandler(async(req, res) => {
//   const userId = req.user._id;
//   const newsId = req.params.newsId

//   let user = await User.findById(userId);
//   console.log("user", user)

//   let foundNews = user.favorites.find( obj => {
//     console.log(obj)
//     return obj.news == newsId
//   });

//   console.log("foundNews", foundNews)
//   if(!foundNews) {
//     return res.json({
//       success: false,
//       msg: 'News id not exists in your favorite list.'
//     })
//   }


//   let newUserData = user.favorites.filter((obj) => {
//     return obj.news != newsId
//   })


//   user.favorites = newUserData;

//   await user.save()


//   res.json({
//     success: true,
//     data: newUserData,
//     msg: 'Successfully removed'
//   })

// })


module.exports = {
  authUser,
  registerUser,

  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  resetPassword,

  verifyEmail,
  forgotPassword,
  resendOTP
}