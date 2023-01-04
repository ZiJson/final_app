import React from 'react';
import { Col, Divider, Row, Typography, Button, Popconfirm } from 'antd';
import styled from 'styled-components';
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const style = {
  background: '#eeeeee',
  padding: '0 15px ',
  overflow: 'auto',
  height: '200px',
  position: 'relative',
  width: "100%"
};

const Display = ({ projectData, createProject, refreshProject, setOpen, removeProject, admin, show }) => {
  console.log(projectData)
  return (
    <>
      <Row gutter={[16, 16]}>
        {projectData.map((project, index) => (
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} key={index} >
            <Button style={style} onClick={() => {show(index)}} >
              <div
                style={{
                  textAlign: "left",
                  position: "absolute",
                  top: "-25px",
                  left: "0",
                  width: "100%",
                  padding: "15px"
                }}
              >

                <Title level={3}>{project.name}</Title>
                <div style={{
                  maxHeight: '98px',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  overflow: "hidden",
                  background: "rgb(246, 246, 246)",
                  borderRadius: "5px",
                  padding: "0 5px"
                }}>
                  <Text>
                    {project.content}
                  </Text>
                </div>

                <UserDisplay type="secondary">
                  {project.users.length} members
                </UserDisplay>
              </div>
            </Button>
            {admin ?
              <Popconfirm
                placement="topRight"
                title={"Are you sure to delete this project?"}
                description={'You cannot undo this step'}
                onConfirm={() => removeProject(project.name)
                }
                okText="Yes"
                cancelText="No">
                <DeleteBtn
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                />
              </Popconfirm>
              : ""}
          </Col>
        ))}
        <Btn xs={24} sm={12} md={12} lg={8}>
          <Button icon={<AppstoreAddOutlined />}
            onClick={() => {
              setOpen(true)
            }}
          >
            Add New
          </Button>
        </Btn>

      </Row>

    </>
  )
}

const Btn = styled(Col)`
  width: auto;  
  height:200px
  display: flex;
  align-items: center;
  justify-content: center;
`
const DeleteBtn = styled(Button)`
  position: absolute;
  top :1px;
  right: 9px;
`
const UserDisplay = styled(Text)`
  width : auto;
  height : auto;
  padding : 15px;
  position: absolute;
  top : 178px;
  left:0;
`

export default Display;