import { useState, useEffect } from "react";

const useDeferredLoading = (isLoading, delay = 200) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer;

    if (isLoading) {
      // Delay showing the loader
      timer = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      // Immediately hide when loading finishes
      setShowLoading(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoading;
};

export default useDeferredLoading;
