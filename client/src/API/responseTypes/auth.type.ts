export interface User {
    id: string;
    email: string;
    name: string;
    created_at: string;
}

export interface LoginError {
    status: number;
    data? : Array<any> | object
}