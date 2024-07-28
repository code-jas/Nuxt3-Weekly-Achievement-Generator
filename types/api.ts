export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any; // You can specify a more detailed type for your data
}
