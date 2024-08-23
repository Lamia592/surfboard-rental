import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Surfboard Rental</h1>
      <div className="space-x-4">
        <Link href="/login">
          <a className="bg-blue-500 text-white px-4 py-2 rounded">Login</a>
        </Link>
        <Link href="/register">
          <a className="bg-green-500 text-white px-4 py-2 rounded">Register</a>
        </Link>
        <Link href="/surfboards">
          <a className="bg-yellow-500 text-white px-4 py-2 rounded">View Surfboards</a>
        </Link>
        <Link href="/add-surfboard">
          <a className="bg-purple-500 text-white px-4 py-2 rounded">Add Surfboard</a>
        </Link>
      </div>
    </div>
  );
}