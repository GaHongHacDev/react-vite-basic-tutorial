import { useEffect, useState } from "react";
import { Input, notification, Modal } from "antd";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setFullName(dataUpdate.fullName);
            setId(dataUpdate._id);
            setPhoneNumber(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const response = await updateUserAPI(id, fullName, phoneNumber);
        if (response.data) {
            notification.success({
                message: "Update User Success",
                description: `User ${response.data.fullName} update successfully!`
            });
            setIsModalUpdateOpen(false);
            await loadUser();
        } else {
            notification.error({
                message: "Error create User Failed",
                description: JSON.stringify(response.message)
            });
        }
    }
    const resetAndClearModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setPhoneNumber("");
        setId("");
        setDataUpdate(null);
    }

    return (
        <Modal
            title="Update User"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn(false)}
            onCancel={resetAndClearModal}
            maskClosable={false}
            okText="Save"
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span> Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span> FullName</span>
                    <Input
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
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
    );
}

export default UpdateUserModal;