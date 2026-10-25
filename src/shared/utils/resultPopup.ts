export type ResultPopupKind = 'success' | 'error';

export interface ResultPopupState {
  kind: ResultPopupKind;
  title: string;
  message: string;
}

let current: ResultPopupState | null = null;
const listeners = new Set<() => void>();

const publish = (next: ResultPopupState | null) => {
  current = next;
  listeners.forEach((listener) => listener());
};

export const subscribeResultPopup = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getResultPopup = () => current;

export const showSuccessPopup = (title: string, message: string) => publish({ kind: 'success', title, message });

export const showErrorPopup = (title: string, message: string) => publish({ kind: 'error', title, message });

export const hideResultPopup = () => publish(null);
