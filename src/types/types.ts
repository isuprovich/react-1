export type PostsType = {
    id: number,
    user: string,
    message: string
}
export type ContactsType = {
    gitHub: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}
export type PhotosType = {
    small: string,
    large: string
}
export type ProfileType = {
    userid: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}
export type UsersType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}