import { useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { createContext } from "react";
import { message } from "antd";
import { PROJECT_QUERY, CREATE_PROJECT_MUTATION, ADD_User_MUTATION,REMOVE_PROJECT_MUTATION, MY_PROJECT_QUERY } from "../../graphql";

const HomeContext = createContext({
    me: "",
    signedIn: false,
    admin: false,
    projectData: "",
    myProject: "",
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
    const [menu, setMenu] = useState('1')
    useEffect(()=>{
        console.log("re")
        refetchProject()
        refetchMy()
        setSendRequest(false)
    },[sendRequest])
    useEffect(()=>{
        refetchProject()
        refetchMy()
    })
    //gql
    const { data: projectDatas, error, loading, refetch: refetchProject } = useQuery(PROJECT_QUERY, {
        variables: { name: "" },
        pollInterval: 500,
    });
    const { data: myDatas,error:E, loading:L , refetch:refetchMy } = useQuery(MY_PROJECT_QUERY, {
        variables: { name: me },
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
    if (L) return <>loading</>;
    if (E) return `Error! ${error}`;
    const {Project:projectData} = projectDatas;
    const {MyProject:myProject} = myDatas;
    console.log("all:",projectData)
    console.log("my:",myProject)
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
                removeProject,
                myProject
            }}
            {...props}
        />
    );
}
const useHome = () => useContext(HomeContext);
export { useHome, HomeProvider };