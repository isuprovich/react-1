import { axiosInstance, GetItemsType, ResponseType } from './api';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return axiosInstance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    follow(userid: number) {
        return axiosInstance.post<ResponseType>(`follow/${userid}`)
            .then(res => res.data)
    },
    unfollow(userid: number) {
        return axiosInstance.delete<ResponseType>(`follow/${userid}`)
            .then(res => res.data)
    }
}