import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.send("Kinds Admin Backend");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
