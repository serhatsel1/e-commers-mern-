import React, { useEffect, useState } from "react";
import Filter from "../layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { value: keyword } = useSelector((state) => state.general);
  const [price, setPrice] = useState({ min: 0, max: 30000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");

  console.log("keyword -->", keyword);

  useEffect(() => {
    dispatch(getProducts({ keyword, price, rating, category }));
  }, [dispatch, keyword, price, rating, category]);

  return (
    <div className="min-h-screen">
      <div className="flex gap-3">
        <Filter
          setPrice={setPrice}
          setRating={setRating}
          setCategory={setCategory}
        />
        <div>
          <div>
            {loading
              ? "Loading..."
              : products?.products && (
                  <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                    {products?.products?.map((product, index) => (
                      <ProductCard product={product} key={index} />
                    ))}
                  </div>
                )}
          </div>
        </div>
      </div>
      <div>pagination</div>
    </div>
  );
};

export default Products;
