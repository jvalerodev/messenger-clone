import '../styles/globals.css';
import Header from '@/components/Header';

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html>
      <head />

      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;