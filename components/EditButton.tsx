import Link from 'next/link';
interface EditButtonProps {
  noteId?: string;
  children: JSX.Element | string;
}

export default function EditButton({ noteId, children }: EditButtonProps) {
  const isDraft = !!noteId;
  return (
    <Link href={`/note/edit/${noteId || ''}`} className="link--unstyled">
      <button
        className={[
          'edit-button',
          isDraft ? 'edit-button--solid' : 'edit-button--outline',
        ].join(' ')}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
}
