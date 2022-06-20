export default interface UpdateDishRequest {
  id: string;
  name: string;
  description: string;
  image: string;
  weight: string;
  kal: string;
  ingredients: string[];
  sets: string[];
}
