"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserControl from "@/components/UserControl";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function NavSheet() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu></Menu>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="space-y-6">
          <SheetTitle>
            <div className="flex gap-x-3 items-center">
              <Image
                src={"/logo.png"}
                alt="Promptly"
                width={24}
                height={24}
                className="object-contain"
              ></Image>
              <h3>Promptly</h3>
            </div>
          </SheetTitle>
          <div className=" flex flex-col items-center gap-y-6">
            <ModeToggle></ModeToggle>
            <SignedOut>
              <div className="flex gap-2">
                <SignUpButton>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
                <SignInButton>
                  <Button size={"sm"} onClick={() => setOpen(false)}>
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserControl showName></UserControl>
            </SignedIn>
          </div>
          <div className="space-y-4">
            <Button
              asChild
              className="block"
              variant={pathname === "/" ? "default" : "secondary"}
            >
              <Link href={"/"}>Home</Link>
            </Button>
            <Button
              asChild
              className="block"
              variant={pathname === "/gallery" ? "default" : "secondary"}
            >
              <Link href={"/gallery"}>Gallery</Link>
            </Button>
            <Button
              asChild
              className="block"
              variant={pathname === "/pricing" ? "default" : "secondary"}
            >
              <Link href={"/pricing"}>Pricing</Link>
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
export default NavSheet;
