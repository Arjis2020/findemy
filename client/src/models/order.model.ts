export interface CreateOrderModel {
    amount: string;
    currency: 'INR' | 'USD' | 'GBP';
    receipt: string;
    notes?: {
        [key: string]: string
    }
}

export interface OrderResponse {
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

export interface VerifyOrderModel {
    order_id: string;
    payment_id: string;
    razorpay_signature: string;
}

export type SupportedPaymentMethods = 'card' | 'upi' | 'paytm' | 'netbanking' | 'mobile-wallet'