import * as React from "react";
import Svg, { Path , Circle} from "react-native-svg";
import SvgIcon from '../../assets/images/SvgIcon';
const AtSVG = (props) => (


<Svg
{
...props
}
 xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <Circle cx="12" cy="12" r="4">
        </Circle>
        <Path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></Path>
        </Svg>

);
export default AtSVG;