import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
      <h1 className="text-2xl font-bold mb-8">CredVault</h1>

      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>

        <li>
          <Link href="/certificates" className="hover:text-blue-400">
            Certificates
          </Link>
        </li>

        <li>
          <Link href="/login" className="hover:text-blue-400">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}