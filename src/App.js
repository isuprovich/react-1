import React from 'react';
import './App.css';
import ProfileContainer from './components/Profile/ProfileContainer';
import Footer from './components/Footer/Footer';
import UsersContainer from './components/Users/UsersContainer';
import { Route, withRouter } from 'react-router';
import HeaderContainer from './components/Header/HeaderContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import LoginContainer from './components/Login/LoginContainer';
import { initApp } from './redux/appReducer'
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/preloader/preloader';

class App extends React.Component {
  componentDidMount() {
    this.props.initApp();
    console.log('Initializing app...')
  }
  render() {
    if(!this.props.initialized) return <Preloader />
    console.log('Rerender all components...')
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