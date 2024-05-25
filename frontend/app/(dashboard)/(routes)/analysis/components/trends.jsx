import { cn } from "@/lib/utils";
import { Icon, TrendingDown, TrendingUp } from "lucide-react";
const Trends = ({ Heading, Count, border }) => {
  return (
    <div className={cn("p-4 border-slate-200", border)}>
      <h3 className="text-lg font-semibold mb-2">{Heading}</h3>
      <div className="flex items-center">
        <p className="mr-2">{Count}</p>
        <TrendingUp color="green" />
      </div>
    </div>
  );
};

export default Trends;
