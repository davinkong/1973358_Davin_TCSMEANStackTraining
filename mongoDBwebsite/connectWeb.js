let express = require("express");   // load the module 
let app = express();        // creating the reference of express module
let port =8080;
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));    // enable any format body data

//All info to connect to DB when needed 
let url = "mongodb://localhost:27017/coursePlatform";
let obj = require("mongoose");  // Load Modules
obj.Promise = global.Promise;   // Create the reference       

const mongodb = {
    useUnifiedTopology:true,
    useNewUrlParser:true
}

let courseSchema = obj.Schema({
    _id : Number,
    courseName : String,
    description : String,
    amount : Number,
});

let index = `
<h2> Course Platform</h2>
<a href = "/addCourse"> Add Course </a><br/>
<a href = "/updateCourse"> Update Course </a><br/>
<a href = "/deleteCourse"> Delete Course</a><br/>
<a href = "/fetchCourse"> Fetch Course</a><br/>
`
app.get("/",(req,res)=> {
    res.setHeader("content-type","text/html"); 
    res.write(index);
    res.end()
})

let addCrs = `
<h2> Add Course</h2>
<form action="/addCourse/info" method="post">
        <label>Course Id</label>
        <input type="number" name="courseId"/><br/>
        <label>Course Name</label>
        <input type="text" name="courseName"/><br/>
        <label>Description</label>
        <input type="text" name="description"/><br/>
        <label>Amount</label>
        <input type="number" name="amount"/><br/>
        <input type="submit" value="Add"/>
        <input type="reset" value="Reset"/>
    </form>
`
app.get("/addCourse",(req,res)=> {
    res.setHeader("content-type","text/html"); 
    res.write(addCrs);
    res.end()
})
let updateCrs = `
<h2> Update Course</h2>
<form action="/updateCourse/info" method="post">
        <label>Course Id</label>
        <input type="number" name="courseId"/><br/>
        <label>Amount</label>
        <input type="number" name="amount"/><br/>
        <input type="submit" value="Update"/>
        <input type="reset" value="Reset"/>
    </form>
`
app.get("/updateCourse",(req,res)=> {
    res.setHeader("content-type","text/html"); 
    res.write(updateCrs);
    res.end()
})
let deleteCrs = `
<h2> Delete Course </h2> 
    <form action="/deleteCourse/info" method="post">
        <label>Course Id</label>
        <input type="number" name="courseId"/><br/>
        <input type="submit" value="Delete"/>
        <input type="reset" value="Reset"/>
    </form>
`   

app.get("/deleteCourse",(req,res)=> {
    res.setHeader("content-type","text/html"); 
    res.write(deleteCrs);
    res.end()
})

let fetchCrs = `
<h2> List of Courses: </h2> 
`
app.get("/fetchCourse",(req,res)=> {
   
    obj.connect(url, mongodb) // Ready to connect
    let db = obj.connection;
    db.on("error", (err) => console.log(err))  // On Connection error
        // Creating Model using schema 
    let Course = obj.model("",courseSchema,"coursePlatform");
    Course.find({},(err,result)=>{
        if(!err){
            res.send(result)
        }
        obj.disconnect();
    })
})
app.post("/deleteCourse/info",(req,res)=> {
    let courseId = req.body.courseId;
    obj.connect(url, mongodb) // Ready to connect
    let db = obj.connection;
    db.on("error", (err) => console.log(err))  // On Connection error
        // Creating Model using schema 
    let Course = obj.model("",courseSchema,"coursePlatform");
    Course.deleteOne({_id:courseId},(err,result)=> {
        if(!err){
            //console.log(result);
            if(result.deleted>0){
                    console.log("Successfully deleted ");
                    res.redirect('http://localhost:8080/');
            }else {
                    console.log("deleted");
            }
        }
        obj.disconnect();
    })
})

app.post("/addCourse/info",(req,res)=> {
    let courseId = req.body.courseId;
    let courseName = req.body.courseName;
    let description = req.body.description;
    let amount = req.body.amount;

    obj.connect(url, mongodb) // Ready to connect
    let db = obj.connection;
    db.on("error", (err) => console.log(err))  // On Connection error
        // Creating Model using schema 
    let Course = obj.model("",courseSchema,"coursePlatform");
        // Creating reference using model 
    let data = new Course({_id:courseId,
        courseName:courseName,
        description:description, 
        amount:amount});
    data.save((err,result)=>{
        if(!err){
            res.redirect('http://localhost:8080/');
            console.log("Course has been added successfully")
        }else {
            console.log(err);
            res.send(err)
        }
        obj.disconnect();      
    })
})

app.post("/updateCourse/info",(req,res)=> {
    let courseId = req.body.courseId;
    let amount = req.body.amount;
    obj.connect(url, mongodb) // Ready to connect
    let db = obj.connection;
    db.on("error", (err) => console.log(err))  // On Connection error
        // Creating Model using schema 
    let Course = obj.model("",courseSchema,"coursePlatform");
    Course.updateOne({_id:courseId},{$set:{amount:amount}},(err,result)=> {    
        if(!err){
            if(result.nModified>0){
                res.redirect('http://localhost:8080/');
                console.log("Course has been updated")
            }else {
                console.log("Failed to update")
            }
        }
        obj.disconnect();
    })
})


app.listen(port,()=>console.log(`Server running on port nubmer ${port}`));