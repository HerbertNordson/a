export default function ProductDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-full flex-col items-center justify-between lg:w-4/5 lg:m-auto">
      {children}
    </main>
  );
}
