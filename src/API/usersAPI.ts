import { FilterType } from '../redux/usersReducer';
import { axiosInstance, GetItemsType, ResponseType } from './api';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number | undefined, filter: FilterType) {
        return axiosInstance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${filter.term}` + (filter.friend === null ? '' : `&friend=${filter.friend}`))
            .then(res => res.data)
    },
    follow(userId: number) {
        return axiosInstance.post<ResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },
    unfollow(userId: number) {
        return axiosInstance.delete<ResponseType>(`follow/${userId}`)
            .then(res => res.data)
    }
}