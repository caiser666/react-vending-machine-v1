import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import { useHistory } from "react-router";
import { getReduxState, state } from "../utils/helper";
import { useDispatch } from "react-redux";
import { updateCartItemAction } from "../redux/actions/cartAction";
import { CART_ROUTE } from "../utils/config";
import { nominalList } from "../models/NominalModel";
import { updateProductsAction } from "../redux/actions/productAction";
import {
  swalLoading,
  swalPermission,
  swalSuccess,
} from "../utils/sweetAlert";

function Payment() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [myCartList, setMyCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [admissionFee, setAdmissionFee] = useState(0);
  const [isEnoughNominal, setIsEnoughNominal] = useState(false);

  useEffect(() => {
    //console.log("Payment");
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
    history.replace(CART_ROUTE);
  };

  const onClickNominal = (value) => {
    const result = admissionFee + value;
    setAdmissionFee(result);
    setIsEnoughNominal(totalPrice <= result);
  };

  const onClickCanceltionTransaction = () => {
    swalPermission("Apakah, anda yakin?", () => canceltionTransaction());
  };

  const canceltionTransaction = () => {
    dispatch(updateCartItemAction([]));
    history.goBack();
    setTotalPrice(0);
    setMyCartList([]);
  };

  const onClickPay = () => {
    //console.log("Hello");
    swalLoading();

    const { products } = getReduxState(state.PRODUCT);

    products.forEach((product) => {
      myCartList.forEach((cart) => {
        if (cart.product.id === product.id) {
          product.stock -= cart.quantity;
        }
      });
    });

    //console.log(products);

    let changeMoney = admissionFee - totalPrice;

    setTimeout(() => {
      let text = changeMoney > 0 ? `Sisa kembalian: Rp. ${changeMoney}` : "";
      swalSuccess("Terima Kasih \n& Selamat Menikmati", text, () =>
        updateSucsess(products)
      );
    }, 2000);
  };

  const updateSucsess = (products) => {
    dispatch(updateCartItemAction([]));
    dispatch(updateProductsAction(products));
    history.goBack();
    setTotalPrice(0);
    setMyCartList([]);
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
                  Pembayaran
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap w-full sm:mt-20">
            <div className="justify-center items-center flex flex-col space-y-2 pb-52 pt-8 px-6 sm:px-4 w-full flex-1 h-screen">
              <div className="flex flex-col px-8 py-2 items-center justify-start rounded-md border bg-white shadow-lg ">
                <span className="inline-block text-sm font-semibold text-gray-400">
                  Total harga yang harus dibayar:
                </span>
                <span className="font-mono text-2xl md:text-3xl  font-semibold mx-4 md:mx-0 underline">
                  Rp. {totalPrice}
                </span>
              </div>
              {/* <span className="inline-block text-xs font-semibold text-red-800">
                  *masukan nominal uang yang pas
                </span> */}
            </div>

            <div className="fixed bottom-0 md:relative py-4 pb-4 flex bg-white w-full md:w-1/2 md:h-full shadow-xl justify-center border-gray-300 border-t-2">
              <div className="flex max-w-lg flex-wrap py-2 flex-col w-full md:justify-center items-start md:items-center md:space-y-4">
                <div className="flex flex-col w-full px-4 space-y-4">
                  <div className="flex-col flex flex-1 space-y-1 ">
                    <span className="inline-block text-sm font-semibold text-gray-700">
                      Nominal yang masuk:
                    </span>
                    <span className="flex-1 border rounded-md text-center py-2 px-4 text-xl sm:text-2xl  font-semibold font-mono">
                      {admissionFee}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {nominalList.map((nominal, index) => {
                      return (
                        <div className="inline-block" key={index}>
                          <button
                            className="flex w-full justify-center items-center px-2 py-1 rounded-md shadow-md border bg-white border-blue-700 hover:bg-blue-700 hover:text-white hover:shadow transition-all duration-300 ease-in-out"
                            onClick={() => onClickNominal(nominal.value)}
                          >
                            <span className="text-lg font-mono font-semibold">
                              {nominal.value}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      className="text-red-50 py-2 bg-red-600 px-4 mx-2 my-2 rounded-lg hover:shadow-md shadow-xl border-2 border-red-700 hover:border-red-600 hover:bg-red-50 hover:text-red-600 outline-none focus:outline-none transition-all duration-500 ease-out"
                      onClick={() => onClickCanceltionTransaction()}
                    >
                      <span className="font-semibold text-xl">
                        Batal Transaksi
                      </span>
                    </button>
                    <button
                      className={` py-2 px-4 mx-2 my-2 rounded-md shadow-xl border-2 outline-none   focus:outline-none transition-all duration-500 ease-out ${
                        isEnoughNominal
                          ? "text-green-800 border-green-800 hover:bg-green-700 hover:text-green-50"
                          : "text-gray-300 border-gray-100 bg-gray-200"
                      }`}
                      onClick={() => onClickPay()}
                      disabled={!isEnoughNominal}
                    >
                      <span className="font-semibold text-xl">Bayar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Payment;
