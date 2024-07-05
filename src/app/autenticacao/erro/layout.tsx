export default function ErrorLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex h-screen min-h-screen min-w-screen w-screen flex-col items-center justify-between bg-error-color px-8 py-24">
        {children}
      </main>
    );
  }