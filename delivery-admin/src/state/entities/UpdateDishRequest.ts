export default interface UpdateDishRequest {
  id: string;
  name: string;
  description: string;
  uploadFile: File | string | undefined;
  weight: string;
  kal: string;
  ingredients: string[];
  sets: string[];
}
