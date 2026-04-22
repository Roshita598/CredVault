export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold">CredVault</h1>
      <p className="mt-4 text-lg">Secure Credential Management System</p>
      
      <a href="/dashboard">
  <button className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200 transition">
    Get Started
  </button>
</a>
    </div>
  );
}