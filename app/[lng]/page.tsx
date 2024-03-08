import './style.css';

interface PageProps {
  params: {
    lng: 'zn' | 'en';
  };
}

//  接受 lng 参数
export default async function page({ params: { lng } }: PageProps) {
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        Click a {lng} note on the left to view something!
      </span>
    </div>
  );
}
``;
