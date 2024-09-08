export const metadata = {
  title: "",
  description: "",
};
import globals from "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
