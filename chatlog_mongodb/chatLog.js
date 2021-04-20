let app = require("express")();
let http = require("http").Server(app);   
let io = require("socket.io")(http);

let url = "mongodb://localhost:27017/chatLog";
let obj = require("mongoose");  // Load Modules
obj.Promise = global.Promise;   // Create the reference         
const mongodb = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

let chatSchema = obj.Schema({
    name:String, 
    msg:String, 
});

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/chatLog.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected to application.....");
    socket.on("chat",(msg)=> {
        obj.connect(url, mongodb);
        let db = obj.connection;
        db.on("error", (err) => console.log(err))
        let ChatLog = obj.model("",chatSchema, "chatLog" )

        let getChat = new ChatLog({name: msg.sendName, msg:msg.sendMsg})
        getChat.save((err, res) => {
            if (!err){
                console.log("Sent!")
            } else {
                console.log(err)
            }
        })
        console.log("name " + msg.sendName);
        console.log("massage : "+ msg.sendMsg);
    })
})

http.listen(9999, () => console.log(`Server is running on port number 9999`))