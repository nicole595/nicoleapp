import { api } from '../../api'
export interface IRegister {
    name?: string
    email?: string
    password?: string
}
export interface IAuthenticate {
    email?: string
    password?: string
}
export interface IUser {
    id: number
    name: string
    email:string
}
export interface IUserLogin {
    user: IUser
    token: {
        token: string
        expires_at: string
    }
}
class UserData {
    register(data: IRegister) {
        return api.post<IUser>('/register', data)
    }
    login(data: IAuthenticate) {
        return api.post<IUserLogin>('/login', data)
    }
}
export default new UserData()