import Link from 'next/link';
import Image from 'next/image';
import EditButton from './EditButton';
import { Suspense } from 'react';
import NoteListSkeleton from './NoteListSkeleton';
import SidebarNoteList from '@/components/SidebarNoteList';
import SidebarSearchField from './SidebarSearchField';
import { useTranslation } from 'app/i18n';
import SidebarImport from './SidebarImport';

interface SidebarProps {
  lng: 'zh' | 'en';
}

export default async function Sidebar({ lng }: SidebarProps) {
  const { t } = await useTranslation(lng);
  return (
    <>
      <section className="col sidebar">
        <Link href="/" className="link--unstyled">
          <section className="sidebar-header">
            <Image
              src="/logo.svg"
              className="logo"
              width="22"
              height="22"
              alt=""
              role="presetation"
            />
            <strong>Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField lng={lng} />
          <EditButton>{t('new')}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport lng={lng} />
      </section>
    </>
  );
}
