//import { extend, allow } from "../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/joi";

const log = require("./logger");
const Log = new log();
const express = require("express");
const app = express();
const Joi = require("joi");
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');


app.use(helmet());//third party middleware

app.use(express.json());
app.use(express.urlencoded( {extended : true}));
app.use(express.static("public"));//buith in middlewares


app.use(Log.logger);
app.use(Log.Autheticate); //custom middleware


if(app.get('env') === 'development'){
    app.use(morgan('tiny'));// third party middleware
startupDebugger(`morgan enabled ${process.env.NODE_ENV}`);
}

dbDebugger(`morgan enabled ${process.env.NODE_ENV}`);

const courses = [
{id: 1 , name : "course1"},
{id:2 , name : "course2"},
{id:3 , name : "course3"}
];
app.get("/" , (req , res) =>{
    res.send("Hello world");
});





app.get("/api/courses", (req , res) => {
    res.send(courses);
})

app.get("/api/course/:id", (req , res ) =>{
    let course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) res.status(404).send("course with the id not found!!!!!!");
    res.send(course);
})


app.post("/api/courses" , (req , res) => {

 
    const result = validateCourses(req.body);

    if(result.error ){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id : courses.length + 1,
        name : req.body.name

    }
    courses.push(course);
    res.send(course)
})

app.put("/api/courses/:id" , (req , res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    let cou = courses.every(c => {
        console.log(c.name);
    return c.name;
    });
    console.log(cou);
    if(!course){
    res.status(404).send("Course with the given ID wasn't found!!!!!!!!!!");
   return;
    }

  const {error} = validateCourses(req.body);
  if(error){
      res.status(400).send(error.details[0].message);
      return;
  }


  course.name = req.body.name;
  res.send(course);
})


app.delete("/api/course/:id" , (req,res) =>{

    const course = courses.find(c => c.id === req.params.id);
    if(!course){
        res.status(404).send("Record with the given id was not found!!!!!!!!");
        return;
    }

 const index = indexOf(course);
    courses.splice(index , 1);
    
   res.send(course);
})

function validateCourses(course){
    const schema = {
        name : Joi.string().required().min(3)
    }
 
    return Joi.validate(course , schema);

}


var port = process.env.PORT || 3000 ;
app.listen(port, ()=> console.log(`server started on ${port}` ));