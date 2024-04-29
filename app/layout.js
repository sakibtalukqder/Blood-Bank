import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/Navbar";
import Footer from "@/src/Footer";
import FloatingButton from "@/src/PlusIcon";
import Session from "@/ContextApi/Session";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blood Bank Management",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html className="md:mx-24 lg:mx-36 mx-0 my-0 " data-theme="light" lang="en">
      <body className={inter.className}>
          <Session>
            <Navbar />
            <hr />
            {children}
            <hr />
            <Footer />
            <FloatingButton />
          </Session>
      </body>
    </html>
  );
}
