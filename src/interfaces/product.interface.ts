import {BaseDocument} from "./base-document.interface";

export interface IProduct extends BaseDocument {
    name: string;
    description: string;
    price: string;
    stock: number;
}