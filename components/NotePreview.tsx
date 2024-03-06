import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'img',
  'h1',
  'h2',
  'h3',
]);
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src'],
  },
);

interface NotePreviewProps {
  children: string;
}

export default async function NotePreview({ children }: NotePreviewProps) {
  const html = await marked(children || '');
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(html, {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  );
}
