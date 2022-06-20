export default interface CreateSetRequest {
  name: string;
  cuisineId: string;
  image: string;
  priceCents: string;
  dishes: string[];
  statuses: string[];
}
