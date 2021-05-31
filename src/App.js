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

const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

class App extends React.Component {
  // catchAllUnhandledErrors = ({reason}) => {
  //   this.props.showErrorThunk(true, reason.message)
  // }
  componentDidMount() {
    this.props.initApp();
    //window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }
  // componentWillUnmount() {
  //   window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  // }
  render() {
    if (!this.props.initialized) return <Preloader />
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <div className='app-wrapper-content'>
        {this.props.notifyError && <Notification errorMessage={this.props.errorMessage} />}
          <Route exact path='/'
            render={() => <Redirect to={'/profile'} />} />
          <Route path='/login'
            render={withSuspense(LoginContainer)} />
          <Route path='/profile/:userid?'
            render={withSuspense(ProfileContainer)} />
          <Route path='/dialogs'
            render={withSuspense(DialogsContainer)} />
          <Route path='/users'
            render={withSuspense(UsersContainer)} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  notifyError: state.app.notifyError,
  errorMessage: state.app.errorMessage
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initApp, showErrorThunk })
)(App)