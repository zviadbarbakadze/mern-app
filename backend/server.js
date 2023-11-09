const express = require("express");
const workoutsRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutsRoutes);

//connect to the db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port :`, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
