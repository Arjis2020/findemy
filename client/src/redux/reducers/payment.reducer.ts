import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICardDetails, IMobileWalletDetails, INetbankingDetails, IPaymentDetails, IUPIDetails, SupportedPaymentMethods } from "../../models/order.model"

export type PaymentState = IPaymentDetails

const initialState: PaymentState = {}

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