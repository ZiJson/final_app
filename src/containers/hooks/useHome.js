import { useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { createContext } from "react";
import { message } from "antd";
import { PROJECT_QUERY, CREATE_PROJECT_MUTATION, ADD_User_MUTATION,REMOVE_PROJECT_MUTATION } from "../../graphql";

const HomeContext = createContext({
    me: "",
    signedIn: false,
    admin: false,
    projectData: "",
    projectResult: "",
    createProject: () => { },
    createData: "",
    setSendRequest: ()=>{},
    addUser: ()=>{},
    removeProject: ()=> {}
});


const HomeProvider = (props) => {
    const [me, setMe] = useState("");
    const [admin, setAdmin] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [sendRequest, setSendRequest] = useState(false) //[id, id]
    useEffect(()=>{
        console.log("re")
        refetchProject()
        setSendRequest(false)
    },[sendRequest])
    //gql
    const { data: projectData, error, loading, refetch: refetchProject } = useQuery(PROJECT_QUERY, {
        variables: { name: "" }
    });
    const [createProject, { data: createData, error: Merror }] = useMutation(CREATE_PROJECT_MUTATION);
    const [addUser] = useMutation(ADD_User_MUTATION);
    const [removeProject] = useMutation(REMOVE_PROJECT_MUTATION)
    useEffect(()=>{
        if(Merror) {
            message.error(Merror.message)
        }
    },[Merror])
    if (loading) return <>loading</>;
    if (error) return `Error! ${error}`;
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
                displayStatus,
                projectData,
                createProject, createData,
                refetchProject,
                setSendRequest,
                addUser,
                removeProject
            }}
            {...props}
        />
    );
}
const useHome = () => useContext(HomeContext);
export { useHome, HomeProvider };