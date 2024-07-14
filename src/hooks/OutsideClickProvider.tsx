import { createContext, useEffect, useRef, ReactNode } from 'react';

interface OutsideClickContextType {
  registerElement: (element: HTMLElement, callback: () => void) => () => void;
}

const OutsideClickContext = createContext<OutsideClickContextType | undefined>(
  undefined
);

export const OutsideClickProvider = ({ children }: { children: ReactNode }) => {
  const elementsRef = useRef<Map<HTMLElement, () => void>>(new Map());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      elementsRef.current.forEach((callback, element) => {
        if (!element.contains(event.target as Node)) {
          callback();
        }
      });
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const registerElement = (
    element: HTMLElement,
    callback: () => void
  ): (() => void) => {
    elementsRef.current.set(element, callback);
    return () => elementsRef.current.delete(element);
  };

  return (
    <OutsideClickContext.Provider value={{ registerElement }}>
      {children}
    </OutsideClickContext.Provider>
  );
};

export default OutsideClickContext;
