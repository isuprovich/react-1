import React from 'react';
import './App.css';
import Preloader from './components/common/preloader/preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Footer from './components/Footer/Footer';
import { Route, withRouter } from 'react-router';
import { initApp } from './redux/appReducer'
import { connect } from 'react-redux';
import { compose } from 'redux';

class App extends React.Component {
  componentDidMount() {
    this.props.initApp();
  }
  render() {
    if(!this.props.initialized) return <Preloader />
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <div className='app-wrapper-content'>
          <Route path='/dialogs'
            render={() => (<DialogsContainer />)} />
          <Route path='/profile/:userid?'
            render={() => (<ProfileContainer />)} />
          <Route path='/users'
            render={() => (<UsersContainer />)} />
          <Route path='/login'
            render={() => (<LoginContainer />)} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose (
  withRouter,
  connect(mapStateToProps, { initApp })
)(App)