import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: "Punch Card",
  description: "Boxing Scorecard App",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return(
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}