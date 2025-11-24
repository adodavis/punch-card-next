import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: "Punch Card",
  description: "Boxing Scorecard App"
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