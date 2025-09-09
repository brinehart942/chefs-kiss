"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/recipes"
            className={cn(
              "text-base cursor-pointer capitalize",
              mounted && pathName === "/recipes"
                ? "text-light-500"
                : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
