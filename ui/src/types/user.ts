
export interface RegisterUser {
    name: string
    email: string
    password: string
}

export type LoginUser = Omit<RegisterUser,'name'>

export interface UserSession {
    isLoggedIn: boolean
}
