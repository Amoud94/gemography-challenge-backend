const express = require("express");
var cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/gitRestAPI");

app.use(bodyParser.json());
app.use(cors());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
