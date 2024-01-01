const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoDB = require("./dbconfig/mongoDB");
const AUTH = require('./routes/auth')
const POST = require('./routes/post')


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use('/api', AUTH)
app.use('/api', POST)

app.get('/', (req,res) => {
    res.json({message: 'selam ali kim'})
})

const PORT = process.env.PORT || 5010;

mongoDB();
app.listen(PORT, () => {
  console.log(`${PORT} Port is active`);
});
