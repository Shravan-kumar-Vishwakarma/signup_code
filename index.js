import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://user:uset@cluster0.ipanvdp.mongodb.net/intershala1?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body); // Log the request body
  const newUser = new User({
    name,
    email,
    password,
  });
  
  try {
    await newUser.save();
    res.send({ message: "Signup successful" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(9002, () => {
  console.log("Backend started on port 9002");
});
