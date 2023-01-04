import { useHome } from "./hooks/useHome";
import Display from "../components/Display";
import React, { useState } from 'react';
import styled from "styled-components";
import ProjectModal from "../components/ProjectModel";
import ShowModal from "../components/ShowModel";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    RedoOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Typography, Button, Select } from 'antd';
const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const Home = () => {
    const { me, admin, projectData, refetchProject, createProject, createData, setSendRequest, addUser, removeProject, myProject,setSignedIn } = useHome();
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false)
    const [hi, setHi] = useState(false)
    const [showProject, setShowProject] = useState(false)
    const [toShow, setToShow] = useState(0)
    const [menu, setMenu] = useState('1')
    const items = [
        getItem('Project Team', '1', <PieChartOutlined />),
        getItem('My Projects', '2', <TeamOutlined />,myProject.length>=1?myProject.map((project, index)=>(
            getItem(project.name, `${index+3}`)
        )):[getItem('You have no project', '10')]),
        getItem('Logout', '0', <LogoutOutlined/>)
    ];
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick = (e) => {
        console.log("clink")
        if(e.key=='1'){
            setMenu(e.key)
        }
        else if(e.key=='0'){
            setSignedIn(false
                )
        }
        else {
            show(e.key-3)
        }
    };
    const onOpenChange = (e) => {
        console.log(e)
        setMenu("2")
    }
    const show = (index) => {
        setToShow(index)
        setShowProject(true)

    }
    
    const refresh = () => refetchProject({ name: "" });
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => {
                console.log(value === true)
                if (value) {
                    setHi(value);
                    setTimeout(() => { setCollapsed(value) }, 0)
                }
                else {
                    setCollapsed(value);
                    setTimeout(() => { setHi(value) }, 50)
                }

            }}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <Hello><p>Hi! {hi ? "" : me}</p></Hello>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode='inline' items={items} onClick={onClick} onOpenChange={onOpenChange} />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>{admin ? "Teacher" : "Student"}</Breadcrumb.Item>
                        <Breadcrumb.Item>{menu=='1'? "All Projects" :"My Projects"}</Breadcrumb.Item>
                        <RefreshButton
                            // type="text"
                            icon={<RedoOutlined />}
                            // loading={loadings[1]}
                            onClick={refresh}
                        >
                            Refresh
                        </RefreshButton>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            style={{
                                width: '20%',
                                position: "absolute",
                                right: "130px",
                                top: "75px",
                                height:"32px"
                            }}
                            placeholder="Project Searc"
                            onChange={(value) => {
                                show(value)
                            }}
                            options={projectData.map((project, index) => (
                                {
                                    value: index,
                                    label: project.name
                                }
                            ))}
                        />
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <Display
                            projectData={menu==="1"?projectData:menu==="2"?myProject:""}
                            createProject={createProject}
                            refetchProject={refetchProject}
                            setOpen={setOpen}
                            removeProject={async (name) => {
                                await removeProject({ variables: { name } });
                                await refetchProject({ name: "" })
                                setSendRequest(true)
                            }}
                            admin={admin?true:menu==="2"?true:false}
                            show={show}
                            menu={menu}
                        />
                    </div>
                </Content>
                <ProjectModal
                    open={open}
                    onCancel={() => { setOpen(false); refresh() }}
                    onCreate={async (values) => {
                        try {
                            console.log(values.contact)
                            await createProject({ variables: { name: values.project_name, content: values.content } })
                            await values.team.map(async (user, index) => {
                                let contact = index===0?values.contact:"";
                                console.log(contact)
                                await addUser({ variables: { projectName: values.project_name, username: user, contact:contact} })
                            })

                            console.log("created")
                        }
                        catch (e) {
                            console.log(e)
                        };
                        await refetchProject({ name: "" })
                        setSendRequest(true)
                        setOpen(false)
                    }}
                    me={me}
                />
                <ShowModal open={showProject} onCancel={() => { setShowProject(false) }} project={menu==='1'?projectData[toShow]:myProject.length>0?myProject[toShow]:""} />
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Home;


const Hello = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        font-weight: bold;
        font-size: 18px;
        color: #c6c6c6;
    }
    
`
const RefreshButton = styled(Button)`
    position: absolute;
    right:17px;
    top:75px
`