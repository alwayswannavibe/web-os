// React, redux
import { FC, useLayoutEffect, useState } from 'react';

// Styles
import styles from './style.module.css';

type PropsType = {
  children?: never;
};

export const FullscreenButton: FC<PropsType> = () => {
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
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <button
      type="button"
      onClick={handleFullscreen}
      id="fullscreen-btn"
      className={styles.fullscreenButtonContainer}
      aria-label="toggle fullscreen"
    >
      <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} ${styles.fullscreenButton}`} />
    </button>
  );
};
