import { useState, useEffect } from 'react';

function useMouse() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const mouseHandler = (event: MouseEvent) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', mouseHandler);

    return () => {
      window.removeEventListener('mousemove', mouseHandler);
    };
  }, []);

  return { x, y };
}

export default useMouse;
