const express = require("express");

const app = express();

app.use(express.json());

let car = [
  {
    id: 1,
    name: "Mehran"
  },
  {
    id: 2,
    name: "Alto"
  }
];

app.get("/", (req, res) => {
  res.send("Welcome to my Showroom");
});

// data view OR read
app.get("/carData", (req, res) => {
  res.send(car);
});

// data add
app.post("/carData", (req, res) => {
  console.log(req.body);
  const data = {
    id: car.length + 1,
    name: req.body.name
  };
  car.push(data);
  res.send(data);
});

// search data
app.get("/carData/:id", (req, res) => {
  const search = car.find(car_data => car_data.id === parseInt(req.params.id));
  if (!search)
    return res.status(400).send("Enter a valid ID that is already present");
  res.send(search);
});

// Data update
app.put("/carData/:id", (req, res) => {
  const search = car.find(car_data => car_data.id === parseInt(req.params.id));
  if (!search)
    return res.status(400).send("Enter a valid ID that is already present");
  search.name = req.body.name;
  res.send(search);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server Running");
});
