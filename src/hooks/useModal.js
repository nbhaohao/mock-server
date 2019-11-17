import { useState, useCallback } from "react";
const useModal = () => {
  const [visible, setVisible] = useState(false);
  const showModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const hiddenModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  return {
    visible,
    showModal,
    hiddenModal
  };
};

export { useModal };
