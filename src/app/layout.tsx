import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash Book",
  description: "Cash Book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          {/* <aside className="min-w-56">Side Bar</aside> */}
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
