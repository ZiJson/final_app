import React from 'react';
import { Col, Divider, Row, Typography, Button, Popconfirm } from 'antd';
import styled from 'styled-components';
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;
const style = {
  background: '#eeeeee',
  padding: '0 15px ',
  overflow: 'auto',
  borderRadius: '10px',
  height: '200px',
  position: 'relative'
};

const Display = ({ projectData, createProject, refreshProject, setOpen, removeProject, admin }) => {
  console.log(projectData)
  return (
    <>
      <Row gutter={[16, 16]}>
        {projectData.Project.map((project) => (
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} >
            <div style={style}>
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
              <Title level={3}>{project.name}</Title>
              {project.content}
              <UserDisplay>
                {project.users.length}
              </UserDisplay>
            </div>
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
  display: flex;
  align-items: center;
  justify-content: center;
`
const DeleteBtn = styled(Button)`
  position: absolute;
  top :0;
  right: 0;
`
const UserDisplay = styled.div`
  width : auto;
  height : auto;
  padding-bottom : 12px;
  position: absolute;
  bottom : 0
`

export default Display;