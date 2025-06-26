import { Avatar } from "antd";
import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = `/api/v1/user`;

    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    };
    return axios.post(URL_BACKEND, data);
}

const updateUserAPI = (id, fullName, phone) => {
    const URL_BACKEND = `/api/v1/user`;

    const data = {
        _id: id,
        fullName: fullName,
        phone: phone
    };
    return axios.put(URL_BACKEND, data);
}

const fetchAllUsersAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const deleteUser = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
}

const handleUploadFIle = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);
    return axios.post(URL_BACKEND, bodyFormData, config);
}

const updateUserAvatarAPI = (id, fullName, phone, avatar) => {
    const URL_BACKEND = `/api/v1/user`;

    const data = {
        _id: id,
        fullName: fullName,
        phone: phone,
        avatar: avatar
    };
    return axios.put(URL_BACKEND, data);
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = `/api/v1/user/register`;

    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    };
    return axios.post(URL_BACKEND, data);
}

const loginAPI = (email, password) => {
    const URL_BACKEND = `/api/v1/auth/login`;

    const data = {
        username: email,
        password: password,
        delay: 2000
    };
    return axios.post(URL_BACKEND, data);
}

const fetchUser = () => {
    const URL_BACKEND = `/api/v1/auth/account`;
    return axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = `/api/v1/auth/logout`;
    return axios.post(URL_BACKEND);
}

const getBooks = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = `/api/v1/book`;

    const data = {
        thumbnail,
        mainText,
        author,
        price,
        quantity,
        category
    };
    return axios.post(URL_BACKEND, data);
}

const deleteBook = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    return axios.delete(URL_BACKEND);
}

const updateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = `/api/v1/book`;

    const data = {
        _id,
        thumbnail,
        mainText,
        author,
        price,
        quantity,
        category
    };
    return axios.put(URL_BACKEND, data);
}

export {
    createUserAPI, updateUserAPI, fetchAllUsersAPI, deleteUser, handleUploadFIle, updateUserAvatarAPI,
    registerUserAPI, loginAPI, fetchUser, logoutAPI, getBooks, createBookAPI, deleteBook, updateBookAPI
}