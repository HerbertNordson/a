export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:w-4/5 lg:m-auto">
      {children}
    </div>
  );
}
