import jwt from "jsonwebtoken";

import User from "../model/userModel.js";

const authenticatedmid = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(500).json({
      message: "Erişim şiçin lütfen login olunuz !",
    });
  }

  const decodedData = await jwt.verify(token, process.env.SECRET_TOKEN);

  if (!decodedData) {
    res.status(500).json({
      message: "Erişim tokenınız geçersizdir !",
    });
  }

  req.user = await User.findById(decodedData.id);

  next();
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(res.user.role)) {
      return res.status(500).json({
        message: "Giriş için izniniz bulunmamaktadır !",
      });
    }
    next();
  };
};

export { authenticatedmid, roleChecked };
