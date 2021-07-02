import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/authReducer';
import { getMyId } from '../../redux/authSelectors';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { TeamOutlined, UserOutlined, MessageOutlined, LogoutOutlined } from '@ant-design/icons';

// const { Sider } = Layout;

// const myId = useSelector(getMyId)
// const dispatch = useDispatch()
// const logoutMe = () => (dispatch(logout()))

// class Sidebar extends React.Component {
//     state = { collapsed: true };
//     onCollapse = (collapsed: boolean) => { this.setState({ collapsed }) }
//     render() {
//         const { collapsed } = this.state;
//         return (
//             <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} style={{overflow: 'auto', height: '100vh', position: 'sticky', top: 0, left: 0}}>
//                 <div className="logo" />
//                 <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//                     <Menu.Item key="1" icon={<UserOutlined />}><Link to={`/profile/${myId}`}>Мой профиль</Link></Menu.Item>
//                     <Menu.Item key="2" icon={<TeamOutlined />}><Link to='/users' />Пользователи</Menu.Item>
//                     <Menu.Item key="3" icon={<MessageOutlined />}><Link to='/dialogs' />Диалоги</Menu.Item>
//                     <Menu.Item key="4" icon={<LogoutOutlined />} danger={true} onClick={logoutMe}>Выйти</Menu.Item>
//                 </Menu>
//             </Sider>
//         )
//     }
// }

// export default Sidebar