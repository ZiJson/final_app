import { Button, Input, Tag, message, Tabs, Modal, Form, Select, Tooltip } from 'antd'
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;
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
const style = {
    position: "absolute",
    right: "0"
};
const EditForm = ({ form, init }) => {
    return (
        <Form form={form} layout="vertical"
            initialValues={init}
            name="form_in_modal"
            disabled={false}>
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
            <Form.Item name="contact"
                label="Contact"
                rules={[
                    {
                        required: true,
                        message: "Please input where to contact with you",
                    },
                ]}
                style={{
                    width: '45%',
                    position: "absolute",
                    right: "24px",
                    top: "291px"
                }}
            >
                <Input
                    placeholder="Enter email"
                    // suffix={index === 0 ?
                    //     <Tooltip title="Team leader">
                    //         <InfoCircleOutlined
                    //             style={{
                    //                 color: 'rgba(0,0,0,.45)',
                    //             }}
                    //         />
                    //     </Tooltip>
                    //     : ""
                    // }
                    style={{
                        width: '100%',
                        // position: "absolute",
                        // right: "24px",
                        // top: "322px"
                    }}

                />

            </Form.Item>
        </Form>
    )
}

export default EditForm;