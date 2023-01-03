import { Button, Input, Tag, message, Tabs, Modal, Form, Space, Tooltip } from 'antd'
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};

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
            <Form form={form} layout="vertical"
                initialValues={{ team: [me, ''] }}
                name="form_in_modal">
                <Form.Item name="project_name"
                    label="Project Title"
                    rules={[
                        {
                            required: true,
                            message: 'Error: Please enter the name of your project!',
                        },
                    ]}>
                    <Input placeholder='Name your project...' />
                </Form.Item>
                <Form.Item name="content"
                    label="Centent"
                    rules={[
                        {
                            required: true,
                            message: 'Error: Please write some information of your project!',
                        },
                    ]}>
                    <TextArea rows={4} placeholder='Discribe your project idea...' />
                </Form.Item>
                <Form.List
                    name="team"
                    rules={[
                        {
                            validator: async (_, team) => {
                                console.log(team)
                                if (!team || team.length < 1) {
                                    return Promise.reject(new Error('At least 1 person'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? 'Teammates' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item

                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input teammate's name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input
                                            placeholder="Teammate name"
                                            suffix={index === 0 ?
                                                <Tooltip title="Team leader">
                                                    <InfoCircleOutlined
                                                        style={{
                                                            color: 'rgba(0,0,0,.45)',
                                                        }}
                                                    />
                                                </Tooltip>
                                                : ""
                                            }
                                            style={{
                                                width: '40%',
                                            }}

                                        />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            style={{
                                                margin: '10px',
                                            }}
                                            className="dynamic-delete-button"
                                            onClick={() => {
                                                console.log("fields", fields)
                                                remove(field.name)
                                            }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="text"
                                    onClick={() => add()}
                                    style={{
                                        width: '40%',
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Add person
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal >
    );
};

export default ProjectModal;