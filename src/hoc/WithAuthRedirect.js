import React from "react";
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Preloader from '../components/common/preloader/preloader';

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.fetchAnim.isFetching
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'} />
            return <> 
                {this.props.isFetching ? <Preloader /> : null}
                <Component {...this.props} />
            </>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}