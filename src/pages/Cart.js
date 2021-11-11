import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import { useHistory } from "react-router";
import { getReduxState, state } from "../utils/helper";
import { useDispatch } from "react-redux";
import { updateCartItemAction } from "../redux/actions/cartAction";
import { PAYMENT_ROUTE } from "../utils/config";

function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [myCartList, setMyCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    //console.log("Cart");
    init();
  }, []);

  const init = () => {
    const cart = getReduxState(state.CART);

    if (cart !== undefined) {
      const { carts } = cart;
      if (carts !== undefined && carts.length > 0) {
        // console.log(carts);
        setMyCartList(carts);

        let totalPrice = 0;

        carts.forEach((item) => {
          const subTotal = item.product.price * item.quantity;
          totalPrice += subTotal;
        });

        setTotalPrice(totalPrice);
      }
    }
  };

  const onClickBack = () => {
    history.goBack();
  };

  const onClickUpdateItem = (cart, index, type) => {
    //console.log(cart);
    var newList = [...myCartList];
    const { product, quantity } = cart;

    if (type === 1) {
      if (product.stock > quantity) {
        newList[index].quantity += 1;
      }
    } else {
      if (quantity > 1) {
        newList[index].quantity -= 1;
      }
    }

    let newTotalPrice = 0;

    newList.forEach((item) => {
      const subTotal = item.product.price * item.quantity;
      newTotalPrice += subTotal;
    });

    dispatch(updateCartItemAction(newList));
    setMyCartList(newList);
    setTotalPrice(newTotalPrice);
  };

  const onClickDeleteItem = (cart, index) => {
    //console.log(myCartList);

    var newList = myCartList.filter(
      (item) => item.product.id !== cart.product.id
    );

    let newTotalPrice = 0;

    newList.forEach((item) => {
      const subTotal = item.product.price * item.quantity;
      newTotalPrice += subTotal;
    });

    dispatch(updateCartItemAction(newList));
    setMyCartList(newList);
    setTotalPrice(newTotalPrice);
  };

  const onClickToPayemnt = () => {
    history.replace(PAYMENT_ROUTE);
  };

  return (
    <>
      <main className="bg-gray-100 container w-full h-screen max-w-screen-lg mx-auto overflow-hidden">
        <div className="flex flex-col w-full h-full">
          <div className="fixed z-50 w-full max-w-screen-lg">
            <div className="relative w-full bg-white shadow-lg">
              <div className="absolute inset-6 z-20">
                <button
                  className="relative outline-none focus:outline-none hover:scale-110 transform transition-all duration-300 ease-in-out"
                  onClick={() => onClickBack()}
                >
                  <MdIcons.MdOutlineArrowBackIos className="w-8 h-8 text-blue-700" />
                </button>
              </div>
              <div className="flex flex-col w-full py-4 items-center justify-center divide-y-2 divide-blue-300">
                <h1 className="text-2xl text-blue-500 font-semibold  text-shadow-md text-center">
                  Renyah-renyah
                </h1>
                <h1 className="font-light text-gray-500 text-shadow-md">
                  Kerajang Anda
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap w-full mt-20">
            <div className="static flex flex-col space-y-2 pb-52 md:pb-24 pt-8 px-6 sm:px-4 w-full flex-1 h-screen overflow-y-auto scrollbar-none">
              {myCartList.map((cart, index) => {
                const product = cart.product;
                // console.log(product);
                return (
                  <div
                    className="inline-block w-full mx-auto max-w-md bg-transparent p-1"
                    key={index}
                  >
                    <div className="flex relative">
                      <img
                        className="h-20 sm:h-24 absolute object-contain object-center rounded-md shadow-lg mx-2 border transition-all duration-500 ease-in"
                        src={product.imageUrl}
                        alt={product.title}
                      />

                      <div className="absolute right-4 top-10">
                        <button
                          className={`flex text-center rounded-full outline-none focus:outline-none transform transition-all duration-500 ease-out text-red-700 hover:text-red-500 hover:scale-110`}
                          onClick={() => onClickDeleteItem(cart, index)}
                        >
                          <MdIcons.MdDeleteForever className="text-2xl sm:text-3xl" />
                        </button>
                      </div>
                      <div
                        className="flex flex-col w-full mt-8 pl-24 sm:pl-28 bg-white rounded-md border shadow-lg border-blue-200 transition-all duration-500 ease-out"
                        style={{
                          minHeight: "5rem",
                        }}
                      >
                        <div className="flex flex-col w-full mt-2 text-sm text-shadow-md px-2">
                          <span className="truncate font-semibold text-black">
                            {product.title}
                          </span>
                          <span className="truncate font-mono">
                            Rp. {product.price}
                          </span>
                        </div>

                        <div className="flex flex-wrap flex-row px-4 my-2">
                          <div className="flex-row flex-1 flex space-x-1">
                            <button
                              className={`flex justify-center items-center text-center text-base sm:text-xl rounded-full px-1 sm:p-1 outline-none focus:outline-none transform transition-all duration-500 ease-out ${
                                cart.quantity === 1
                                  ? "text-gray-700  bg-gray-300"
                                  : "text-white scale-110  bg-blue-800 hover:bg-blue-600"
                              }`}
                              onClick={() => onClickUpdateItem(cart, index, 0)}
                              disabled={cart.quantity === 1}
                            >
                              <IoIcons.IoIosRemove className="" />
                            </button>
                            <span className="w-8 font-mono font-medium text-center">
                              {cart.quantity}
                            </span>
                            <button
                              className={`flex justify-center items-center text-center text-base sm:text-xl rounded-full px-1 sm:p-1 outline-none focus:outline-none transform transition-all duration-500 ease-out ${
                                product.stock === cart.quantity
                                  ? "text-gray-700  bg-gray-300"
                                  : "text-white scale-110  bg-blue-800 hover:bg-blue-600"
                              }`}
                              onClick={() => onClickUpdateItem(cart, index, 1)}
                              disabled={product.stock === cart.quantity}
                            >
                              <IoIcons.IoIosAdd className="" />
                            </button>
                          </div>
                          <span className="font-mono font-medium text-center text-lg">
                            Rp. {product.price * cart.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="fixed bottom-0 md:relative py-4 flex bg-white w-full md:w-5/12 md:h-full shadow-xl justify-center border-gray-300 border-t-2">
              <div className="flex max-w-lg flex-wrap py-2 flex-row md:flex-col w-full justify-between md:justify-center items-start md:items-center md:space-y-4">
                <div className="flex flex-col px-4 md:w-full items-start md:items-center justify-start">
                  <span className="inline-block text-sm font-thin">
                    Total bayar:
                  </span>
                  <span className="font-mono text-2xl font-semibold mx-4 md:mx-0">
                    Rp. {totalPrice}
                  </span>
                </div>
                <div className="flex px-4">
                  <button
                    className="text-blue-800 py-1 px-4 mx-2 my-2 rounded-md shadow-xl border-2 border-blue-800 outline-none hover:text-blue-50 hover:bg-blue-700 focus:outline-none transition-all duration-500 ease-out"
                    onClick={() => onClickToPayemnt()}
                  >
                    <span className="font-semibold text-lg">Lanjut</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Cart;
