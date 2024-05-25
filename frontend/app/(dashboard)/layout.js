import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";


export default function DashboardLayout({ children }) {
 
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:w-60 md:flex md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-60">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
