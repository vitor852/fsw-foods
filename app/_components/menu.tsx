"use client";

import { HeartIcon, Home, LogIn, ScrollTextIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface MenuProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ isOpen, onOpenChange }: MenuProps) => {
  const pathname = usePathname();

  console.log(pathname);

  const activeButtonProps = {
    className:
      "items-center justify-start gap-3 rounded-full text-sm font-semibold",
  };
  const inactiveButtonProps = {
    className:
      "items-center justify-start gap-3 rounded-full text-sm font-normal",
    variant: "ghost",
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between py-5">
          <h3 className="font-semibold">Olá, faça seu login!</h3>

          <Button size="icon">
            <LogIn size={18} />
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col">
          <Button
            {...(pathname === "/" ? activeButtonProps : inactiveButtonProps)}
            asChild
          >
            <Link href="/">
              <Home size={16} />
              Inicio
            </Link>
          </Button>

          <Button
            {...(pathname === "/orders"
              ? activeButtonProps
              : inactiveButtonProps)}
            asChild
          >
            <Link href="/orders">
              <ScrollTextIcon size={16} />
              Meus pedidos
            </Link>
          </Button>

          <Button
            {...(pathname.includes("/restaurants")
              ? activeButtonProps
              : inactiveButtonProps)}
            asChild
          >
            <Link href="/restaurants">
              <HeartIcon size={16} />
              Restaurantes favoritos
            </Link>
          </Button>
        </div>

        <Separator />

        <div></div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
