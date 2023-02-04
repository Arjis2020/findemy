import { SupportedPaymentMethods } from "../../models/order.model";
import { PaymentActions } from "../constants"

interface ICommonDetails {
    method?: SupportedPaymentMethods;
}

export interface ICardDetails {
    name: string;
    number: string;
    cvv: string;
    expiry: string;
    notes?: {
        [x: string]: string
    };
}

export interface IUPIDetails {
    vpa: string;
    notes?: {
        [x: string]: string
    };
}

export interface INetbankingDetails {
    bank: string;
    notes?: {
        [x: string]: string
    };
}

export interface IMobileWalletDetails {
    wallet: string;
    notes?: {
        [x: string]: string
    };
}

export interface IPaymentDetails extends ICommonDetails {
    details?: ICardDetails | IUPIDetails | INetbankingDetails | IMobileWalletDetails
}

export const setPaymentMethod = (method: SupportedPaymentMethods) => {
    return {
        type: PaymentActions.PAYMENT_METHOD,
        method
    }
}

export const setPaymentDetails = (details: ICardDetails | IUPIDetails | INetbankingDetails | IMobileWalletDetails) => {
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