import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div>
        <img
          src="https://media.istockphoto.com/id/1346981800/tr/vekt%C3%B6r/promotion-flyer-discount-voucher-template-special-offer-market-poster-vector-image-sale-ads.jpg?s=2048x2048&w=is&k=20&c=GmKgXphgMlnvxdb9Tkf6zRqty0dyQiE86Phi3dsSVtc="
          alt=""
        />
      </div>
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
    </>
  );
};

export default Home;
