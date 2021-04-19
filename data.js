let obj = require("mongoose");  // Load Modules
obj.Promise = global.Promise;   // Create the reference         
const fs = require('fs');                       
let url = "mongodb://localhost:27017/meanstack";
let meanstack = fs.readFileSync('call_data.json')
let info = JSON.parse(meanstack);


const mongooseDbOption = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
obj.connect(url, mongooseDbOption) // Ready to connect
let db = obj.connection;    // Connect to Database

    db.on("error", (err) => console.log("///////////// Error " + err))  // On Connection error
    db.once("open", (err1, res) => {
        //defined the Schema
        let ProductSchema = obj.Schema({
            _id:Number, 
            source:String, 
            destination:String, 
            sourceLocation:String, 
            destinationLocation:String, 
            callDuration:String, 
            roaming:String, 
            callCharge:String
        });

        //creating model using schema
        let Product = obj.model("" , ProductSchema, "meanstack")
        Product.insertMany(info, (err, res) => {
            if(!err){
                console.log("Successfully sent!")
            } else {
                console.log(err)
            }
            obj.disconnect();
        });
    })