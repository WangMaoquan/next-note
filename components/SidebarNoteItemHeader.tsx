import dayjs from 'dayjs';

interface SidebarNoteItemHeaderProps {
  updateTime: string;
  title: string;
}

export default async function SidebarNoteItemHeader({
  updateTime,
  title,
}: SidebarNoteItemHeaderProps) {
  return (
    <header className="sidebar-note-header">
      <strong>{title}</strong>
      <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
    </header>
  );
}
