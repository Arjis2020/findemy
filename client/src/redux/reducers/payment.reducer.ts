import { ICardDetails, IPaymentDetails, IUPIDetails, INetbankingDetails, IMobileWalletDetails } from "../actions/payment.action"
import { PaymentActions } from "../constants"

export type PaymentState = IPaymentDetails

let initialState: PaymentState = {}

type PaymentAction = {
    type?: string,
    method: string,
    details: ICardDetails | IUPIDetails | INetbankingDetails | IMobileWalletDetails
}

export const paymentReducer = (state = initialState, action: PaymentAction) => {
    switch (action.type) {
        case PaymentActions.PAYMENT_METHOD :
            return {
                ...state,
                method: action.method
            }
        case PaymentActions.PAYMENT_DETAILS:
            return {
                ...state,
                details: action.details
            }
        case PaymentActions.RESET_PAYMENT:
            return initialState
    }
    return state
}