import Users from "../models/user.js";

const createUserResponse = (version, user, userType, isExpired) => ({
    ID: version,
    Device: user.user,
    Versi: userType,
    Admin: user.admin,
    Expired: user.expired,
    ON: isExpired,
    OFF: isExpired,
});

const isUserExpired = (expirationDate) => new Date(expirationDate) < new Date();
const determineUserType = (user) => user.admin ? 'VIP' : 'Trial';

export const auth = async (version, device) => {
    try {
        const user = await Users.findOne({ user: device });

        if (!user) {
            return { error: "Regist dulu bang" };
        }

        const expired = isUserExpired(user.expired);
        const userType = determineUserType(user);
        const userResponse = createUserResponse(version, user, userType, expired);

        if (expired) {
            return { komo: [userResponse] };
        }

        return { komo: [userResponse] };
    } catch (error) {
        return { error: error.message };
    }
};

export const isExpired = async (device) => {
    try {
        const user = await Users.findOne({ user: device });
        if (!user) {
            return { error: "Regist dulu bang" };
        }

        const expired = isUserExpired(user.expired);
        
        if (expired) {
            user.status = false;
            await user.save();
        }

        return { message: expired ? false : true };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};