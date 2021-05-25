import React from 'react';
import s from './Users.module.css';

let UsersPagination = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let startPosition = 0;
    if (props.currentPage > 5) {
        startPosition = props.currentPage - 6
    }
    return <div className={s.pageButtonsWrapper}>
        <span
            className={s.pageButton}
            onClick={() => { if (props.currentPage > 1) { props.onPageChange(props.currentPage - 1) } }}>{'<'}
        </span>
        {pages.slice(startPosition, props.currentPage + 5).map(p => {
            return <div className={s.pageButton} key={p}>
                <div
                    className={props.currentPage === p ? `${s.pageButton} ${s.selectedPage}` : undefined}
                    onClick={() => { props.onPageChange(p) }}>
                    {p}
                </div>
            </div>
        })}
        <span
            className={s.pageButton}
            onClick={() => { if (props.currentPage < pagesCount) { props.onPageChange(props.currentPage + 1) } }}>{'>'}
        </span>
    </div>
}

export default UsersPagination;