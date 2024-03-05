import { Note } from 'types/Notes';
import { SidebarNoteItem } from './SidebarNoteItem';

interface NoteListProps {
  notes: Record<string, string>;
}

export default async function NoteList({ notes }: NoteListProps) {
  const data = Object.entries(notes);
  if (data.length === 0) {
    return <div className="notes-empty">No notes created yet!</div>;
  }
  return (
    <ul className="notes-list">
      {data.map(([id, note]) => {
        return (
          <li key={id}>
            <SidebarNoteItem noteId={id} note={note} />
          </li>
        );
      })}
    </ul>
  );
}
