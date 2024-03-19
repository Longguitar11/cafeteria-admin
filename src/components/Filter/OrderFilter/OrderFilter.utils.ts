import { OrderInterface } from '@/types/order';
import { PaymentMethod } from '@/types/paymentMethod';
import { endOfDate, startOfDate } from '@/utils/datetime';
import { escapeText } from '@/utils/text';
import dayjs from 'dayjs';
import { filter, isEqual } from 'lodash';

export const filterOptions = (
  allOrders: OrderInterface[],
  options: {
    text?: string;
    paymentMethod?: PaymentMethod | '';
    fromTime: Date | undefined;
    toTime: Date | undefined;
  }
): OrderInterface[] => {
  const { text = '', paymentMethod, fromTime, toTime } = options;

  if (text === '' && !paymentMethod && !fromTime && !toTime) {
    console.log('empty parameters');
    return allOrders;
  } else if (text !== '' && !paymentMethod && !fromTime && !toTime) {
    console.log('text');

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
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else if (text === '' && paymentMethod && !fromTime && !toTime) {
    console.log('payment method');
    const filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    return filteredOrders;
  } else if (text === '' && !paymentMethod && fromTime && !toTime) {
    console.log('from time');

    const filteredOrders = allOrders.filter((order) => {
      return new Date(order.createdAt!).getDate() === fromTime.getDate();
    });

    return filteredOrders.length > 0 ? filteredOrders : allOrders;
  } else if (text === '' && !paymentMethod && fromTime && toTime) {
    console.log('from and to time');

    const filteredOrders = allOrders.filter((order) => {
      return (
        new Date(order.createdAt!).getDate() >= fromTime.getDate() &&
        new Date(order.createdAt!).getDate() <= toTime.getDate()
      );
    });

    return filteredOrders.length > 0 ? filteredOrders : allOrders;
  } else if (text && paymentMethod && !fromTime && !toTime) {
    console.log('text and payment method');

    let filteredOrders = allOrders.filter(
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
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else if (text && !paymentMethod && fromTime && !toTime) {
    console.log('text and from time');
    const filteredOrders = allOrders.filter((order) => {
      return new Date(order.createdAt!).getDate() >= fromTime.getDate();
    });

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
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else if (text && !paymentMethod && fromTime && toTime) {
    console.log('text, from and to time');
    const filteredOrders = allOrders.filter((order) => {
      return (
        new Date(order.createdAt!).getDate() >= fromTime.getDate() &&
        new Date(order.createdAt!).getDate() <= toTime.getDate()
      );
    });

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
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else if (!text && paymentMethod && fromTime && !toTime) {
    console.log('payment method, from time');
    let filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );
    filteredOrders = allOrders.filter((order) => {
      return new Date(order.createdAt!).getDate() >= fromTime.getDate();
    });

    return filteredOrders;
  } else if (!text && paymentMethod && fromTime && toTime) {
    console.log('payment method, from and to time');
    let filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );
    filteredOrders = allOrders.filter((order) => {
      return (
        new Date(order.createdAt!).getDate() >= fromTime.getDate() &&
        new Date(order.createdAt!).getDate() <= toTime.getDate()
      );
    });

    return filteredOrders;
  } else if (text && paymentMethod && fromTime && !toTime) {
    console.log('text, payment method, from time');
    let filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    filteredOrders = allOrders.filter((order) => {
      return new Date(order.createdAt!).getDate() >= fromTime.getDate();
    });

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
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  } else {
    let filteredOrders = allOrders.filter(
      (order) => order.paymentMethod === paymentMethod
    );

    filteredOrders = allOrders.filter((order) => {
      return (
        new Date(order.createdAt!).getDate() >= fromTime!.getDate() &&
        new Date(order.createdAt!).getDate() <= toTime!.getDate()
      );
    });

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
          isEqual(email.toLowerCase(), text) ||
          email.toLowerCase().includes(textLowercase) ||
          isEqual(email, text) ||
          //
          isEqual(createdBy.toLowerCase(), text) ||
          createdBy.toLowerCase().includes(textLowercase) ||
          isEqual(createdBy, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  }
};

export const getDateRange = (
  range: number
): { fromTime: string; toTime: string } => {
  return {
    fromTime: startOfDate(dayjs().subtract(range, 'day').toDate(), true),
    toTime: endOfDate(undefined, true),
  };
};
