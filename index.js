import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRouter from "./routes/users.js";
import path from "path";

const app = express();
const __dirname = path.resolve();
// const path = require("path");
dotenv.config();
// this ensures all the request of post would go through the
// localhost:5000/posts/..... not localhost:5000/

// body-parser extracts the entire body portion of an
// incoming request stream and exposes it on req.body.
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRouter);

// http://wwww.mongodb.com/cloud/atlas

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});
// app.get('/',(req,res)=>{
//   res.send('Hello to memories API')
// })

// This verifies if db is connected successfully or not, if yes then app
// listen on the given port no.or else it will throw an error

mongoose
	.connect(`${process.env.CONNECTION_URL}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() =>
		app.listen(process.env.PORT || 5000, () => console.log(`Server started`))
	)
	.catch((error) => console.log(`${error} did not connect`));

// to avoid warning in console
mongoose.set("useFindAndModify", false);
// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static("client/build"));
// }
