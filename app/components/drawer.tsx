import Link from "next/link";
import Navbar from "./navbar";

export const drawerID = "my-drawer";

export default function Drawer({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id={drawerID} type="checkbox" className="drawer-toggle" />
      {/* <div className="drawer-content flex flex-col items-center justify-center prose max-w-none"> */}
      <div className="drawer-content flex flex-col items-center prose max-w-none">
        <Navbar />
        {children}
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor={drawerID}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="min-h-screen h-screen flex flex-col w-80">
          <div className="lg:bg-base-100 bg-base-200 lg:bg-opacity-90 text-base-content sticky top-0 z-30 flex flex-none h-16 backdrop-blur items-center pl-4">
            <Link className="btn btn-ghost text-xl" href="/">
              Story Spend
            </Link>
          </div>
          <ul className="menu h-full p-4 bg-base-200 text-base-content">
            {/* TODO: Add sidebar content */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
