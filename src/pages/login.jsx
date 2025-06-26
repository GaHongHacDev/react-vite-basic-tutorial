import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);

    const onFinish = async values => {
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user)
            navigate("/");
        }
        else {
            notification.error({
                message: "Login Error",
                description: JSON.stringify(res.message)
            });
        }
        setLoading(false);
    };

    return (
        <Row
            justify={"center"}
            style={{
                marginTop: "30px",
            }}
        >
            <Col xs={24} md={16} lg={8}>
                <fieldset
                    style={{
                        padding: "25px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}
                >
                    <legend>Đăng nhập</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        layout="vertical"
                        form={form}
                    >

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your email!'
                                    },
                                    {
                                        type: "email",
                                        message: "Email không đúng định dạng!"
                                    }
                                ]
                            }
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]
                            }
                            onKeyDown={(event) => {
                                if (event.key === 'Enter')
                                    form.submit();
                            }}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Login
                                </Button>
                                <Link to={"/"}>Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "Center" }}>Chưa có tài khoản? <Link to={"/register"}>Đăng ký tài khoản</Link></div>
                </fieldset>
            </Col>
        </Row>

    );
}

export default LoginPage;