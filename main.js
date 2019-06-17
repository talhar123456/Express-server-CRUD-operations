const express = require("express");

var fs = require("fs");

const app = express();

const Joi = require("@hapi/joi");

app.use(express.json());

const schema = Joi.object().keys({
  id: Joi.number(),
  name: Joi.string()
    .required()
    .min(5)
    .max(30),
  instructor: Joi.string()
    .required()
    .min(3)
    .max(15)
});

// View Data/////////////////////////////////////////////////////////////
var courses = [];

fs.readFile("data.json", (err, data) => {
  if (err) throw err;
  let courses = JSON.parse(data);

  app.get("/viewCoursesData", (req, res) => {
    res.send(courses);
  });

  // Data Add////////////////////////////////////////////////////////////
  app.post("/addCoursesData", (req, res) => {
    console.log(req.body);
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const data = {
      id: courses.length + 1,
      name: req.body.name,
      instructor: req.body.instructor
    };
    courses.push(data);
    res.send(data);
  });

  // Search Data//////////////////////////////////////////////////////////
  app.get("/searchCoursesData/:id", (req, res) => {
    const search = courses.find(
      courses_data => courses_data.id === parseInt(req.params.id)
    );
    if (!search)
      return res.status(400).send("Enter a valid ID that is already present");
    res.send(search);
  });

  // Data Update/////////////////////////////////////////////////////////
  app.put("/updateCoursesData/:id", (req, res) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const search = courses.find(
      courses_data => courses_data.id === parseInt(req.params.id)
    );
    if (!search)
      return res.status(400).send("Enter a valid ID that is already present");
    //   search.id = req.body.id;
    search.name = req.body.name;
    search.instructor = req.body.instructor;
    res.send(search);
  });

  // Data Delete//////////////////////////////////////////////////////////////
  app.delete("/delteCoursesData/:id", (req, res) => {
    const search = courses.find(
      courses_data => courses_data.id === parseInt(req.params.id)
    );
    if (!search)
      return res.status(400).send("Enter a valid ID that is already present");
    const position = courses.indexOf(search);
    courses.splice(position, 1);
    res.send("Data deleted");
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server Running");
});
