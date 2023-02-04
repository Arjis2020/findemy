import axios from "axios";
import { ICreateOrderModel, IGenerateQRRequestModel, IGenerateQRResponseModel, IOrderResponse, IVerifyOrderModel, IVerifyVpaModel } from "../../models/order.model";
import { URL_CREATE_ORDER, URL_GENERTE_QR, URL_GET_PAYMENT_METHODS, URL_VERIFY_ORDER, URL_VERIFY_VPA } from "../endpoints";

export const createOrder = async (parameters: ICreateOrderModel): Promise<IOrderResponse> => {
    try {
        const { data } = await axios.post<IOrderResponse>(URL_CREATE_ORDER, {
            ...parameters
        })
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}

export const verifyOrder = async (params: IVerifyOrderModel): Promise<void> => {
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

export const verifyVpa = async (vpa: string): Promise<IVerifyVpaModel> => {
    try {
        const { data } = await axios.post<IVerifyVpaModel>(URL_VERIFY_VPA, {
            vpa
        })
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}

export const generateUpiQR = async (params: IGenerateQRRequestModel): Promise<IGenerateQRResponseModel> => {
    try {
        const { data } = await axios.post<IGenerateQRResponseModel>(URL_GENERTE_QR, {
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