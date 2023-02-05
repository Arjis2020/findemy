import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICardDetails, IMobileWalletDetails, INetbankingDetails, IPaymentDetails, IUPIDetails, SupportedPaymentMethods } from "../../models/order.model"
// import { ICardDetails, IPaymentDetails, IUPIDetails, INetbankingDetails, IMobileWalletDetails } from "../actions/payment.action"
import { PaymentActions } from "../constants"

export type PaymentState = IPaymentDetails


type PaymentAction = {
    type?: string,
    method: SupportedPaymentMethods,
    details: ICardDetails | IUPIDetails | INetbankingDetails | IMobileWalletDetails
}

let initialState: PaymentState = {}

// export const paymentReducer = (state = initialState, action: PaymentAction) => {
//     switch (action.type) {
//         case PaymentActions.PAYMENT_METHOD :
//             return {
//                 ...state,
//                 method: action.method
//             }
//         case PaymentActions.PAYMENT_DETAILS:
//             return {
//                 ...state,
//                 details: action.details
//             }
//         case PaymentActions.RESET_PAYMENT:
//             return initialState
//     }
//     return state
// }

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        setPaymentMethod: (store, action: PayloadAction<SupportedPaymentMethods>) => {
            store.method = action.payload
        },
        setPaymentDetails: (store, action: PayloadAction<ICardDetails | IUPIDetails | INetbankingDetails | IMobileWalletDetails>) => {
            store.details = action.payload
        },
        resetPayment: (store) => {
            store = initialState
        }
    }
})

export const { setPaymentMethod, setPaymentDetails, resetPayment } = paymentSlice.actions
export default paymentSlice.reducer