import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "sonner";
import 'react-loading-skeleton/dist/skeleton.css'
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker",
  description: "A simple expense tracking application",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Toaster />
          <NextTopLoader />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
