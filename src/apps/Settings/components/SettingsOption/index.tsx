import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';
import { Language } from 'src/features/i18n/types/language';
import { Theme } from 'src/features/theme/types/theme';

interface Props {
  children?: never;
  value: BackgroundImage | Theme | Language;
  category: string;
}

const SettingsOption: FC<Props> = ({ value, category }: Props) => {
  const { t } = useTranslation('settings');

  return (
    <option value={value}>{t(`${category}.${value}`)}</option>
  );
};

export { SettingsOption };
