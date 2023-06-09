import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ThemeProvider from '@/app/components/ThemeProvider';
import './globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          <Header />
          <div className="flex">
            <Sidebar />
            <div className="flex-1 sm:ml-20 md:ml-56">{children}</div>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
