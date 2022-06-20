export default interface CreateSetRequest {
  name: string;
  cuisineId: string;
  uploadFile: File | string | undefined;
  priceCents: string;
  dishes: string[];
  statuses: string[];
}
