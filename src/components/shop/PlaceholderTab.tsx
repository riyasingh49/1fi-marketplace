export default function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
      <p className="text-sm text-[var(--color-text-faint)]">
        {label} is coming soon.
      </p>
    </div>
  );
}
