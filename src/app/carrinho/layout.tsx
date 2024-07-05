import Cart from "./page";

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-w-full lg:min-w-min min-h-screen h-screen pb-44 lg:w-4/5 lg:m-auto">
      {children}
    </main>
  );
}
