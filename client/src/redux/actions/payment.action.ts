import { SupportedPaymentMethods } from "../../models/order.model";
import { PaymentActions } from "../constants"

interface CommonDetails {
    method?: SupportedPaymentMethods;
}

export interface CardDetails {
    name: string;
    number: string;
    cvv: string;
    expiry: string;
    notes?: {
        [x: string]: string
    };
}

export interface UPIDetails {
    vpa: string;
    notes?: {
        [x: string]: string
    };
}

export interface NetbankingDetails {
    bank: string;
    notes?: {
        [x: string]: string
    };
}

export interface MobileWalletDetails {
    wallet: string;
    notes?: {
        [x: string]: string
    };
}

export interface PaymentDetails extends CommonDetails {
    details?: CardDetails | UPIDetails | NetbankingDetails | MobileWalletDetails
}

export const setPaymentMethod = (method: SupportedPaymentMethods) => {
    return {
        type: PaymentActions.PAYMENT_METHOD,
        method
    }
}

export const setPaymentDetails = (details: CardDetails | UPIDetails | NetbankingDetails | MobileWalletDetails) => {
    return {
        type: PaymentActions.PAYMENT_DETAILS,
        details
    }
}

export const resetPayment = () => {
    return {
        type: PaymentActions.RESET_PAYMENT
    }
}