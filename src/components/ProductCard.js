import React, { useEffect, useState } from "react";

function ProductCard({ product, myCartList, onClickAdd, ...props }) {
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);

  useEffect(() => {
    // console.log("ProductCard");
    if (myCartList !== undefined) {
      if (myCartList.length > 0) {
        var cart = myCartList.filter((cart) => cart.id === product.id)[0];
        if (cart !== undefined) {
          setIsAlreadyInCart(true);
        }
      }
    }
  }, [isAlreadyInCart, product, myCartList]);

  return (
    <>
      <div className="inline-block mx-8">
        <div className="relative h-72 w-48 m-2 bg-transparent">
          <div className="absolute h-3/4 w-full bg-gray-50 bottom-0 shadow-md rounded-md border border-blue-300" />
          <div className="relative flex flex-col w-full h-full bg-transparent">
            <img
              className="object-contain object-center rounded-md shadow-lg mx-2 border"
              src={product.imageUrl}
              alt={product.imageUrl}
            />
            <div className="flex flex-col w-full mt-2 text-sm text-center text-shadow-md px-2">
              <span className="truncate font-semibold text-black">
                {product.title}
              </span>
              <span className="truncate sfont-mono">
                Rp. {product.price}
              </span>
              <span className="truncate font-thin text-xs font-mono">
                sisa: {product.stock}
              </span>
            </div>
            <button
              className={`text-white py-1 mx-2 my-2 rounded-md shadow-xl outline-none focus:outline-none transition-all duration-500 ease-out ${
                isAlreadyInCart
                  ? "bg-gray-500"
                  : "bg-blue-800 hover:bg-blue-600"
              }`}
              onClick={() => onClickAdd(product)}
              disabled={isAlreadyInCart}
            >
              <span className="font-thin text-md font-mono">
                {isAlreadyInCart ? "dalam kerajang" : "pilih"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
