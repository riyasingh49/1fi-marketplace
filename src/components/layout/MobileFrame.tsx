export default function MobileFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#e5e3ec] flex justify-center py-0 sm:py-8">
      <div className="w-full sm:max-w-[430px] sm:rounded-[36px] sm:shadow-2xl sm:overflow-hidden bg-[var(--color-surface-muted)] sm:h-[900px] flex flex-col relative">
        {children}
      </div>
    </div>
  );
}
