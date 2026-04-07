// A basic mock function to simulate network latency
export async function delay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// In a real application, you would initialize your fetch wrapper or axios instance here
// Example:
// import axios from 'axios';
// export const apiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

// We expose a dummy client for mock usage
export const apiClient = {
  get: async <T>(data: T, ms?: number) => {
    await delay(ms);
    return { data };
  },
  post: async <T>(data: T, ms?: number) => {
    await delay(ms);
    return { data };
  },
};
