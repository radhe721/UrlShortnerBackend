const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const connectDB = require("./lib/urlConnectionDb")
const urlRoute = require("./router/urlrouter");
const { redirectTooriginal } = require("./controller/urlcontroller");
app.use("/url",urlRoute);

// Add redirect handler at root level
app.get("/:shortId", redirectTooriginal);

app.get("/", (req, res) => {
    res.send("Welcome to the URL Shortener homepage!");
});
const PORT = 3000
app.listen(PORT,() => {
    console.log(`server is running on Port : http://localhost:${PORT}`);
    connectDB();
})