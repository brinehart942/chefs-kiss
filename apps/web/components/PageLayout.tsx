import Link from "next/link";

interface PageLayoutProps {
  title: string;
  description: string;
  backHref?: string;
  backText?: string;
  children: React.ReactNode;
}

export default function PageLayout({
  title,
  description,
  backHref = "/",
  backText = "← Back to Home",
  children,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href={backHref}
            className="text-orange-600 hover:text-orange-700 font-semibold mb-4 inline-block"
          >
            {backText}
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </header>
        {children}
      </div>
    </div>
  );
}
