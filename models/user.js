import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: false,
            default: "user"
        },
    },
    { timestamps: true }
);

// Check if the User model already exists before defining it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
