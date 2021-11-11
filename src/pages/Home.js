import React, { useCallback, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import * as BsIcons from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import ProductCard from "../components/ProductCard";
import { productList } from "../models/ProductModel";
import { addCartListAction } from "../redux/actions/cartAction";
import { getAllProductsAction } from "../redux/actions/productAction";
import { CART_ROUTE } from "../utils/config";
import { getReduxState, state } from "../utils/helper";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [myProductList, setMyProductList] = useState([]);
  const [myCartList, setMyCartList] = useState([]);
  const isAutoSlide = true;

  const init = useCallback(() => {
    const product = getReduxState(state.PRODUCT);
    const cart = getReduxState(state.CART);

    if (product !== undefined) {
      const { products } = product;
      if (products.length > 0) {
        setMyProductList(products);
      } else {
        dispatch(getAllProductsAction(productList));
        setMyProductList(productList);
      }
    }

    if (cart !== undefined) {
      const { carts } = cart;
      var list = [];

      if (carts.length > 0) {
        carts.forEach((cart) => {
          // console.log(cart.product);
          const { product } = cart;
          list.push(product);
        });
      }

      setMyCartList(list);
    }
  }, [dispatch]);

  useEffect(() => {
    //console.log("Home");
    init();
  }, [init]);

  const onClickAddProduct = (product) => {
    // console.log(myCartList);
    var list = [product, ...myCartList];
    setMyCartList(list);
    dispatch(addCartListAction(product));

    // const cart = getReduxState(state.CART);
    // const { carts } = cart;
    // console.log(carts);
  };

  const onClickToCart = (path) => {
    history.push(path);
  };

  return (
    <>
      <main className="bg-gray-100 container w-full h-screen max-w-screen-lg mx-auto">
        <div className="flex flex-col h-full justify-start items-center">
          <div className="relative w-full bg-white shadow-lg">
            <div className="absolute right-6 top-4">
              <div
                className={`absolute h-6 w-6 -top-2 -right-2 flex justify-center items-center shadow-md rounded-full border bg-white border-blue-500 text-center z-10 ${
                  myCartList.length > 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-sm font-mono font-semibold text-shadow">
                  {myCartList.length}
                </span>
              </div>
              <button
                className="relative outline-none focus:outline-none hover:scale-110 transform transition-all duration-300 ease-in-out"
                onClick={() => onClickToCart(CART_ROUTE)}
              >
                {myCartList.length > 0 ? (
                  <BsIcons.BsCartFill className="w-10 h-10 text-blue-700" />
                ) : (
                  <BsIcons.BsCart className="w-10 h-10" />
                )}
              </button>
            </div>
            <div className="flex flex-col w-full py-4 items-center justify-center divide-y-2 divide-blue-300">
              <h1 className="text-2xl text-blue-500 font-semibold  text-shadow-md text-center">
                Renyah-renyah
              </h1>
              <h1 className="font-light text-gray-500 text-shadow-md">
                Selamat Datang & Silahkan Memilih
              </h1>
            </div>
          </div>
          <div className="flex flex-col w-full h-full space-y-4">
            <Marquee
              direction={"right"}
              play={isAutoSlide}
              gradientWidth={50}
              speed={50}
              pauseOnHover={true}
              pauseOnClick={false}
              className="flex w-full py-4 scrollbar-none overflow-y-hidden"
            >
              {myProductList !== 0 ? (
                myProductList.map((product, index) => {
                  return (
                    <ProductCard
                      key={index}
                      product={product}
                      myCartList={myCartList.length > 0 ? myCartList : []}
                      onClickAdd={(product) => onClickAddProduct(product)}
                    />
                  );
                })
              ) : (
                <div></div>
              )}
            </Marquee>

            <Marquee
              play={isAutoSlide}
              direction={"left"}
              gradientWidth={75}
              speed={50}
              pauseOnHover={true}
              pauseOnClick={false}
              className="flex w-full py-4 scrollbar-none overflow-y-hidden"
            >
              {myProductList !== 0 ? (
                myProductList.map((product, index) => {
                  return (
                    <ProductCard
                      key={index}
                      product={product}
                      myCartList={myCartList}
                      onClickAdd={(product) => onClickAddProduct(product)}
                    />
                  );
                })
              ) : (
                <div></div>
              )}
            </Marquee>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
