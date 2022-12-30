import { useState, useContext } from "react";
import { createContext } from "react";
import { message } from "antd";

const HomeContext = createContext({
    me: "",
    signedIn: false,
    admin: false
});


const HomeProvider = (props) => {
    const [me, setMe] = useState("");
    const [admin, setAdmin] = useState(false);
    const [signedIn, setSignedIn] =useState(false);

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {
                content: msg, duration: 0.5
            }
            switch (type) {
                case 'success':
                    message.success(content)
                    break
                case 'error':
                default:
                    message.error(content)
                    break
            }
        }
    }

    return (
        <HomeContext.Provider
            value={{
                me, setMe,
                signedIn, setSignedIn,
                admin, setAdmin,
                displayStatus
            }}
            {...props}
        />
    );
}
const useHome = () => useContext(HomeContext);
export {useHome, HomeProvider};