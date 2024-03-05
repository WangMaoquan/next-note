import Link from 'next/link';
import Image from 'next/image';

export default async function Sidebar() {
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
          {/* todo */}
        </section>
        <nav>{/* todo */}</nav>
      </section>
    </>
  );
}
