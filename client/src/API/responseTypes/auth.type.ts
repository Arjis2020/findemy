export interface LoginError {
    status: number;
    data?: Array<any> | object
}

export interface AuthError {
    login?: LoginError,
    signup?: LoginError
}