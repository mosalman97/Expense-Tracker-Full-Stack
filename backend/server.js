import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("server is working now");
});

app.listen(5001, () => {
	console.log(`server is running under 50001 PORT`);
});
