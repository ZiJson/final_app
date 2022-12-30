import Title from "../components/Title";
import {useHome} from "./hooks/useHome";
import LogIn from "../components/Login";


const SignIn = () => {
    const {displayStatus,setSignedIn, me, setMe } = useHome();
    const handleLogin = (name) => {
        if (!name)
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        else setSignedIn(true);
    }
    console.log("from sign me:", me)
    return (
        <>
            <Title />
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
}
export default SignIn;