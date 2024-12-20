import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String, // cloudinary url
        default:'https://res.cloudinary.com/madhav-daiict/image/upload/v1734681924/rcdmth9309na2zivs0i9.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin' , 'teacher'],
        default: 'user'
    },
    refreshToken: {
        type: String // to be generated at time of login
    }

}, { timestamps: true });


userSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.log(`Error in hashing password: ${error.message} || from user.model.js`);
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) { 
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAccessToken = async function () { 
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        avatar: this.avatar,
        role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });
}

userSchema.methods.generateRefreshToken = async function () { 
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            
        });
}

export const User = mongoose.model('User', userSchema);