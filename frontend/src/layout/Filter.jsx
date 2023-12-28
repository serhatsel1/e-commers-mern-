import React from "react";

const categoryList = ["Çanta", "Ayakkabı", "Bilgisayar", "Pantolon"];

const ratingList = ["1", "2", "3", "4", "5"];

const Filter = () => {
  return (
    <div className="w-[200px] mt-3 p-1">
      <div>Filtrele</div>
      <div className="items-center gap-2 my-2">
        <input
          className="border w-16 p-1 outline-none"
          type="number"
          placeholder="Min"
        />
        <input
          className="border w-16 p-1 outline-none"
          type="number"
          placeholder="Max"
        />
      </div>
      <div className="my-2">Kategori</div>
      <div>
        {categoryList.map((category, i) => (
          <div className="text-sm cursor-pointer" key={i}>
            {category}
          </div>
        ))}
      </div>
      <hr />
      <div className="my-2">Puanlama</div>
      <div>
        {ratingList.map((rating, i) => (
          <div className="text-sm cursor-pointer" key={i}>
            {rating}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
