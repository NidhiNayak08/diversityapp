"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Dashboard",
    icon: MessageSquare,
    href: "/summary",
    color: "text-violet-500",
  },
  {
    label: "Add Employee",
    icon: ImageIcon,
    href: "/",
    color: "text-pink-500",
  },
  {
    label: "Add CSV Data",
    icon: MusicIcon,
    href: "/",
    color: "text-emerald-500",
  },
  {
    label: "Customer Support",
    icon: SettingsIcon,
    href: "/",
    color: "text-green-700",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white border-x-2 border-slate-200">
      <div className="px-3 py-2 flex-1">
        <Link
          href="/dashboard"
          className="flex items-center pl-3 mb-5 border-b pb-2  border-slate-200"
        >
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Diversify
          </h1>
        </Link>

        <div className="px-3 py-2">
          <p className="text-sm text-slate-500 font-semibold">General</p>
        </div>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full cursor-pointer justify-start font-medium hover:text-blue-700 hover:bg-blue-300  hover:bg-opacity-15 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn("h-5 w-6 mr-3 text-white", route.color)}
                />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
