import Order, {OrderState} from 'entities/Order';
import {format} from 'date-fns';

export const formatOrderNumber = (order: Order): string => {
  const str = `${order.number}`;
  const pad = '000000';
  return `#${pad.substring(0, pad.length - str.length) + str}`;
};

export const formatOrderStatus = (order: Order): string => {
  return OrderState[order.state];
};

export const formatOrderAddress = (
  order: Order,
  type: 'client' | 'restaurant',
): string => {
  switch (type) {
    case 'client':
      return order.orderInfo.clientAddress.description;
    case 'restaurant':
      return order.restaurant.address.description;
  }
};

export const formatOrderPrice = (
  order: Order,
  type: 'delivery' | 'deliveryPrice',
): string => {
  switch (type) {
    case 'delivery':
      return `$${(order.orderInfo.priceCents / 100).toFixed(2)}`;
    case 'deliveryPrice':
      return `$${(order.orderInfo.priceCents / 200).toFixed(2)}`;
  }
};

export const formatOrderDistance = (
  distanceMiles: number | undefined, // todo: use order info
): string => {
  return distanceMiles ? `${distanceMiles.toFixed(2)} miles` : '-';
};

export const formatBillStatus = (type: 'washing'): string => {
  switch (type) {
    case 'washing':
      return 'Paid';
  }
};

export const formatWashingTitle = (type: 'washing' | 'complete'): string => {
  switch (type) {
    case 'washing':
      return 'Be ready at';
    case 'complete':
      return 'Finish time';
  }
};

export const formatOrderWeight = (order: Order, type: 'delivery'): string => {
  switch (type) {
    case 'delivery':
      return `${order.orderInfo.weight} lbs`;
  }
};

export const formatOrderDate = (order: Order, type: 'created' = 'created'): string => {
  switch (type) {
    case 'created':
      return format(new Date(order.created), 'MM.dd.yyyy p');
  }
};
