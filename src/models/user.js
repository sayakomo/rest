import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    expired: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model('users ', UsersSchema);