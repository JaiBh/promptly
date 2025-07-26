"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import UserControl from "@/components/UserControl";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const isScrolled = useScroll();
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
        isScrolled && "bg-background border-border"
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              height={24}
              width={24}
              alt="Promotly"
            ></Image>
            <span className="font-semibold text-lg">Promptly</span>
          </Link>
          <Link
            href={"/"}
            className={cn(
              "max-sm:hidden text-muted-foreground hover:text-primary font-semibold",
              pathname === "/" && "text-primary"
            )}
          >
            Home
          </Link>
          <Link
            href={"/gallery"}
            className={cn(
              "text-muted-foreground hover:text-primary font-semibold",
              pathname === "/gallery" && "text-primary"
            )}
          >
            Gallery
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <SignedOut>
            <div className="flex gap-2">
              <SignUpButton>
                <Button variant={"outline"} size={"sm"}>
                  Sign Up
                </Button>
              </SignUpButton>
              <SignInButton>
                <Button size={"sm"}>Sign In</Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserControl showName></UserControl>
          </SignedIn>
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
