import React, { useState } from 'react';
import { Button, Drawer, notification } from 'antd';
import { handleUploadFIle, updateUserAvatarAPI } from '../../services/api.service';

const ViewDetailBook = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props

    const onClose = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    };

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
                        <p>Tiêu đề: {dataDetail.mainText}</p>
                        <br />
                        <p>Tác giả: {dataDetail.author}</p>
                        <br />
                        <p>Thể loại: {dataDetail.category}</p>
                        <br />
                        <p>Giá tiền: {dataDetail.phone}</p>
                        <br />
                        <p>Số lượng: {dataDetail.quantity}</p>
                        <br />
                        <p>Đã bán: {dataDetail.sold}</p>
                        <br />
                        <p>Thumbnail</p>
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
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} alt="Image" />
                        </div>
                    </> : <p>No Data</p>
                }

            </Drawer>
        </>
    );
};

export default ViewDetailBook;