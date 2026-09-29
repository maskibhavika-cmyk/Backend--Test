const mongoose = require('mongoose');

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]); // force reliable DNS resolution for SRV lookup



async function connectDB() {


    try{

        await mongoose.connect(process.env.MONGO_URI)
       
        console.log("Database connected successfully");

    } catch (err) {
        console.error("Database connection error:", err);
    }
    }
     
    module.exports = connectDB