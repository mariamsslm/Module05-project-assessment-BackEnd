import userSchema from "../Models/userModel.js";
import bcrypt from "bcrypt"
import { createToken, verifyToken } from "../utils/JWT.js";

//SignUp
export const signup = async (req, res) => {
  try {
      const { name, email, password , role } = req.body;

      if (!name || !email || !password || !role) {
          return res.status(400).json({ message: "Name, email, password and role are required." });
      }

      const existingUser = await userSchema.findOne({ $or: [{ email }, { name }] });

      if (existingUser) {
          return res.status(409).json({ message: " email or name already exists." });
      }

      const generatedPassword = "random";
      const finalPassword = password || generatedPassword;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(finalPassword, salt);

      const newUser = new userSchema({
          name,
          email,
          password: hash,
          role
      });

      await newUser.save();
      const token = createToken(newUser);
      const decoded = verifyToken(token);

      res.status(200)
          .cookie("userToken", token, {
              secure: true,
              httpOnly: true,
              sameSite: "None",
          })
          .json({ message: "User created successfully", token: decoded });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong!" });
  }
};



//Login
export const login = async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required." });
      }

      const user = await userSchema.findOne({ email });

      if (!user) {
          return res.status(401).json({ message: "User not found!" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid password!" });
      }

      const token = createToken(user);
      const decoded = verifyToken(token);

      res.cookie("userToken", token, {
          secure: true,
          httpOnly: true,
          sameSite: "None",
      }).status(200).json({ message: "User logged in successfully", token: decoded });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
  }
};


// get all users
  export const getAll = async (req, res) => {
    try {
      const allUsers = await userSchema.find();
      return res.status(200).json(allUsers);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "cannot fetch users" });
    }
  };


