import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useFeeStore = create((set) => ({
  name: '기명명',
  studentId: '202023456',
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
//lottie showAnimation 모달관리
export const useAnimationStore = create(
  persist(
    (set) => ({
      showAnimation: true, // 기본값
      setShowAnimation: (value) => set({ showAnimation: value }),
    }),
    {
      name: 'animation-storage', // localStorage에 저장될 키 이름
      getStorage: () => localStorage, // localStorage 사용
    }
  )
);