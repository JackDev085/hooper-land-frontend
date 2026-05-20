/**
 * Skeleton loading component for placeholder content
 * @param {Object} props
 * @param {'text' | 'card' | 'avatar' | 'button' | 'image'} props.variant - Skeleton shape
 * @param {string} props.className - Additional classes
 * @param {number} props.lines - Number of text lines (for text variant)
 */
export default function Skeleton({
  variant = "text",
  className = "",
  lines = 1,
}) {
  const baseStyles =
    "animate-shimmer rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]";

  const variants = {
    text: "h-4 w-full",
    title: "h-8 w-3/4",
    card: "h-48 w-full rounded-2xl",
    avatar: "h-12 w-12 rounded-full",
    button: "h-12 w-32 rounded-xl",
    image: "h-56 w-full rounded-xl",
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseStyles} h-4 ${i === lines - 1 ? "w-4/5" : "w-full"}`}
          />
        ))}
      </div>
    );
  }

  return <div className={`${baseStyles} ${variants[variant]} ${className}`} />;
}

/**
 * Skeleton card for workout/game listings
 */
export function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`bg-surface rounded-2xl overflow-hidden border border-gray-800 ${className}`}
    >
      <Skeleton variant="image" className="rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton variant="title" />
        <Skeleton variant="text" lines={2} />
        <Skeleton variant="button" />
      </div>
    </div>
  );
}

/**
 * Skeleton for game cards
 */
export function SkeletonGameCard({ className = "" }) {
  return (
    <div
      className={`bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 ${className}`}
    >
      <Skeleton variant="image" className="h-48 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton variant="title" className="h-6 w-3/4" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-2/3" />
        <Skeleton variant="button" className="w-full mt-4" />
      </div>
    </div>
  );
}
