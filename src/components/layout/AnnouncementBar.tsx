export function AnnouncementBar({
  enabled,
  message,
}: {
  enabled: boolean;
  message: string;
}) {
  if (!enabled || !message) return null;

  return (
    <div className="bg-secondary py-2 text-center text-xs font-semibold text-white sm:text-sm">
      <p className="mx-auto max-w-[1280px] px-4 truncate">{message}</p>
    </div>
  );
}
