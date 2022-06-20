type AcceptedByCourier = {
  action: 'acceptedByCourier';
  orderId: string;
  courierId: string;
};

type CheckedIn = {
  action: 'checkedIn';
  orderId: string;
};

type CheckedOut = {
  action: 'checkedOut';
  orderId: string;
};

type NewOrderIsAvailable = {
  action: 'newOrderIsAvailable';
  orderId: string;
};

type OrderCompleted = {
  action: 'orderCompleted';
  orderId: string;
};

export type NotificationData =
  | AcceptedByCourier
  | CheckedIn
  | CheckedOut
  | NewOrderIsAvailable
  | OrderCompleted;
