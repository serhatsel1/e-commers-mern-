import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import nodemailer from "nodemailer";

import User from "../model/userModel.js";

const register = async (req, res) => {
  try {
    // Cloudinary'yi kullanmadan önce doğru bir şekilde yapılandırdığınızdan emin olun

    // Avatar'ı yükleyin
    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 130,
      crop: "scale",
    });
    console.log("avatar",avatar)

    const { name, email, password } = req.body;

    // Email'i kontrol et
    const user = await User.findOne({ email });

    if (user) {
      return res.status(500).json({ message: "Bu email zaten kayıtlı !!!" });
    }

    // Şifreyi hashle
    const hashedPassword = await bcyrpt.hash(password, 10);

    // Şifre uzunluğunu kontrol et
    if (password.length < 6) {
      return res
        .status(500)
        .json({ message: "Şifre minimum 6 karakterden oluşmalıdır !!" });
    }

    // Yeni kullanıcıyı oluştur
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      avatar: {
        public_id: avatar.public_id,
        url: avatar.secure_url,
      },
    });

    // JWT ile token oluştur
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    // Çerez seçenekleri
    const cookieOptions = {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
      // secure: true, // Güvenlik için, sadece HTTPS üzerinden iletişimde kullanılmalıdır
    };

    
    // Yanıtı hazırla
    res
      .status(201)
      .cookie("token", token, cookieOptions)
      .json({ newUser, token });
  } catch (error) {
    // Hata durumunda uygun bir yanıt gönderin
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu." });
  }
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.find(email);

  if (!user) {
    return res.status(500).json({
      message: "Böyle bir kullanıcı bulunamadı !",
    });
  }

  const resetToken = crypto.randomBytes(20).toString();

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = new Date(Date.now() + 1 * 60 * 60 * 1000);

  await user.save({ validateBeforeSave: true });

  const passwordUrl = `${req.protocol}://${req.get(host)}/reset/${resetToken}`;
  const message = `Şifreyi sıfırlamak için lütfen aşağıdaki linke tıklayınız
  ${passwordUrl}
  `;
  //!
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.NODE_MAIL,
        pass: process.env.NODE_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.NODE_MAIL, // sender address
      to: req.body.email, // list of receivers
      subject: "Şifre sıfırlama ✔", // Subject line
      text: message,
    });

    res.status(200).json({
      message: "Lütfen mailinizi kontrol ediniz !",
    });
  } catch (error) {
    passwordUrl = undefined;
    message = undefined;

    await user.save({ validateBeforeSave: true });

    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(500).json({
      message: "Geçersiz token!!",
    });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };

  res.status(200).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};
const userDetail = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    user,
  });
};

export { register, login, logout, forgotPassword, resetPassword, userDetail };
