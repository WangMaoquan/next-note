import Sidebar from '@/components/Sidebar';
import { locales } from '@/config';

// 用于构建静态路由
export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: 'zh' | 'en';
  };
}>) {
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <div className="main">
            <Sidebar lng={lng} />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
