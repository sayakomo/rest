import { isExpired } from "../middleware/auth.js";
import { getResto } from "./shopee/base.js";

export const Shopee = async (Device, Tikor) => {
    if (!Device || !Tikor) {
        return { status: 400, message: 'Device and Tikor are required' }
    }

    const expired = isExpired(Device);

    if (expired) {
        return { status: 401, message: 'USER expired' }
    }
    return await getResto(Tikor);
}

export const ShopeeFood = async (Device, Tikor, Keyword) => {
}