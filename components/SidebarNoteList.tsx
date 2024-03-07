import { sleep } from '@/utils';
import { SidebarNoteItem } from './SidebarNoteItem';
import { getAllNotes } from '@/lib/redis';
import SidebarNoteList from './SidebarNoteListFilter';
import SidebarNoteItemHeader from './SidebarNoteItemHeader';

export default async function NoteList() {
  // await sleep(1000);
  const notes = await getAllNotes();
  const data = Object.entries(notes);
  if (data.length === 0) {
    return <div className="notes-empty">No notes created yet!</div>;
  }
  return (
    <SidebarNoteList
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
}
