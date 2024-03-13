import { CategoryType } from '@/types/category';
import { DishType } from '@/types/dish';
import { OrderInterface } from '@/types/order';
import { PaymentMethod } from '@/types/paymentMethod';
import { UserType } from '@/types/user';
import { escapeText } from '@/utils/text';
import { filter, isEqual } from 'lodash';

export const filterOptions = (
  allOrders: OrderInterface[],
  options: { text?: string; paymentMethod?: PaymentMethod }
): OrderInterface[] => {
  const { text = '', paymentMethod } = options;

  if (text === '' && !paymentMethod) return allOrders;
  else if (text !== '' && !paymentMethod) {
    const textLowercase = escapeText(text).toLowerCase();
    return (
      filter(allOrders, (order) => {
        const { id, contactNumber, createdBy, email, name } = order;
        const parsedName = escapeText(name).toLowerCase();

        return (
          isEqual(parsedName, text) ||
          parsedName.includes(textLowercase) ||
          isEqual(name, text) ||
          //
          isEqual(contactNumber, text) ||
          contactNumber.includes(text) ||
          isEqual(contactNumber, text) ||
          //
          isEqual(email, text) ||
          email.includes(text) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy, text) ||
          createdBy.includes(text) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else if (text === '' && paymentMethod) {
    console.log('filter by payment method')

    if (paymentMethod === 'CASH') {
      const filteredOrders = allOrders.filter(
        (order) => order.paymentMethod === paymentMethod
      );
      return filteredOrders || [];
    } else {
      const filteredOrders = allOrders.filter(
        (order) => order.paymentMethod === paymentMethod
      );
      return filteredOrders || [];
    }
  } else {
    const filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    const textLowercase = escapeText(text).toLowerCase();

    return (
      filter(filteredOrders, (order) => {
        const { id, contactNumber, createdBy, email, name } = order;
        const parsedName = escapeText(name).toLowerCase();

        return (
          isEqual(parsedName, text) ||
          parsedName.includes(textLowercase) ||
          isEqual(name, text) ||
          //
          isEqual(contactNumber, text) ||
          contactNumber.includes(text) ||
          isEqual(contactNumber, text) ||
          //
          isEqual(email, text) ||
          email.includes(text) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy, text) ||
          createdBy.includes(text) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  }
};
