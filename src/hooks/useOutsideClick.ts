import { useContext, useEffect } from 'react';
import OutsideClickContext from './OutsideClickProvider';

const useOutsideClick = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void
): void => {
  const context = useContext(OutsideClickContext);

  useEffect(() => {
    if (!context) {
      console.error(
        'useOutsideClick must be used within an OutsideClickProvider'
      );
      return;
    }
    if (!ref.current) return;
    const unregister = context.registerElement(ref.current, callback);

    return () => unregister();
  }, [ref, callback, context]);
};

export default useOutsideClick;
