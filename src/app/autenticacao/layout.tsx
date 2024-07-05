export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full lg:min-w-min flex-col items-center justify-center lg:w-4/5 lg:m-auto overflow-hidden">
      {children}
    </main>
  );
}
