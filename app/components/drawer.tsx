"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { HomeIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import Navbar from "@/components/navbar";

export const drawerID = "my-drawer";

const links = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Transactions", href: "/transactions", icon: CreditCardIcon },
];

export default function Drawer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="drawer lg:drawer-open">
      <input id={drawerID} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col prose max-w-none">
        <Navbar />
        <main className="flex flex-col lg:p-16 lg:pt-12 p-6 pt-4">
          {children}
        </main>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor={drawerID}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="min-h-screen h-screen flex flex-col w-60">
          <div className="lg:bg-base-100 bg-base-200 lg:bg-opacity-90 text-base-content sticky top-0 z-30 flex flex-none h-16 backdrop-blur items-center pl-4">
            <Link className="btn btn-ghost text-xl" href="/">
              Story Spend
            </Link>
          </div>
          <ul className="menu h-full p-4 bg-base-200 text-base-content gap-2">
            {links.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <Link
                  className={clsx("btn btn-ghost text-lg justify-start", {
                    active: href === pathname,
                  })}
                  href={href}
                >
                  <Icon className="h-5 w-5" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
