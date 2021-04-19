// React
import React, { FC, useLayoutEffect, useState } from 'react';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const FullscreenButton: FC<PropsType> = () => {
  // Init
  const [isFullscreen, setIsFullscreen] = useState<Boolean>(false);

  useLayoutEffect(() => {
    const toggleFullscreen = () => {
      setIsFullscreen((prevState) => !prevState);
    };

    document.addEventListener('fullscreenchange', toggleFullscreen);
    return () => document.removeEventListener('fullscreenchange', toggleFullscreen);
  }, []);

  // Handlers
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={handleFullscreen}>
      <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} ${styles.fullscreenButton}`} />
    </div>
  );
};
