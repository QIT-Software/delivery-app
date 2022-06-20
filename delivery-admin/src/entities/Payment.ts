export default interface Payment {
  id: string;
  name: string;
  userType: 'Courier' | 'Restaurant';
  sum: number;
}
