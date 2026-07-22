export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-white/5 ${className}`}
      aria-hidden
    />
  );
}
