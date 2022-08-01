export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="no-scrollbar grid min-h-screen w-full sm:gap-20">
      {children}
    </div>
  );
}
