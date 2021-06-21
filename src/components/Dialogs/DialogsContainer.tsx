import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { dialogsActions } from '../../redux/dialogsReducer';
import { AppStateType } from '../../redux/reduxStore';
import Dialogs from './Dialogs';

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage: dialogsActions.sendMessage}),
    withAuthRedirect
)(Dialogs);