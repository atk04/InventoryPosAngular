import { OrderInvoiceList } from "./order-invoice-list";
import { OrderProductList } from "./order-product-list";

export class OrderList {
  'id': number;
  'invoice': OrderInvoiceList;
  'product': OrderProductList;
  'productName': string;
  'productQuantity': number;
  'productPrice': number;
  'orderDate': string;
}
