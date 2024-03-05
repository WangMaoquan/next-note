import { SidebarNoteItem } from './SidebarNoteItem';
import { getAllNotes } from '@/lib/redis';

export default async function NoteList() {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  await sleep(10000);
  const notes = await getAllNotes();
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
