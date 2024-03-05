import { Note } from 'types/Notes';
import dayjs from 'dayjs'; // 在服务端组件中不会被打入bundle

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
      {data.map(([id, noteJson]) => {
        const { title, updateTime } = JSON.parse(noteJson) as Note;
        return (
          <li key={id}>
            <header className="sidebar-note-header">
              <strong>{title}</strong>
              <small>{dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}</small>
            </header>
          </li>
        );
      })}
    </ul>
  );
}
