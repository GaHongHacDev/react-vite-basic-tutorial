import { EditOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import ViewDetailBook from "./view.book.detail";
import CreateBookForm from "./book.form";
import { deleteBook } from "../../services/api.service";
import UpdateUserModal from "../user/update.user.modal";
import UpdateBookModal from "./book.update";

const BookTable = (props) => {
    const { dataBooks, current, pageSize, total, loadBook, setCurrent, setPageSize } = props;
    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const onChange = async (pagination) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };

    const handleDeleteBook = async (e) => {
        const response = await deleteBook(e._id);
        if (response.data) {
            notification.success({
                message: "Update User Success",
                description: `User ${response.data.fullName} update successfully!`
            });
            await loadBook();
        } else {
            notification.error({
                message: "Error update User Failed",
                description: JSON.stringify(response.message)
            });
        }
    };

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (_, record, index) => (
                <>{index + 1 + (current - 1) * pageSize}</>
            ),
        },
        {
            title: 'Id',
            key: 'id',
            render: (_, record) => (
                <>
                    <a href='#' onClick={() => {
                        setDataDetail(record);
                        setIsDetailOpen(true);
                    }}>{record._id}</a>
                </>
            ),
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            render: (text) => {
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(text);
            },
        }, {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        }, {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Delete the book"
                        description="Are you sure to delete this book?"
                        onConfirm={() => handleDeleteBook(record)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>

                </div>
            ),
        }
    ];

    return (
        <>

            <CreateBookForm />
            <Table
                dataSource={dataBooks}
                columns={columns}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => {
                            console.log("Check range: ", range);
                            return (<div> {range[0]}-{range[1]} trên {total} rows</div>)
                        }
                    }
                }
                onChange={onChange}
            />
            <ViewDetailBook
                dataDetail={dataDetail}
                setDataDetaill={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />
            <UpdateBookModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            />
        </>
    );
}

export default BookTable;