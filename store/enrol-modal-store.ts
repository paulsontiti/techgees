'use client';

import { create } from 'zustand';

type EnrollModalStore = {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useOpenEnrollModal = create<EnrollModalStore>((set) => ({
  modalOpen: false,
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
}));

export default useOpenEnrollModal;