import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { register } from "../redux/userSlice";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [preview, setPreview] = useState(
    "https://img.freepik.com/premium-vector/3d-simple-user-icon-isolated_169241-7120.jpg?w=826"
  );

  const registerFunc = () => {
    dispatch(register(data))
      .then((response) => {
        console.log("Kayıt Başarılı", response);
      })
      .catch((error) => {
        console.log("kayıt başarısız", error);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setData((prev) => ({ ...prev, avatar: reader.result }));
          setPreview(reader.result);
        }
      };

      // Doğru şekilde "files" kullanılmalı, "file" değil
      console.log("e.target.files[0]", e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]); // Hatanın düzeltildiği satır
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  console.log("data --->", data);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/3 -mt-10 border p-4 rounded-md  bg-gray-200 ">
        <div className="text-2xl">{signUp ? "Kayıt ol" : "Giriş yap"}</div>
        {signUp && (
          <Input
            onChange={handleChange}
            value={data.name}
            name={"name"}
            placeholder={"Ad"}
            type={"text"}
            id={""}
          />
        )}
        <Input
          onChange={handleChange}
          value={data.email}
          name={"email"}
          placeholder={"Email"}
          type={"text"}
          id={""}
        />
        <Input
          onChange={handleChange}
          value={data.password}
          name={"password"}
          placeholder={"Şifre"}
          type={"password"}
          id={""}
        />
        {signUp && (
          <div className="flex items-center gap-2">
            <img className="w-10 h-10 rounded-full" src={preview} alt="" />
            <Input
              onChange={handleChange}
              name={"avatar"}
              placeholder={""}
              type={"file"}
              id={""}
            />
          </div>
        )}
        <div
          onClick={() => setSignUp(!signUp)}
          className="text-red-500 text-sm cursor-pointer my-2"
        >
          {signUp ? "Giriş yap" : "Kayıt ol"}
        </div>
        <Button
          name={signUp ? "Kayıt ols" : "Giriş yap"}
          onClick={() => (signUp ? registerFunc() : loginFunc())}
        />
      </div>
    </div>
  );
};

export default Auth;
