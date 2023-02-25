import * as React from "react";
import Svg, { Path , Circle} from "react-native-svg";
import SvgIcon from '../../assets/images/SvgIcon';
const ShowIcon = (props) => (

    <Svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></Path>
        <Circle cx="12" cy="12" r="3">
            

        </Circle>
        </Svg>




)
export default ShowIcon;