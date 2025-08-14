import { useSelector } from "react-redux";

import { selectAuthUser } from "../../redux/auth/auth-selector"
const useLogin = ()=> {
    const user = useSelector(selectAuthUser);
    return Boolean(user);
}

export default useLogin;