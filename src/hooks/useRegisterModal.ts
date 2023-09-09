import { create } from "zustand";

interface useRegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Custom hook for managing the state of a Register Modal.
 * @param {function} set - A function provided by Zustand to update the state.
 * @returns {useRegisterModalStore} The state and actions for the Register Modal.
 */
const useRegisterModal = create<useRegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
