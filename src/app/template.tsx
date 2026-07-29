/**
 * Re-mounts on every navigation, which gives each route a subtle
 * fade-and-rise entrance without any client-side animation library.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
