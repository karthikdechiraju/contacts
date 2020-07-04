import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { routes } from "./server/routes";
import { db_config } from "./server/config/db";

const app = express();

app.use(express.static(path.join(__dirname, 'client','build')));

const PORT = process.env.PORT || 5000;

var url = `mongodb://${db_config.url}/${db_config.db_name}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to " + url);
});
mongoose.connection.on("error", function (err) {
    console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
});

app.use(bodyParser.json());

app.use('/api',(req,res,next) => {
    if(req.headers.authorization === "Basic ZGVtbzpwQDU1dzByZA=="){
        next()
    }else{
        res.status(401).json({
            error: 'Not authorized'
        });
    }
});

app.use("/api", routes);

app.get("*", (req, res) => {
    res.render(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
});