import jwt from "jsonwebtoken";


const userId = "64abc123def4567890abc123";


const JWT_SECRET = process.env.JWT_SECRET;


const token = jwt.sign(
  { id: userId },     
  JWT_SECRET,        
  { expiresIn: "1d" }
);

console.log("Generated JWT Token:");
console.log(token);
