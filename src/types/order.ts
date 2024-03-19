export interface OrderedDishInterface {
  id?: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderInterface {
  id: number
  uuid: string
  createdBy: string
  name: string;
  contactNumber: string;
  email: string;
  paymentMethod: string;
  productDetail: string;
  total: number;
  createdAt?: string
}
