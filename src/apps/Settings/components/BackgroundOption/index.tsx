import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';

interface Props {
  children?: never;
  value: BackgroundImage;
}

const BackgroundOption: FC<Props> = ({ value }: Props) => {
  const { t } = useTranslation('settings');

  return (
    <option value={value}>{t(`themes.${value}`)}</option>
  );
};

export { BackgroundOption };
