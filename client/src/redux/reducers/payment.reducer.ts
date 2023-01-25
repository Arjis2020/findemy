import { CardDetails, PaymentDetails, UPIDetails } from "../actions/payment.action"
import { PaymentActions } from "../constants"

export type PaymentState = PaymentDetails

let initialState: PaymentState = {}

export const paymentReducer = (state = initialState, action: any) => {
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