import { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUsersAPI } from "../services/api.service";
import { Spin } from "antd";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // [] => run once
    // [current, pageSize] = [] + condition (mỗi lần giá trị thay đổi là gọi useEffect)
    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    const loadUser = async () => {
        const res = await fetchAllUsersAPI(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }

    return (
        isLoading ?
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, 50%)"
                }}
            >
                <Spin />
            </div>
            :
            <div style={{ padding: "20px" }}>
                <UserForm
                    loadUser={loadUser}
                />
                <UserTable
                    dataUsers={dataUsers}
                    loadUser={loadUser}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                />
            </div>
    );
}

export default UserPage;