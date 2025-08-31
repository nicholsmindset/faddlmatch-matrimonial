import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import { getUserInfoForNav } from "@/app/actions/userActions";
import FiltersWrapper from "./FiltersWrapper";

export default async function TopNav() {
  const session = await auth();
  const userInfo =
    session?.user && (await getUserInfoForNav());

  const memberLinks = [
    { href: "/members", label: "Matches" },
    { href: "/lists", label: "Lists" },
    { href: "/messages", label: "Messages" },
  ];

  const adminLinks = [
    {
      href: "/admin/moderation",
      label: "Photo Moderation",
    },
  ];

  const links =
    session?.user.role === "ADMIN"
      ? adminLinks
      : memberLinks;
  return (
    <>
      <Navbar
        maxWidth="full"
        className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 shadow-lg"
        classNames={{
          item: [
            "text-xl",
            "text-gray-800",
            "uppercase",
            "font-medium",
            "data-[active=true]:text-amber-900",
            "hover:text-amber-800",
          ],
        }}
      >
        <NavbarBrand as={Link} href="/" className="hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white p-1">
              <Image
                src="/faddl-logo.jpeg"
                alt="FADDL Match Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-2xl text-gray-800">
                FADDLmatch
              </div>
              <div className="text-xs text-gray-700 font-medium italic -mt-1">
                a fresh start
              </div>
            </div>
          </div>
        </NavbarBrand>
        <NavbarContent justify="center">
          {session &&
            links.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
              />
            ))}
        </NavbarContent>
        <NavbarContent justify="end">
          {userInfo ? (
            <UserMenu userInfo={userInfo} />
          ) : (
            <>
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                className="text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                className="bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              >
                Register
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <FiltersWrapper />
    </>
  );
}
