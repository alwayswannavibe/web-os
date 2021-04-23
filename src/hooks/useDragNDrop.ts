import React, { RefObject, useCallback, useEffect, useState } from 'react';
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
      setTopCoordLocal(`${event.pageY - shiftTop}px`);
      setLeftCoordLocal(`${event.pageX - shiftLeft}px`);
    },
    [shiftLeft, shiftTop],
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
