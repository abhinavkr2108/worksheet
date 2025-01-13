import Link from "next/link";
import { Button } from "../ui/button";
import Login from "./login";
import { auth } from "../../../auth";
import Dashboard from "./dashboard";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="w-full border-b">
      {" "}
      {/* Full-width border wrapper */}
      <div className="max-w-screen-xl mx-auto p-4 md:px-8 flex items-center justify-between">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-2xl font-bold">Work-Sheet</h3>
        </div>

        {session ? (
          <div>
            <Dashboard />
          </div>
        ) : (
          <div>
            <Login />
          </div>
        )}
      </div>
    </div>
  );
}
