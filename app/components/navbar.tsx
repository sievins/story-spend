import Link from "next/link";
// import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { drawerID } from "./drawer";

export default function Navbar() {
  return (
    <div className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur shadow-sm">
      <nav className="navbar w-full">
        <div className="flex-none lg:hidden">
          <label htmlFor={drawerID} className="btn btn-square btn-ghost">
            <Bars3Icon className="h-6 w-6" />
          </label>
        </div>
        <div className="lg:hidden flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            Story Spend
          </Link>
        </div>
        <div className="flex-1" />
        <div className="flex-none gap-2">
          {/* TODO: Add theme functionality - but the root will no longer be statically pre-rendered */}
          {/* <ul className="menu menu-horizontal px-1"> */}
          {/*   <li> */}
          {/*     <details> */}
          {/*       <summary className="h-12 content-center">Theme</summary> */}
          {/*       <ul className="p-2 bg-base-100 rounded-t-none"> */}
          {/*         <li> */}
          {/*           <div>Link 1</div> */}
          {/*         </li> */}
          {/*         <li> */}
          {/*           <div>Link 2</div> */}
          {/*         </li> */}
          {/*       </ul> */}
          {/*     </details> */}
          {/*   </li> */}
          {/* </ul> */}
          {/* TODO: Add authentication functionality */}
          {/* <button className="btn btn-circle"> */}
          {/*   <ArrowLeftOnRectangleIcon className="h-5 w-5" /> */}
          {/* </button> */}
        </div>
      </nav>
    </div>
  );
}
