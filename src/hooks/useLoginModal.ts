import { create } from "zustand";

interface useLoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Custom hook for managing the state of a Login Modal.
 * @param {function} set - A function provided by Zustand to update the state.
 * @returns {useLoginrModalStore} The state and actions for the Login Modal.
 */
const useLoginModal = create<useLoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
