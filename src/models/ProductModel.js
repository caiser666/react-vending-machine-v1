export class ProductModel {
  constructor(id, title, price, stock, imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.imageUrl = imageUrl;
  }
}

export const productList = [
  new ProductModel(
    "1",
    "Biskuit",
    6000,
    50,
    "https://id-live-05.slatic.net/p/ce8ead9ad7d76c22d15eb917d5bc64a8.jpg_720x720q80.jpg_.webp"
  ),
  new ProductModel(
    "2",
    "Chips",
    8000,
    60,
    "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//88/MTA-2650208/chitato_chitato-sapi-panggang-55g_full02.jpg"
  ),
  new ProductModel(
    "3",
    "Oreo",
    10000,
    100,
    "https://images.tokopedia.net/img/cache/500-square/product-1/2018/10/15/1101431/1101431_48e04aa4-52de-4a86-84ac-916396f3d54d_700_700.jpg.webp?ect=4g"
  ),
  new ProductModel(
    "4",
    "Tango",
    12000,
    100,
    "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/9/22/580807ca-de93-48b9-8ec3-ce7ee03978b8.jpg"
  ),
  new ProductModel(
    "5",
    "Cokelat",
    15000,
    30,
    "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//88/MTA-3058116/silverqueen_silver-queen-almond-65g_full02.jpg"
  ),
];