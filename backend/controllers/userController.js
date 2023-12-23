import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../model/userModel.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(500).json({ message: "Bu email zaten kayılı !!!" });
  }

  const hashedPassword = await bcyrpt.hash(password, 10);

  if (password < 6) {
    return res
      .status(500)
      .json({ message: "Şifre mimimum 6 karakterden oluşmlaıdır !!" });
  }

  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };
  res.status(201).cookie("token", token, cookieOptions).json({
    newUser,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(500).json({
      message: "Böyle bir kullanıcı bulunamadı !!!",
    });
  }

  const comparePassword = await bcyrpt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(500).json({
      message: "Şifre hatalı !!!",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now + 5 * 24 * 60 * 60 * 1000),
  };

  res.status(200).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};

const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Dat(Date.now()),
  };

  res.status(200).cookie("token", null, cookieOptions).json({
    message: "Başırılı bir şekilde çıkış yapıldı",
  });
};

const forgotPassword = (req, res) => {};

const resetPassword = (req, res) => {};

export { register, login, logout, forgotPassword, resetPassword };
