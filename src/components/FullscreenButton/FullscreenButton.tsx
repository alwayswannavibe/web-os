// Libraries
import React, { FC, useLayoutEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './fullscreenButton.module.css';

export const FullscreenButton: FC<ChildrenNever> = () => {
  const [isFullscreen, setIsFullscreen] = useState<Boolean>(false);

  useLayoutEffect(() => {
    const toggleFullscreen = () => {
      setIsFullscreen((prevState) => !prevState);
    };

    document.addEventListener('fullscreenchange', toggleFullscreen);
    return () => document.removeEventListener('fullscreenchange', toggleFullscreen);
  }, []);

  function handleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <button
      type="button"
      onClick={handleFullscreen}
      id="fullscreen-btn"
      className={styles.fullscreenButtonContainer}
      aria-label="toggle fullscreen"
    >
      {
        isFullscreen ?
          (<FontAwesomeIcon icon={faCompress} className={styles.fullscreenButton} />)
          : (<FontAwesomeIcon icon={faExpand} className={styles.fullscreenButton} />)
      }
    </button>
  );
};
