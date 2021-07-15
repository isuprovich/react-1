import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/authReducer';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import { TeamOutlined, UserOutlined, MessageOutlined, LogoutOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
    const dispatch = useDispatch()
    const logoutMe = () => (dispatch(logout()))
    const [collapsed, setCollapsed] = useState(true)
    const onCollapse = (collapsed: boolean) => { setCollapsed(collapsed) }
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{
            overflow: 'auto', height: '100vh', position: 'sticky', top: 0, left: 0
        }}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<UserOutlined />}><Link to='/profile' />Мой профиль</Menu.Item>
                <Menu.Item key="2" icon={<TeamOutlined />}><Link to='/users' />Пользователи</Menu.Item>
                <Menu.Item key="3" icon={<MessageOutlined />}><Link to='/chat' />Чат</Menu.Item>
                <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logoutMe} danger={true}><Link to='/login' />Выйти</Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Sidebar