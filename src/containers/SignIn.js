import Title from "../components/Title";
import {useHome} from "./hooks/useHome";
import LogIn from "../components/Login";


const SignIn = () => {
    const {displayStatus,setSignedIn, me, setMe, setAdmin, admin } = useHome();
    const handleLogin = (input) => {
        setMe(input.username);
        setAdmin(input['login as']=='student'?false:true);
        setSignedIn(true);
    }
    return (
        <>
            <Title />
            <LogIn onFinish={handleLogin} />
        </>
    );
}
export default SignIn;