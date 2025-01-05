import mongoose from "mongoose";

const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
 email: {
  type: String,
  required: true
 }
});

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);