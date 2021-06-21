import { PhotosType, ProfileType } from '../types/types';
import { axiosInstance, ResponseType } from './api';

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return axiosInstance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getProfileStatus(userId: number | null) {
        return axiosInstance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return axiosInstance.put<ResponseType>(`profile/status`, { status }).then(res => res.data)
    },
    updateProfileInfo(newProfileData: ProfileType) {
        return axiosInstance.put<ResponseType>(`profile`, newProfileData).then(res => res.data)
    },
    uploadAva(file: File) {
        const formData = new FormData();
        formData.append("image", file)
        return axiosInstance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => res.data)
    }
}