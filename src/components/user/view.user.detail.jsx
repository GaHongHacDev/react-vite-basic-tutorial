import React, { useState } from 'react';
import { Button, Drawer, notification } from 'antd';
import { handleUploadFIle, updateUserAvatarAPI } from '../../services/api.service';

const ViewDetailUser = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } = props

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const onClose = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    };

    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUploadFIle(selectedFile, "avatar");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(dataDetail._id, dataDetail.fullName, dataDetail.phone, newAvatar);
            console.log(">>> Check1: ", resUpdateAvatar);

            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();
                console.log("check load: ", isDetailOpen);

                notification.success({
                    message: "Update User Avatar",
                    description: "Cập nhật avatar thành công"
                });
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpload.message)
                });
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            });
        }
    }

    return (
        <>
            <Drawer
                width={"25vw"}
                title="Basic Drawer"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={isDetailOpen}
            >
                {
                    dataDetail ? <>
                        <p>Id: {dataDetail._id}</p>
                        <br />
                        <p>Full Name: {dataDetail.fullName}</p>
                        <br />
                        <p>Email: {dataDetail.email}</p>
                        <br />
                        <p>Phone: {dataDetail.phone}</p>
                        <br />
                        <p>Avatar</p>
                        <div
                            style={{
                                marginTop: "10px",
                                height: "100px", width: "150px",
                                border: "1px solid #ccc"
                            }}
                        >
                            <img
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain"
                                }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt="Image" />
                        </div>
                        <div>
                            <label
                                htmlFor='btnUpload'
                                style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "orange",
                                    borderRadius: "5px"
                                }}
                            >Upload Avatar</label>
                            <input type="file" hidden id='btnUpload' onChange={(event) => { handleOnchangeFile(event) }} />
                        </div>
                        {
                            preview &&
                            <>
                                <div
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "15px",
                                        height: "100px", width: "150px",
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "contain"
                                        }}
                                        src={preview} alt="Image" />
                                </div>
                                <Button
                                    type='primary'
                                    onClick={() => { handleUpdateUserAvatar() }}
                                >Save</Button>
                            </>
                        }

                    </> : <p>No Data</p>
                }

            </Drawer>
        </>
    );
};

export default ViewDetailUser;