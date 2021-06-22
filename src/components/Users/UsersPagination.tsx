import s from './Users.module.css';

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (pageNumber: number) => void
}

const UsersPagination: React.FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChange }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let startPosition = 0;
    if (currentPage > 5) {
        startPosition = currentPage - 6
    }
    return <div className={s.pageButtonsWrapper}>
        <span
            className={s.pageButton}
            onClick={() => { if (currentPage > 1) { onPageChange(currentPage - 1) } }}>{'<'}
        </span>
        {pages.slice(startPosition, currentPage + 5).map(p => {
            return <div className={s.pageButton} key={p}>
                <div
                    className={currentPage === p ? `${s.pageButton} ${s.selectedPage}` : undefined}
                    onClick={() => { onPageChange(p) }}>
                    {p}
                </div>
            </div>
        })}
        <span
            className={s.pageButton}
            onClick={() => { if (currentPage < pagesCount) { onPageChange(currentPage + 1) } }}>{'>'}
        </span>
    </div>
}

export default UsersPagination;