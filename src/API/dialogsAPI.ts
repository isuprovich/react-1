import { axiosInstance, GetItemsType } from './api';

export const dialogsAPI = {
    getFriends() {
        return axiosInstance.get<GetItemsType>('users?page=1&count=100&friend=true')
            .then(res => res.data)
    }
}