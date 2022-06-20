export default interface UpdateSetRequest {
  id: string;
  name: string;
  cuisineId: string;
  image: string;
  priceCents: string;
  dishes: string[];
  statuses: string[];
}
