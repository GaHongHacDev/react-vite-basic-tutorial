import { Button, Checkbox, Col, Form, Input, notification, Row, Divider } from 'antd';
import { registerUserAPI } from '../services/api.service';
import { useNavigate, Link } from 'react-router-dom';



const RegisterPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const handleSubmit = async (value) => {
        const res = await registerUserAPI(value.fullName, value.email, value.password, value.phone);
        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Register success!"
            });
            console.log(res);
            navigate("/login");
        }
        else {
            notification.error({
                message: "Register User Failed",
                description: JSON.stringify(res.message)
            });
        }
    }

    return (
        <Form
            style={{ margin: "30px" }}
            layout='vertical'
            form={form}
            onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        >
            <h1>Đăng ký tài khoản</h1>
            <Row justify={"center"}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: 'Wrong format!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <div>
                    <Col xs={24} md={6}>
                        <Button type='primary' onClick={() => form.submit()}>Submit</Button>
                    </Col>
                </div>
                <Divider />
                <div>Đã có tải khoản? <Link to={"/login"}>Đăng nhập tại đây</Link></div>
            </Row>
            {/* <Button onClick={() => {
                    console.log(">>> Check on click form: ", form.getFieldsValue());
                    form.setFieldsValue({
                        "email": "t là tiến"
                    });
                }}>Test</Button> */}
        </Form>

    );
}

export default RegisterPage;