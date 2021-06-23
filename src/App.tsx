import { AppStateType } from './redux/reduxStore';
import React from 'react';
import './App.css';
import Preloader from './components/common/preloader/preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import { Redirect, Route, withRouter } from 'react-router';
import { initApp, showErrorThunk } from './redux/appReducer'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSuspense } from './hoc/WithSuspense';
import Notification from './components/common/notification/notification';

const LoginContainer = withSuspense(React.lazy(() => import('./components/Login/LoginContainer')))
const ProfileContainer = withSuspense(React.lazy(() => import('./components/Profile/ProfileContainer')))
const UsersPage = withSuspense(React.lazy(() => import('./components/Users/UsersPage')))
const DialogsContainer = withSuspense(React.lazy(() => import('./components/Dialogs/DialogsContainer')))

type MSTPType = {
  initialized: boolean,
  notifyError: any,
  errorMessage: string,
  isFetching: boolean
}

type MDTPType = {
  initApp: () => void,
  showErrorThunk: (notifyError: boolean, errorMessage: string) => void
}
type PropsType = MSTPType & MDTPType

class App extends React.Component<PropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    this.props.showErrorThunk(true, 'some error')
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
    return <div className='app-wrapper'>
        {this.props.isFetching && <Preloader />}
        <HeaderContainer />
        <div className='app-wrapper-content'>
          {this.props.notifyError && <Notification errorMessage={this.props.errorMessage} />}
          <Route exact path='/'
            render={() => <Redirect to={'/profile'} />} />
          <Route path='/login'
            render={() => <LoginContainer />} />
          <Route path='/profile/:userId?'
            render={() => <ProfileContainer />} />
          <Route path='/dialogs'
            render={() => <DialogsContainer />} />
          <Route path='/users'
            render={() => <UsersPage />} />
        </div>
        <Footer />
      </div>
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