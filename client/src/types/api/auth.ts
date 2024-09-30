import { ApiResponse } from 'shared';

export interface LogOutResponse extends ApiResponse<unknown> {
  success: true;
  data: null;
  error: null;
}
