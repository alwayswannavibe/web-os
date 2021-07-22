// React, redux
import { RefObject, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useDragNDrop = (changeCoord: any, element: RefObject<HTMLDivElement>, topCoord: string, leftCoord: string) => {
  const [topCoordLocal, setTopCoordLocal] = useState(topCoord);
  const [leftCoordLocal, setLeftCoordLocal] = useState(leftCoord);
  const [shiftLeft, setShiftLeft] = useState(0);
  const [shiftTop, setShiftTop] = useState(0);
  const [IsDrag, setIsDrag] = useState(false);

  const dispatch = useDispatch();

  const drag = useCallback(
    (event: MouseEvent) => {
      const heigthOfWindow = element!.current?.getBoundingClientRect().height || 0;
      const topLimit = heigthOfWindow + 7;
      const leftLimit = 0;
      const bottomLimit = window.screen.availHeight - heigthOfWindow;
      const rightLimit = window.screen.availWidth - (element!.current?.getBoundingClientRect().width || 0);

      let left = event.pageX - shiftLeft;
      let top = event.pageY - shiftTop;

      if (top < topLimit) {
        top = topLimit;
      }
      if (left < leftLimit) {
        left = leftLimit;
      }
      if (top > bottomLimit) {
        top = bottomLimit;
      }
      if (left > rightLimit) {
        left = rightLimit;
      }

      setTopCoordLocal(`${top / (window.innerHeight * 0.02)}rem`);
      setLeftCoordLocal(`${left / (window.innerHeight * 0.02)}rem`);
    },
    [element, shiftLeft, shiftTop],
  );

  const stopDrag = useCallback(() => {
    // eslint-disable-next-line no-param-reassign
    element.current!.style.cursor = 'pointer';
    dispatch(
      changeCoord({
        top: topCoordLocal,
        left: leftCoordLocal,
      }),
    );
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    setIsDrag(false);
  }, [changeCoord, dispatch, drag, element, leftCoordLocal, topCoordLocal]);

  const startDrag = (event: React.MouseEvent) => {
    event.preventDefault();
    setShiftLeft(event.clientX - element.current!.getBoundingClientRect().x);
    setShiftTop(event.clientY - element.current!.getBoundingClientRect().y);
    // eslint-disable-next-line no-param-reassign
    element.current!.style.cursor = 'grabbing';
    setIsDrag(true);
  };

  useEffect(() => {
    if (!IsDrag) return;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [IsDrag, drag, stopDrag]);

  return { startDrag, topCoordLocal, leftCoordLocal };
};

export { useDragNDrop };
