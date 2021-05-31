import React from 'react';
import './App.css';
import Preloader from './components/common/preloader/preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import { Redirect, Route, withRouter } from 'react-router';
import { initApp } from './redux/appReducer'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSuspense } from './hoc/WithSuspense';

const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

class App extends React.Component {
  componentDidMount() {
    this.props.initApp();
  }
  render() {
    if (!this.props.initialized) return <Preloader />
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <div className='app-wrapper-content'>
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
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initApp })
)(App)