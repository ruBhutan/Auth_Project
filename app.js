const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
