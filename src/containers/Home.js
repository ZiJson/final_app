import { useHome } from "./hooks/useHome";
import Display from "../components/Display";
import React, { useState } from 'react';
import styled from "styled-components";
import ProjectModal from "../components/ProjectModel";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    RedoOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Typography, Button } from 'antd';
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
const items = [
    getItem('Project Team', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('User', 'sub1', <UserOutlined />, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5'),
    // ]),
    getItem('My Projects', 'sub2', <TeamOutlined />, [getItem('Team 1', '2'), getItem('Team 2', '3 ')]),
    // getItem('Files', '9', <FileOutlined />),
];
const Home = () => {
    const { me, admin, projectData, refetchProject, createProject, createData, setSendRequest, addUser, removeProject } = useHome();
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false)
    const [hi, setHi] = useState(true)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick = (e) => {
        console.log(e)
    }
    const refresh = () => refetchProject({ name: "" });
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => {
                console.log(value===true)
                if (value) {
                    setHi(value);
                    setTimeout(()=>{setCollapsed(value)}, 0)
                }
                else{
                    setCollapsed(value);
                    setTimeout(()=>{setHi(value)}, 50)
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
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick} />
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
                        <Breadcrumb.Item>{admin ? "teacher" : "student"}</Breadcrumb.Item>
                        <RefreshButton
                            // type="text"
                            icon={<RedoOutlined />}
                            // loading={loadings[1]}
                            onClick={refresh}
                        >
                            Refresh
                        </RefreshButton>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <Display
                            projectData={projectData}
                            createProject={createProject}
                            refetchProject={refetchProject}
                            setOpen={setOpen}
                            removeProject={async (name) => {
                                await removeProject({ variables: { name } });
                                await refetchProject({ name: "" })
                                setSendRequest(true)
                            }}
                            admin={admin}
                        />
                    </div>
                </Content>
                <ProjectModal
                    open={open}
                    onCancel={() => { setOpen(false); refresh() }}
                    onCreate={async (values) => {
                        try {
                            await createProject({ variables: { name: values.project_name, content: values.content } })
                            await values.team.map(async (user) => {
                                await addUser({ variables: { projectName: values.project_name, username: user } })
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