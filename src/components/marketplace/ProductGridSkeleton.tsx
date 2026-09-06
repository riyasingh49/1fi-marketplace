export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 px-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-(--color-border) bg-(--color-surface-muted) p-3"
        >
          <div className="h-24 animate-pulse rounded-xl bg-(--color-surface-muted)" />
          <div className="mt-3 h-2.5 w-2/3 animate-pulse rounded bg-(--color-surface-muted)" />
          <div className="mt-2 h-3 w-full animate-pulse rounded bg-(--color-surface-muted)" />
          <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-(--color-surface-muted)" />
          <div className="mt-3 h-5 w-full animate-pulse rounded bg-(--color-surface-muted)" />
        </div>
      ))}
    </div>
  );
}
