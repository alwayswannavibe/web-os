// Constants
import { PX_TO_REM_RATIO } from '@Constants/PxToRemRatio';

export const getPxFromRem = (rem: number): number => window.innerHeight * PX_TO_REM_RATIO * rem;
