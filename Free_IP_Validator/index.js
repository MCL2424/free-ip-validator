import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://scraper.run";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.post("/", async (req, res) => {
  console.log(req.body);
  const ip= req.body.ip;

  try {
    const response = await axios.get(API_URL + `/ip?addr=${ip}`);
    const result = response.data;
    res.render("index.ejs", { content: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
