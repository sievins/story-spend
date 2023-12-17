"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="join">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      {allPages.map((page) => {
        const isEllipsis = `${page}`.includes("...");

        return (
          <PaginationNumber
            key={page}
            href={createPageURL(page)}
            page={page}
            isEllipsis={isEllipsis}
            isActive={currentPage === page}
          />
        );
      })}
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  isEllipsis,
}: {
  page: number | string;
  href: string;
  isEllipsis: boolean;
  isActive: boolean;
}) {
  const className = clsx("join-item btn w-12 max-lg:hidden", {
    "btn-active !flex": isActive,
    "btn-disabled": isEllipsis,
  });

  return isEllipsis ? (
    <div className={className}>
      <EllipsisHorizontalIcon className="w-4" />
    </div>
  ) : (
    <Link href={href} scroll={false} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx("join-item btn w-12", {
    "btn-disabled": isDisabled,
  });

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return (
    <Link scroll={false} className={className} href={href}>
      {icon}
    </Link>
  );
}

const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 4 pages,
  // show the first 5, an ellipsis, and the last page.
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  // If the current page is among the last 4 pages,
  // show the first, an ellipsis, and the last 5 pages.
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "left...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "right...",
    totalPages,
  ];
};
