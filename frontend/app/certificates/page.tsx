import Sidebar from "@/components/Sidebar";

export default function Certificates() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Certificates</h1>

        <div className="grid grid-cols-2 gap-6">
          
          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="font-bold">Web Dev Certificate</h2>
            <p className="text-3xl font-bold text-gray-800 mb-6">Issued to: Roshita</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="font-bold">AI Course Certificate</h2>
            <p className="text-3xl font-bold text-gray-800 mb-6">Issued to: Student</p>
          </div>

        </div>
      </div>
    </div>
  );
}