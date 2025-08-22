import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todos",
  description: "Todos are pretty nice, if I do say so myself",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
