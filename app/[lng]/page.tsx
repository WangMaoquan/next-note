import { useTranslation } from 'app/i18n';
import './style.css';

interface PageProps {
  params: {
    lng: 'zh' | 'en';
  };
}

//  接受 lng 参数
export default async function Page({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng);
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t('initText')}</span>
    </div>
  );
}
