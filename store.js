import { create } from 'zustand';

export const useFeeStore = create((set) => ({
  name: '',
  studentId: '',
  password: '',
  setName: (name) => set({ name }),
  setStudentId: (studentId) => set({ studentId }),
  setPassword: (password) => set({ password }),
}));