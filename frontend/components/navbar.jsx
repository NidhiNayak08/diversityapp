import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
 
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
    
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
