export interface ICreateOrderModel {
    amount: string;
    currency: 'INR' | 'USD' | 'GBP';
    receipt: string;
    method: SupportedPaymentMethods,
    notes?: {
        [key: string]: string
    }
}

export interface IOrderResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: 'INR' | 'USD' | 'GBP';
    receipt: string;
    status: string;
    attempts: number;
    notes?: object
}

export interface IVerifyOrderModel {
    order_id: string;
    payment_id: string;
    razorpay_signature: string;
}

export interface IVerifyVpaModel {
    vpa: string;
    success: boolean;
    customer_name: string
}

export interface IGenerateQRRequestModel {
    amount: number
}

export interface IGenerateQRResponseModel {
    id: string,
    entity: string,
    created_at: number,
    name?: string,
    usage?: string,
    type: string,
    image_url: string,
    payment_amount: number,
    status: string,
    description?: string,
    fixed_amount: boolean,
    payments_amount_received?: number,
    payments_count_received?: number,
    notes?: {
        [x: string]: any
    },
    customer_id?: string,
    close_by: number,
    closed_at?: number,
    close_reason?: string
}

export type SupportedPaymentMethods = 'card' | 'upi' | 'netbanking' | 'wallet'