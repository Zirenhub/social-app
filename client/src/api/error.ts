export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public details?: { field: string[]; message: string }
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
