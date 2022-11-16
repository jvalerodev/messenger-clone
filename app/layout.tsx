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

      <body className="bg-gray-100 overflow-y-hidden">
        <div className="max-w-2xl xl:max-w-4xl mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;