import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { getBooks } from "../services/api.service";
import { Spin } from "antd";
import CreateBookForm from "../components/book/book.form";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    // [] => run once
    // [current, pageSize] = [] + condition (mỗi lần giá trị thay đổi là gọi useEffect)
    useEffect(() => {
        loadBook();
    }, [current, pageSize]);

    const loadBook = async () => {
        const res = await getBooks(current, pageSize);
        if (res.data) {
            setDataBooks(res.data.result);
            setCurrent(+res.data.meta.current);
            setPageSize(+res.data.meta.pageSize);
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
                <BookTable
                    loadBook={loadBook}
                    dataBooks={dataBooks}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                />
            </div>
    );

}

export default BookPage;