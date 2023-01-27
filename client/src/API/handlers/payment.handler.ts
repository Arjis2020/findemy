import axios from "axios";
import { CreateOrderModel, GenerateQRRequestModel, GenerateQRResponseModel, OrderResponse, VerifyOrderModel, VerifyVpaModel } from "../../models/order.model";
import { URL_CREATE_ORDER, URL_GENERTE_QR, URL_GET_PAYMENT_METHODS, URL_VERIFY_ORDER, URL_VERIFY_VPA } from "../endpoints";

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

export const verifyVpa = async (vpa: string): Promise<VerifyVpaModel> => {
    try {
        const { data } = await axios.post<VerifyVpaModel>(URL_VERIFY_VPA, {
            vpa
        })
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}

export const generateUpiQR = async (params: GenerateQRRequestModel): Promise<GenerateQRResponseModel> => {
    try {
        const { data } = await axios.post<GenerateQRResponseModel>(URL_GENERTE_QR, {
            ...params
        })
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}

export const getNetbankingBanks = async (): Promise<any> => {
    try {
        const { data } = await axios.get<any>(URL_GET_PAYMENT_METHODS)
        return data.netbanking
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}

export const getMobileWallets = async (): Promise<any> => {
    try {
        const { data } = await axios.get<any>(URL_GET_PAYMENT_METHODS)
        return data.wallet
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}