import { AppStateType } from './redux/reduxStore';
import React from 'react';
import Preloader from './components/common/preloader/preloader';
import { Redirect, Route, withRouter } from 'react-router';
import { initApp, showErrorThunk } from './redux/appReducer'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSuspense } from './hoc/WithSuspense';
import { Link } from 'react-router-dom';
import Notification from './components/common/notification/notification';
import 'antd/dist/antd.css';
import './App.css'
import { Layout, Menu, notification, Button } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Content, Footer, Sider } = Layout;

const LoginPage = withSuspense(React.lazy(() => import('./components/Login/LoginPage')))
const ProfileContainer = withSuspense(React.lazy(() => import('./components/Profile/ProfileContainer')))
const UsersPage = withSuspense(React.lazy(() => import('./components/Users/UsersPage')))
const DialogsContainer = withSuspense(React.lazy(() => import('./components/Dialogs/DialogsContainer')))

type MSTPType = {
  initialized: boolean,
  notifyError: boolean,
  errorMessage: string,
  isFetching: boolean
}

type MDTPType = {
  initApp: () => void,
  showErrorThunk: (notifyError: boolean, errorMessage: string) => void
}
type PropsType = MSTPType & MDTPType

class App extends React.Component<PropsType> {
  openNotification = (message: string) => {
    notification.error({
      message: message,
      description: this.props.errorMessage,
      placement: 'bottomLeft',
      duration: 10
    });
  };
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    //this.props.showErrorThunk(true, 'Неизвестная ошибка')
    //this.openNotification('Ошибка')
  }
  componentDidMount() {
    this.props.initApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }


  state = { collapsed: true };
  onCollapse = (collapsed: boolean) => { this.setState({ collapsed }) }

  render() {
    const { collapsed } = this.state
    if (!this.props.initialized) return <Preloader />
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {this.props.isFetching && <Preloader />}
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} style={{
          overflow: 'auto', height: '100vh', position: 'sticky', top: 0, left: 0
        }}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}><Link to='/profile' />Мой профиль</Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}><Link to='/users' />Пользователи</Menu.Item>
            <Menu.Item key="3" icon={<MessageOutlined />}><Link to='/dialogs' />Диалоги</Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} danger={true}>Выйти</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.notifyError && <Notification errorMessage={this.props.errorMessage} />}
              <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
              <Route path='/login' render={() => <LoginPage />} />
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/dialogs' render={() => <DialogsContainer />} />
              <Route path='/users' render={() => <UsersPage />} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>ReactVK ©2021 Created by Ivan Suprovich</Footer>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  notifyError: state.app.notifyError,
  errorMessage: state.app.errorMessage,
  isFetching: state.fetchAnim.isFetching
})

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initApp, showErrorThunk })
)(App)