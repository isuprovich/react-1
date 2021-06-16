import { ProfileType } from '../types/types';
import { axiosInstance } from './api';

export const profileAPI = {
    getProfile(userid: number | null) {
        return axiosInstance.get<ProfileType>(`profile/${userid}`).then(res => res.data)
    },
    getProfileStatus(userid: number) {
        return axiosInstance.get(`profile/status/${userid}`)
    },
    updateStatus(status: string) {
        return axiosInstance.put(`profile/status`, { status })
    },
    updateProfileInfo(newProfileData: ProfileType) {
        return axiosInstance.put(`profile`, newProfileData)
    },
    uploadAva(file: any) {
        const formData = new FormData();
        formData.append("image", file)
        return axiosInstance.put(`profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}