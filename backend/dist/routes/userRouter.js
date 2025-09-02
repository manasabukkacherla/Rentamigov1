"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../models/signup"));
const userRouter = express_1.default.Router();
userRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await signup_1.default.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});
userRouter.put('/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, username, email, phone, address, city, state, bio, twitter, instagram, website, linkedin, image } = req.body.editedUser;
        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            res.status(400).json({ error: "Invalid email format" });
            return;
        }
        const user = await signup_1.default.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (fullName)
            user.fullName = fullName;
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        if (phone)
            user.phone = phone;
        if (address)
            user.address = address;
        if (city)
            user.city = city;
        if (state)
            user.state = state;
        if (bio)
            user.bio = bio;
        console.log(bio);
        if (twitter)
            user.twitter = twitter;
        if (instagram)
            user.instagram = instagram;
        if (website)
            user.website = website;
        if (linkedin)
            user.linkedin = linkedin;
        if (image)
            user.image = image;
        await user.save();
        // console.log(user)
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to edit user" });
    }
});
exports.default = userRouter;
