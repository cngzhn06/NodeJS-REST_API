const AUTH = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await AUTH.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "email account is being used" });
    }

    const passHash = await bcrypt.hash(password, 12);

    const newUser = await AUTH.create({ username, email, password: passHash });

    const userToken = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      status: "OK",
      newUser,
      userToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AUTH.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return res.status(400).json({ message: "passwords do not match" });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );


    res.status(200).json({
        status:'OK',
        user,
        token
    })

  } catch (error) {
    res.status(500).json({message: error.message})
  }
};


module.exports = {
    register,
    login
}