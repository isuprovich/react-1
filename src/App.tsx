import { AppStateType } from './redux/reduxStore';
import React from 'react';
import Preloader from './components/common/preloader/preloader';
import { Redirect, Route, withRouter } from 'react-router';
import { initApp, showErrorThunk } from './redux/appReducer'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSuspense } from './hoc/WithSuspense';
//import Notification from './components/common/notification/notification';
import 'antd/dist/antd.css';
import './App.css'
import { Layout, notification } from 'antd';
import Sidebar from './components/Sidebar/Sidebar';
import LoadProgress from './components/common/LoadProgress/loadProgress'
import {Code500, Code404} from './components/common/ErrorPages/ErrorPages';
import ChatBtn from './pages/Chat/ChatPage';

const { Content, Footer } = Layout;

const LoginForm = withSuspense(React.lazy(() => import('./components/Login/LoginForm')))
const ProfileContainer = withSuspense(React.lazy(() => import('./components/Profile/ProfileContainer')))
const UsersPage = withSuspense(React.lazy(() => import('./components/Users/UsersPage')))
const DialogsContainer = withSuspense(React.lazy(() => import('./components/Dialogs/DialogsContainer')))

type MSTPType = {
  initialized: boolean,
  notifyError: boolean,
  errorMessage: string,
  errorCode: number,
  isFetching: boolean,
  isAuth: boolean
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

  render() {
    if (!this.props.initialized) return <Preloader />
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {this.props.isAuth && <Sidebar />}
        <Layout className="site-layout">
          {this.props.isFetching && <LoadProgress />}
          <Content style={{ margin: '16px' }}>
            {/* {this.props.notifyError && <Notification errorMessage={this.props.errorMessage} />} */}
            {this.props.errorCode && <Redirect to={`/${this.props.errorCode}`} />}
            <ChatBtn />
            <Route path='/login' render={() => <LoginForm />} />
            <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/users' render={() => <UsersPage />} />
            <Route path={`/500`} render={() => <Code500 errorMessage={this.props.errorMessage} />} />
            <Route path={`/404`} render={() => <Code404 errorMessage={this.props.errorMessage} />} />
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
  errorCode: state.app.errorCode,
  isFetching: state.fetchAnim.isFetching,
  isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initApp, showErrorThunk })
)(App)