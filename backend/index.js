const express = require("express");
const cors = require("cors");
const app = express();
const createUser = require("./routes/CreateUser"); 
const DisplayData = require('./routes/DisplayData')

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const connectDB = require("./db");
connectDB();

app.use("/api", createUser);
app.use("/api", DisplayData);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
