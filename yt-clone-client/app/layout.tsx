import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "YT Clone",
  description: "Youtube clone for system design assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className={styles.layoutContainer}>
          <Sidebar />
          <main className={styles.mainContent}>
            {children} 
          </main>
        </div>
      </body>
    </html>
  );
}
