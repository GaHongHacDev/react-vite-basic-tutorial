import { EditOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewDetailUser from './view.user.detail';
import { deleteUser } from '../../services/api.service';

const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);

    const handleDeleteUser = async (e) => {
        const response = await deleteUser(e._id);
        if (response.data) {
            notification.success({
                message: "Update User Success",
                description: `User ${response.data.fullName} update successfully!`
            });
            await loadUser();
        } else {
            notification.error({
                message: "Error update User Failed",
                description: JSON.stringify(response.message)
            });
        }
    };

    const onChange = async (pagination, filters, sorter, extra) => {
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

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>{index + 1 + (current - 1) * pageSize}</>
                );
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
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
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
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
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => handleDeleteUser(record)}
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
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
            />

            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />

            <ViewDetailUser
                dataDetail={dataDetail}
                loadUser={loadUser}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />
        </>
    )
}

export default UserTable;