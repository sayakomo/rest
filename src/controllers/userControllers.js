import { auth } from "../middleware/auth.js";
import { Shopee, ShopeeFood } from "../services/services.js";

function safeStringify(obj) {
    const cache = new Set();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                return;
            }
            cache.add(value);
        }
        return value;
    });
}

export const getType = async (req, res) => {
    const { Type, Versi, Device, Tikor, Search, Keyword } = req.body;

    if (!Type && !Search) {
        return res.status(400).json({ message: "Missing Type or Search" });
    }

    try {
        let result;

        if (Type) {
            switch (Type.toLowerCase()) {
                case "komo":
                    result = await auth(Versi, Device, res);
                    break;
                case "shopee":
                    result = await Shopee(Device, Tikor, res);
                    break;
                default:
                    return res.status(400).json({ message: "Invalid Type" });
            }
        }

        if (Search) {
            switch (Search.toLowerCase()) {
                case "shopee":
                    result = await ShopeeFood(Device, Tikor, Keyword, res);
                    break;
                default:
                    return res.status(400).json({ message: "Invalid Search" });
            }
        }
        
        if (result) {
            return res.json(JSON.parse(safeStringify(result)));
        } else {
            return res.status(400).json({ message: "No result found for the given Type or Search" });
        }

    } catch (error) {
        console.error("Error:", error);  // Log error untuk debugging
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
};

export const komo = async (req, res) => {
    try {
        const data = {
            appVersion: "1.0",
            message: "Please register first",
            status: "good"
        };
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};