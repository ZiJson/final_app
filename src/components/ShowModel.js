import { Button, Input, Tag, message, Tabs, Modal, Form, Typography, Space, Divider, List } from 'antd'
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import EditForm from './EditForm';
const { TextArea } = Input;
const { Title, Text } = Typography;
const ShowModal = ({ open, onCancel, project }) => {
    const [form] = Form.useForm();
    if(!project)return
    console.log(project)
    return (
        <Modal
            open={open}
            cancelText="Leave"
            onCancel={onCancel}
            footer={null}
        >
            <div style={{ padding: "20px" }}>
                <Divider orientation="right"><Text type='secondary'>Project Title</Text></Divider>
                <Text strong style={{ fontSize: "30px" }}>{project.name}</Text>
                <Divider orientation="right "><Text type='secondary'>Content</Text></Divider>
                <Text style={{
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    fontSize: "16px"
                }}>{project.content}</Text>
                <Divider orientation="right "><Text type='secondary'>Members</Text></Divider>
                <>
                    {
                        project.users.map((user, index) => (
                            <div key={index}>
                                <Text strong >{user.name}</Text>
                                <Text strong  type='secondary'>  / {user.contact === "empty" || user.contact === "Empty" ? "" : user.contact}</Text>
                                <br></br>
                            </div>
                        ))
                    }
                </>
            </div>
        </Modal >
    );
};

export default ShowModal;