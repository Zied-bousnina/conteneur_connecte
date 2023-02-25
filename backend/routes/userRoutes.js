const express = require('express');
const { ROLES, isRole, isResetTokenValid } = require('../security/Rolemiddleware');
const router = express.Router()
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addToFav,
  getFavorites,
  removeFavorite,
  resetPassword,
  checkFavExistsOrNot,
  verifyEmail,
  forgotPassword,
  resendOTP
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware.js')

router.route('/').post(registerUser)
router.route('/login').post(authUser)

router
  .route('/:id')
//   .delete(protect, deleteUser)
  .get(getUserById)
//   .put(protect, updateUser)
router.route('/verifyemail').post(verifyEmail)
router.route("/forgot-password").post( forgotPassword )
router.route("/resendotp").post( resendOTP )
// router.post("/reset-password", resetPassword )
router.post("/reset-password",isResetTokenValid,  resetPassword )
router.get("/verify-token", isResetTokenValid, (req, res)=> {
  res.json({success:true})
})

router.route('/profile/password/reset').post(protect ,resetPassword);



module.exports = router