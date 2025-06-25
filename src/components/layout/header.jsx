import { Link, NavLink } from 'react-router-dom';
// import './header.css';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Children, useState } from 'react';

const Header = () => {
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
        {
            label: 'Setting',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    key: 'login'
                },
                {
                    label: 'Đăng xuất',
                    key: 'logout'
                }
            ]
        }
    ];

    const [current, setCurrent] = useState('');
    const onClick = e => {
        setCurrent(e.key);
    };
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