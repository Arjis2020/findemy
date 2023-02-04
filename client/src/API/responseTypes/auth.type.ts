export interface ILoginError {
    status: number;
    data?: Array<any> | object
}

export interface IAuthError {
    login?: ILoginError,
    signup?: ILoginError
}