import axios from "axios";
import { CreateOrderModel, OrderResponse, VerifyOrderModel } from "../../models/order.model";
import { URL_CREATE_ORDER, URL_VERIFY_ORDER } from "../endpoints";

export const createOrder = async (parameters: CreateOrderModel): Promise<OrderResponse> => {
    try {
        const { data } = await axios.post<OrderResponse>(URL_CREATE_ORDER, {
            ...parameters
        })
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}

export const verifyOrder = async (params: VerifyOrderModel): Promise<void> => {
    try {
        await axios.post(URL_VERIFY_ORDER, {
            order_id: params.order_id,
            payment_id: params.payment_id
        }, {
            headers: {
                'x-razorpay-signature': params.razorpay_signature
            }
        })
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}