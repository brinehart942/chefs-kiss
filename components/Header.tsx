import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  user?: {
    fullName: string;
  };
}

const Header = ({ user }: HeaderProps) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <Link href="/my-profile">
        <Avatar className="cursor-pointer">
          <AvatarImage src="" alt="User" />
          <AvatarFallback>
            {user?.fullName ? getInitials(user.fullName) : "U"}
          </AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
};

export default Header;
