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
              <Link href="/">
                <a className="hover:underline">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/surfboards">
                <a className="hover:underline">Surfboards</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a className="hover:underline">Login</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
