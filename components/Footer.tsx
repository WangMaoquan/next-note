import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';
import { locales } from '@/config';
import { useTranslation } from 'app/i18n';

export const Footer = async ({ lng }: { lng: 'zh' | 'en' }) => {
  const { t } = await useTranslation(lng, 'footer'); // 指定对应的json 文件
  return (
    <footer style={{ margin: 20 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{lng}</strong> to:{' '}
      </Trans>
      {locales
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && ' | '}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </footer>
  );
};
