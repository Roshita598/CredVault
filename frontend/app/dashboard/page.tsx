"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { API_ENDPOINTS } from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    certificates: 0,
    users: 0,
    organizations: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.health);
        if (!res.ok) {
          throw new Error("Backend unavailable");
        }
        await res.text();
        setStats({
          certificates: 120,
          users: 45,
          organizations: 10,
        });
      } catch {
        console.log("Using dummy data");
        setStats({
          certificates: 120,
          users: 45,
          organizations: 10,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Quick overview of your credential system activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-sm font-medium text-slate-500">Certificates</h2>
            <p className="mt-3 text-3xl font-bold text-blue-600">
              {stats.certificates}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-sm font-medium text-slate-500">Users</h2>
            <p className="mt-3 text-3xl font-bold text-emerald-600">
              {stats.users}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-sm font-medium text-slate-500">Organizations</h2>
            <p className="mt-3 text-3xl font-bold text-violet-600">
              {stats.organizations}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}