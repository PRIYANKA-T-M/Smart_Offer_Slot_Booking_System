import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiMap = {
  auth: {
    login: (data: any) => api.post('/auth/login', data),
    register: (data: any) => api.post('/auth/register', data),
  },
  business: {
    create: (data: any) => api.post('/business', data),
    get: () => api.get('/business'),
    update: (id: string, data: any) => api.put(`/business/${id}`, data),
  },
  offers: {
    create: (data: any) => api.post('/offers', data),
    getAll: (params?: any) => api.get('/offers', { params }),
    getById: (id: string) => api.get(`/offers/${id}`),
    update: (id: string, data: any) => api.put(`/offers/${id}`, data),
    delete: (id: string) => api.delete(`/offers/${id}`),
  },
  slots: {
    create: (data: any) => api.post('/slots', data),
    getByOffer: (offerId: string) => api.get(`/offers/${offerId}/slots`),
  },
  bookings: {
    create: (data: any) => api.post('/bookings', data),
    getAll: () => api.get('/bookings'),
    updateStatus: (id: string, status: string) => api.put(`/bookings/${id}/status`, { status }),
  },
  dashboard: {
    getSummary: () => api.get('/dashboard/summary'),
  }
};

export default api;
