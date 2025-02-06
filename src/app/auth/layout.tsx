export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
          <div className="p-8 bg-[var(--background2)] border border-[var(--background3)] rounded-lg shadow-lg flex flex-col items-center min-w-96 gap-2">
            {children}
          </div>
        </div>
    );
  }
  