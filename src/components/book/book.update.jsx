import { useEffect, useState } from "react";
import { Input, notification, Modal, Select, InputNumber } from "antd";
import { handleUploadFIle, updateBookAPI, updateUserAPI } from "../../services/api.service";

const UpdateBookModal = (props) => {
    const [id, setId] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(10000);
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [mainText, setMainText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setAuthor(dataUpdate.author);
            setMainText(dataUpdate.mainText);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);
            setIsLoading(false);
            // setPreview(dataUpdate.thumbnail);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        setIsLoading(true)
        if (selectedFile) {
            const res = await handleUploadFIle(selectedFile, "book");
            if (res.data) {
                const response = await updateBookAPI(id, res.data.fileUploaded, mainText, author, price, quantity, category);
                if (response.data) {
                    notification.success({
                        message: "Update Book Success",
                        description: `Update Book successfully!`
                    });
                    setIsModalUpdateOpen(false);
                    await loadBook();
                } else {
                    notification.error({
                        message: "Error Update Book Failed",
                        description: JSON.stringify(response.message)
                    });
                }
            }
        }
        else {
            const response = await updateBookAPI(id, dataUpdate.thumbnail, mainText, author, price, quantity, category);
            if (response.data) {
                notification.success({
                    message: "Update Book Success",
                    description: `Update Book successfully!`
                });
                setIsModalUpdateOpen(false);
                await loadBook();
            } else {
                notification.error({
                    message: "Error Update Book Failed",
                    description: JSON.stringify(response.message)
                });
            }
        }
        setIsLoading(false);
    }

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

    const resetAndClearModal = () => {
        setIsModalUpdateOpen(false);
        setAuthor("");
        setPrice(10000);
        setQuantity(1);
        setCategory("");
        setMainText("");
        setSelectedFile(null);
        setPreview(null);
        setId("");
        setDataUpdate(null);
        setPreview(null);
        setIsLoading(false);
    }
    console.log(">>> Check category: ", category);

    return (
        <Modal
            title="Update Book"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn(false)}
            onCancel={resetAndClearModal}
            maskClosable={false}
            okText="Save"
            loading={isLoading}
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
                    <span> Tiêu đề</span>
                    <Input
                        value={mainText}
                        onChange={(event) => setMainText(event.target.value)}
                    />
                </div>
                <div>
                    <span> Tác giả</span>
                    <Input
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    <span> Giá tiền</span>
                    <InputNumber
                        min={10000} max={100000000000}
                        value={price}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} // Định dạng dấu phẩy cho số tiền
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')} // Xử lý khi người dùng nhập vào
                        style={{ width: "100%" }}
                        onChange={(event) => setPrice(event)}
                    />
                </div>
                <div>
                    <span> Số lượng</span>
                    <InputNumber
                        style={{ width: "100%" }}
                        min={1} max={100000}
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                    />
                </div>
                <div>
                    <span> Thể loại</span>
                    <Select
                        style={{
                            width: "100%"
                        }}
                        value={category}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' }
                        ]}
                        onChange={(event) => {
                            setCategory(event);
                        }}
                    />
                </div>
                {<div>
                    <span> Ảnh thumbnail</span>
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
                        >Upload</label>
                        <input type="file" hidden id='btnUpload' onChange={(event) => { handleOnchangeFile(event) }} onClick={event => event.target.value = null} />
                    </div>
                    {
                        preview ?
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
                            </>
                            :
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
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate?.thumbnail}`} alt="Image" />
                            </div>
                    }
                </div>
                }
            </div>
        </Modal>
    );
}

export default UpdateBookModal;