import { Button, Input, Tag, message, Tabs, Modal, Form, Space, Tooltip } from 'antd'
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import EditForm from './EditForm';
const { TextArea } = Input;
const ProjectModal = ({ open, onCreate, onCancel, me }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Create a new Project Team"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        console.log(values)
                        onCreate(values);
                    })
                    .catch((e) => {
                        console.log(e)
                        window.alert('Please fill out the form');
                    });
            }}
        >
            <EditForm form={form} init={{ team: [me, ''] }}/>
        </Modal >
    );
};

export default ProjectModal;