import { Link, NavLink, useNavigate } from 'react-router-dom';
// import './header.css';
import { Menu, message } from 'antd';
import { AliwangwangOutlined, AppstoreOutlined, LoginOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';

const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            });
            message.success("Logout thành công");
            //redirect to home
            navigate("/");
        }
    }

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: <Link to="/users">Users</Link>,
            key: 'users',
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link to="/books">Books</Link>,
            key: 'books',
            icon: <SettingOutlined />,
        },
        ...(!user.id ? [{
            label: <Link to="/login">Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),
        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => { handleLogout() }}>Đăng xuất</span>,
                    key: 'logout'
                }
            ]
        }] : [])
    ];

    const [current, setCurrent] = useState('');
    const onClick = e => {
        setCurrent(e.key);
    };

    console.log(">>> Log user:", user);

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    );
    // return (
    //     <ul>
    //         <li><NavLink to="/">Home</NavLink></li>
    //         <li><NavLink to="/users">Users</NavLink></li>
    //         <li><NavLink to="/books">Books</NavLink></li>
    //     </ul>
    // )
}

export default Header;