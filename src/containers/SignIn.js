import Title from "../components/Title";
import { useHome } from "./hooks/useHome";
import LogIn from "../components/Login";
import { message } from "antd";

const SignIn = () => {
    const { displayStatus, setSignedIn, me, setMe, setAdmin, admin } = useHome();
    const handleLogin = (input) => {
        if (input['login as'] === 'student') {
            setMe(input.username);
            setAdmin(false);
        }
        else{
            if(input.username!=='admin'){
                message.error('you are not teacher!')
                return
            }
            setMe(input.username);
            setAdmin(true);
        }
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