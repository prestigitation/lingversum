import jwtInfo from "./jwtInfo";
import userInfoInToken from "./userInfoInToken";

type jwtUserInfo = userInfoInToken & jwtInfo;

export default jwtUserInfo;