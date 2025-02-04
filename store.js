import { create } from 'zustand';

export const useFeeStore = create((set) => ({
  name: '',
  studentId: '',
  password: '',
  setName: (name) => set({ name }),
  setStudentId: (studentId) => set({ studentId }),
  setPassword: (password) => set({ password }),
}));



export const useFaqStore = create((set) => ({
  id: null,
  question: '',
  answer: '',
  setId: (id) => set({ id }),
  setQuestion: (question) => set({ question }),
  setAnswer: (answer) => set({ answer }),
}));

export const useNoticeStore = create((set) => ({
  id: null,
  title: '',
  content: '',
  setId: (id) => set({ id }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
}));
