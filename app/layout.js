import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "@/app/_components/Header";

const josefin = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Welcome | The Rupnet Oasis",
    template: "%s | The Rupnet Oasis",
  },
  description:
    "Luxury cabins in the heart of the wilderness. Book your stay today in the Rupnet Oasis surrounded by the beauty of nature.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen mx-5 ${josefin.className} antialiased relative`}
      >
        <Header />
        <div className="hero-background-image">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
        <footer className="py-4 text-center">
          &copy; {new Date().getFullYear()} The Rupnet Oasis
        </footer>
      </body>
    </html>
  );
}
