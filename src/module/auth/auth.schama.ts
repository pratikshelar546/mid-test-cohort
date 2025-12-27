import mongoose, { Schema } from "mongoose";
import { user } from "./auth.types";
import bcrypt from "bcrypt";

const userSchema = new Schema<user>({
    name: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        requried: true
    },
    role: {
        type: String,
        required: true,
        enum: ["teacher", "student"]
    }
},
    {
        timestamps: {
            createdAt: "created_At",
            updatedAt: "updated_at",
        }
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function (plainPassword: string) {    
    return bcrypt.compare(plainPassword, this.password);
};

export const UserModel = mongoose.model<user>("user", userSchema);