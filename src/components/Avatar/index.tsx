// Libraries
import { FC } from 'react';

// Styles
import styles from './Avatar.module.css';

interface Props {
  children?: never;
  link: string;
}

const Avatar: FC<Props> = ({ link }: Props) => (
  <img src={link || 'https://vk.com/images/camera_50.png'} alt="avatar" className={styles.avatar} width={56} height={56} />
);

export { Avatar };
