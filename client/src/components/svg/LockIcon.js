import * as React from "react";
import Svg, { Path , Circle, Rect} from "react-native-svg";
import SvgIcon from '../../assets/images/SvgIcon';
const LockIcon = (props) => (


<Svg
{...props}
 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><Rect x="3" y="11" width="18" height="11" rx="2" ry="2"></Rect><Path d="M7 11V7a5 5 0 0 1 10 0v4"></Path></Svg>

);
export default LockIcon;