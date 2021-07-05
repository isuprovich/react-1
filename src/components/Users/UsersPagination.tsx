import { Pagination } from 'antd';

type UsersPaginationType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (page: number, pageSize?: number | undefined) => void
}

const UsersPagination: React.FC<UsersPaginationType> = ({ totalUsersCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    return <Pagination
        total={pagesCount}
        defaultCurrent={currentPage}
        showSizeChanger
        onChange={onPageChange}
        responsive={true}
        style={{display: 'flex', justifyContent: 'center'}}
    />
}

export default UsersPagination;