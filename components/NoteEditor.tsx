'use client';

import { useState } from 'react';
import NotePreview from '@/components/NotePreview';
import { useFormStatus } from 'react-dom';
import { deleteNote, saveNote } from '../app/actions';
import Image from 'next/image';

interface NoteEditorProps {
  noteId?: string;
  initialTitle?: string;
  initialBody?: string;
}

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
}: NoteEditorProps) {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody || '');
  const isDraft = !noteId;

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId} />
          <button
            className="note-editor-done"
            disabled={pending}
            type="submit"
            formAction={saveNote}
            role="menuitem"
          >
            <Image
              src="/checkmark.svg"
              width="14"
              height="10"
              alt=""
              role="presentation"
            />
            Done
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              disabled={pending}
              formAction={deleteNote}
              role="menuitem"
            >
              <Image
                src="/cross.svg"
                width="10"
                height="10"
                alt=""
                role="presentation"
              />
              Delete
            </button>
          )}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          name="body"
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}