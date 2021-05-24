import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
    return (
        <header className={s.header}>
            <div>
                {props.isAuth
                    ? <div>
                        <nav className={s.nav}>
                            <div className={s.item}>
                                <NavLink to='/dialogs' className={s.navlink} activeClassName={s.active}>Диалоги</NavLink>
                            </div>
                            <div className={s.item}>
                                <NavLink to='/users' className={s.navlink} activeClassName={s.active}>Поиск людей</NavLink>
                            </div>
                        </nav>
                        <div className={s.loginWrapper}>
                            <div className={s.item}>
                                <NavLink to={`/profile/${props.myId}`} className={s.navlink} activeClassName={s.active}>{props.myLogin}</NavLink>
                            </div>
                            <div className={s.item}>
                                <NavLink to='/login' className={s.navlink} onClick={props.logout}>Выход</NavLink>
                            </div>
                        </div>
                    </div>
                    : <div className={s.loginWrapper}>
                        <div className={s.item}>
                            <NavLink to='/login' className={s.navlink} activeClassName={s.active}>Вход</NavLink>
                        </div>
                    </div>

                }
            </div>
        </header>
    );
}

export default Header;