import { Companies } from "./companies";
import { Invoice } from "./invoice";

export class Order {
  customerName: String;
  orderDate: Date;
  subTotal: number;
  tax: number;
  discount: number;
  total: number;
  paid: number;
  due: number;
  paymentType: String;
  companyId:number;
}
