export default interface UpdateStatusRequest {
  id: string;
  uploadFile: File | string | undefined;
  name: string;
}
