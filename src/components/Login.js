import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from 'antd'
import styled from "styled-components";
const Wrapper = styled.div`
min-width: 400px;
display: flex;
align-items: center;
justify-content: center;

margin: 20px;
Button{
    margin-right: 10px;
}
`;
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const LogIn = ({ me, setName, onLogin }) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <Wrapper>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="login as"
                    label="Login as"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option "
                        // onChange={}
                        allowClear
                    >
                        <Option value="student">student</Option>
                        <Option value="teacher">teacher</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </Wrapper>

    );
}
export default LogIn;
{/* <Input.Search
    size="large"
    style={{ width: 300, margin: 50 }}
    prefix={<UserOutlined />}
    placeholder="Enter your name"
    value={me}
    onChange={(e) => setName(e.target.value)}
    enterButton="Sign In"
    onSearch={(name) => onLogin(name)}
/> */}