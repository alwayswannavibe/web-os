/* eslint-disable no-param-reassign */

// React, redux
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Apps } from 'src/types/apps';
import { CoordsType } from 'src/types/coord';

const useDragNDrop = (changeCoord: ActionCreatorWithPayload<{ type: Apps, coords: CoordsType }>, element: RefObject<HTMLDivElement>, coords: CoordsType, type: Apps) => {
  const [topCoordLocal, setTopCoordLocal] = useState(coords.top);
  const [leftCoordLocal, setLeftCoordLocal] = useState(coords.left);
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
    element.current!.style.cursor = 'pointer';
    dispatch(
      changeCoord({
        type,
        coords: {
          top: topCoordLocal,
          left: leftCoordLocal,
        },
      }),
    );
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    setIsDrag(false);
  }, [changeCoord, dispatch, drag, element, leftCoordLocal, topCoordLocal, type]);

  const startDrag = (event: React.MouseEvent) => {
    event.preventDefault();
    setShiftLeft(event.clientX - element.current!.getBoundingClientRect().x);
    setShiftTop(event.clientY - element.current!.getBoundingClientRect().y);
    element.current!.style.cursor = 'grabbing';
    setIsDrag(true);
  };

  useEffect(() => {
    if (!IsDrag) return;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }, [IsDrag, drag, stopDrag]);

  const newCoords: CoordsType = {
    top: topCoordLocal,
    left: leftCoordLocal,
  };

  return { startDrag, newCoords };
};

export { useDragNDrop };
