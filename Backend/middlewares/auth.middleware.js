import jwt from "jsonwebtoken"
import "dotenv/config"

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);;
    return res.status(401).json({
      message: "Error in authenticating user",
    });
  }
};
