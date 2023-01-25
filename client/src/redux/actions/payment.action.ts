import { SupportedPaymentMethods } from "../../models/order.model";
import { PaymentActions } from "../constants"

interface CommonDetails {
    method?: SupportedPaymentMethods
}

export interface CardDetails extends CommonDetails {
    name: string;
    number: string;
    cvv: string;
    expiry: string
}

export interface UPIDetails extends CommonDetails {
    vpa: string
}

export interface PaymentDetails extends CommonDetails {
    details?: CardDetails | UPIDetails
}

export const setPaymentMethod = (method: SupportedPaymentMethods) => {
    return {
        type: PaymentActions.PAYMENT_METHOD,
        method
    }
}

export const setPaymentDetails = (details: CardDetails | UPIDetails) => {
    return {
        type: PaymentActions.PAYMENT_DETAILS,
        details
    }
}

export const resetPayment = () => {
    return {
        type : PaymentActions.RESET_PAYMENT
    }
}