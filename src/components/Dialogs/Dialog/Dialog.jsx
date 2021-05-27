import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialog.module.css';
import avaPlaceholder from '../../../assets/avatar_placeholder.png'

const Dialog = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog}>
            <div className={s.gridDiv}><img src={avaPlaceholder} alt='DialogAva' className={s.dialogAva}></img></div>
            <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    );
}

export default Dialog;