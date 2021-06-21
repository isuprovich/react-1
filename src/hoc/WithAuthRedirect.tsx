import React from "react";
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Preloader from '../components/common/preloader/preloader';
import { AppStateType } from "../redux/reduxStore";

type MSTPType = {
    isAuth: boolean,
    isFetching: boolean
}
type MDTPType = {
}

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.fetchAnim.isFetching
} as MSTPType)

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MSTPType & MDTPType> = (props) => {
        let { isAuth, isFetching, ...restProps } = props
        if (!isAuth) return <Redirect to={'/login'} />
        return <>
            {isFetching ? <Preloader /> : null}
            <WrappedComponent {...restProps as WCP} />
        </>
    }

    let ConnectedAuthRedirectComponent = connect<MSTPType, MDTPType, WCP, AppStateType>(mapStateToProps, {})(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}