// Libraries
import { FC } from 'react';
import { Language } from 'src/features/i18n/types/language';
import { useTranslation } from 'react-i18next';

// I18n
import 'src/features/i18n';

interface Props {
  children?: never;
  value: Language;
}

const LanguageOption: FC<Props> = ({ value }: Props) => {
  const { t } = useTranslation('settings');

  return (
    <option value={value}>{t(`languages.${value}`)}</option>
  );
};

export { LanguageOption };
