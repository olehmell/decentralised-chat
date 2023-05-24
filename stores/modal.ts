import { create } from 'zustand';

type Modal = React.ReactNode

type ModalState = {
  isOpen: boolean;
  modal?: Modal;
};

type ModalActions = {
  openModal: (modal: Modal) => void;
  closeModal: () => void;
};

const initState: ModalState = {
  isOpen: false,
}

const useModalStore = create<ModalState & ModalActions>()((set, get) => ({
  ...initState,
  openModal: ( modal: Modal) => { set({ isOpen: true, modal }) },
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
