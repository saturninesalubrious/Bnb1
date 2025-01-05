import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";


import data from "./data.js";

import Listing from "../models/listing.js"

async function main() {
 await mongoose.connect(process.env.MONGOURL)
}

main().then(() => {
 console.log("connected to db")
})
.catch((err) => {
 console.log(err)
});

const initDB = async() => {

 await Listing.deleteMany({});

 await Listing.insertMany(data.data);

 console.log("data was initalized")

}

initDB();