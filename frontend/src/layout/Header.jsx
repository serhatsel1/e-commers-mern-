import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKeyword } from "../redux/generalSlice";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user, isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = [
    {
      name: "Profile",
      url: "/profile",
    },
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Logout",
      url: "/logout",
    },
  ];

  const keywordFunc = () => {
    dispatch(getKeyword(keyword));
    // setKeyword("")
    navigate("/products");
  };
  console.log("--->",user,isAuth)
  return (
    <div className="bg-gray-100 h-16 px-2 flex items-center justify-between">
      <div className="text-4xl">e.com</div>
      <div className="flex items-center gap-5">
        <div className="flex items-center">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="p-2 outline-none"
            type="text"
            placeholder="Arama yap"
          />
          <div
            onClick={keywordFunc}
            className="p-2 ml-1 bg-white cursor-pointer"
          >
            Ara
          </div>
        </div>
        <div className="relative">
          <img
            onClick={() => setOpenMenu(!openMenu)}
            className="w-8 h-8 rounded-full cursor-pointer"
            src="https://img.freepik.com/premium-vector/3d-simple-user-icon-isolated_169241-7120.jpg?w=826"
            alt=""
          />
          {openMenu && (
            <div className="absolute right-0 mt-3 w-[200px] bg-white shadow-lg shadow-gray-400">
              {menuItems.map((value, i) => (
                <div
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  key={i}
                >
                  {value.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <SlBasket size={30} />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            4
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
