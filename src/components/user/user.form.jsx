import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
    const { loadUser } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmitBtn = async () => {
        const response = await createUserAPI(fullName, email, password, phoneNumber);
        if (response.data) {
            notification.success({
                message: "Create User Success",
                description: `User ${response.data.fullName} created successfully!`
            });
            setIsModalOpen(false);
            await loadUser();
        } else {
            notification.error({
                message: "Error create User Failed",
                description: JSON.stringify(response.message)
            });
        }
    }
    const resetAndClearModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                <h3>Table User</h3>
                <Button type="primary" onClick={() => setIsModalOpen(true)}> Create User</Button>
            </div>
            <Modal
                title="Create User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => handleSubmitBtn(false)}
                onCancel={resetAndClearModal}
                maskClosable={false}
                okText="Create"
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span> FullName</span>
                        <Input
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>
                    <div>
                        <span> Email</span>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span> Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div>
                        <span> Phone number</span>
                        <Input
                            value={phoneNumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default UserForm;