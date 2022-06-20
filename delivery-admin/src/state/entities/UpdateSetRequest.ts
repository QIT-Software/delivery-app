export default interface UpdateDishRequest {
  id: string;
  name: string;
  cuisineId: string;
  uploadFile: File | string | undefined;
  priceCents: string;
  dishes: string[];
  statuses: string[];
}
