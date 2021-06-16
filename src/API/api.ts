import { UsersType } from './../types/types';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { 'API-KEY': '45bf7595-daa3-4596-8932-c7910484d1d2' }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptchaEnum {
    CapthchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export type ResponseType<D = {}, RC = ResultCodeEnum | ResultCodeCaptchaEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}