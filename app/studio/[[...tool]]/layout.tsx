export const metadata = {
  title: "Sanity Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  );
}
