const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-origin request
app.use(cors());

mongoose.connect(
	"mongodb+srv://cjroberts:fccpass@fcc-82ksw.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
	console.log("connected to mongodb");
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(4000, () => {
	console.log("Listening...");
});
