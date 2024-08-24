import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component for optimized images

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.webp" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold">SurfShare</h1>
        </div>
        
        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/surfboards" className="hover:underline">
                Surfboards
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
