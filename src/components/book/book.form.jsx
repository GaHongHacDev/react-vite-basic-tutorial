import { Button, Input, notification, Modal, Select, InputNumber } from "antd";
import { useState } from "react";
import { createBookAPI, createUserAPI, handleUploadFIle } from "../../services/api.service";

const CreateBookForm = (props) => {
    const { loadBooks } = props;

    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(10000);
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [mainText, setMainText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitBtn = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error Create Book",
                description: "Vui lòng input ảnh thumbnail"
            });
            return;
        }
        const res = await handleUploadFIle(selectedFile, "book");
        if (res.data) {
            const response = await createBookAPI(res.data.fileUploaded, mainText, author, price, quantity, category);
            if (response.data) {
                notification.success({
                    message: "Create Book Success",
                    description: `Book ${response.data.mainText} created successfully!`
                });
                resetAndClearModal()
                await loadBooks();
            } else {
                notification.error({
                    message: "Error create User Failed",
                    description: JSON.stringify(response.message)
                });
            }
        }
        else {
            notification.error({
                message: "Error",
                description: "Error when upload file"
            })
        }
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
        setIsModalOpen(false);
        setAuthor("");
        setPrice(10000);
        setQuantity(1);
        setCategory("");
        setMainText("");
        setSelectedFile(null);
        setPreview(null);
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                <h3>Table Book</h3>
                <Button type="primary" onClick={() => setIsModalOpen(true)}> Create Book</Button>
            </div>
            <Modal
                title="Create User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={resetAndClearModal}
                maskClosable={false}
                okText="Create"
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tiêu đề</span>
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
                            defaultValue={10000}
                            min={10000} max={100000000000}
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
                            defaultValue={1}
                            onChange={(value) => setQuantity(value)}
                        />
                    </div>
                    <div>
                        <span> Thể loại</span>
                        <Select
                            style={{
                                width: "100%"
                            }}
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
                    <div>
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
                            </>
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default CreateBookForm;