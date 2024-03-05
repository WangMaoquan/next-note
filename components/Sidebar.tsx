import Link from 'next/link';
import Image from 'next/image';
import { getAllNotes } from '@/lib/redis';
import SideBarNoteList from '@/components/SidebarNoteList';
import EditButton from './EditButton';

export default async function Sidebar() {
  const notes = await getAllNotes();
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
          <EditButton>new</EditButton>
        </section>
        <nav>
          <SideBarNoteList notes={notes} />
        </nav>
      </section>
    </>
  );
}
