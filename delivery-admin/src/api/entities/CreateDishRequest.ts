export default interface CreateDishRequest {
  name: string;
  description: string;
  image: string;
  weight: string;
  kal: string;
  ingredients: string[];
  sets: string[];
}
