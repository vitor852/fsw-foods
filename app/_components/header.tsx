"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import Menu from "./menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            className="object-cover"
            sizes="100%"
            fill
          />
        </div>
      </Link>

      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
        onClick={() => setIsMenuOpen(true)}
      >
        <MenuIcon />
      </Button>

      <Menu isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </div>
  );
};

export default Header;
