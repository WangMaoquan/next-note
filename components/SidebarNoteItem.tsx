import { Note } from 'types/Notes';
import SidebarNoteItemContent from './SidebarNoteItemContent';
import SidebarNoteItemHeader from './SidebarNoteItemHeader';

interface SidebarNoteItemProps {
  noteId: string;
  note: string;
}

export async function SidebarNoteItem({ noteId, note }: SidebarNoteItemProps) {
  const { title, updateTime, content } = JSON.parse(note) as Note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader updateTime={updateTime} title={title} />
    </SidebarNoteItemContent>
  );
}
