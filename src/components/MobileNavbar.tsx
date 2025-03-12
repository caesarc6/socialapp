"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser(); // Clerk's client-side hook to get user data
  const { theme, setTheme } = useTheme();

  // Get username from Clerk user object, fallback to email prefix if no username
  const username =
    user?.username || user?.emailAddresses?.[0]?.emailAddress.split("@")[0];
  const profileLink = username ? `/profile/${username}` : "/profile";

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href={profileLink}>
                    <UserIcon className="w-4 h-4" />
                    {username ? `Profile (@${username})` : "Profile"}
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start w-full"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
// "use client";

// import {
//   BellIcon,
//   HomeIcon,
//   LogOutIcon,
//   MenuIcon,
//   MoonIcon,
//   SunIcon,
//   UserIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { useEffect, useState } from "react";
// import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
// import { useTheme } from "next-themes";
// import Link from "next/link";
// import { getProfileByUsername } from "@/actions/profile.action";

// function MobileNavbar() {
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const { isSignedIn, userId } = useAuth();
//   const { theme, setTheme } = useTheme();
//   const [username, setUsername] = useState<string | null>(null);

//   // Fetch user profile when signed in
//   useEffect(() => {
//     async function fetchProfile() {
//       if (isSignedIn && userId) {
//         try {
//           const profile = await getProfileByUsername(userId);
//           if (profile?.username) {
//             setUsername(profile.username);
//           }
//         } catch (error) {
//           console.error("Error fetching profile:", error);
//         }
//       }
//     }
//     fetchProfile();
//   }, [isSignedIn, userId]);

//   return (
//     <div className="flex md:hidden items-center space-x-2">
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//         className="mr-2"
//       >
//         <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//         <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//         <span className="sr-only">Toggle theme</span>
//       </Button>

//       <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
//         <SheetTrigger asChild>
//           <Button variant="ghost" size="icon">
//             <MenuIcon className="h-5 w-5" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="right" className="w-[300px]">
//           <SheetHeader>
//             <SheetTitle>Menu</SheetTitle>
//           </SheetHeader>
//           <nav className="flex flex-col space-y-4 mt-6">
//             <Button
//               variant="ghost"
//               className="flex items-center gap-3 justify-start"
//               asChild
//             >
//               <Link href="/">
//                 <HomeIcon className="w-4 h-4" />
//                 Home
//               </Link>
//             </Button>

//             {isSignedIn ? (
//               <>
//                 <Button
//                   variant="ghost"
//                   className="flex items-center gap-3 justify-start"
//                   asChild
//                 >
//                   <Link href="/notifications">
//                     <BellIcon className="w-4 h-4" />
//                     Notifications
//                   </Link>
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   className="flex items-center gap-3 justify-start"
//                   asChild
//                 >
//                   <Link href={`/profile/${username}`}>
//                     <UserIcon className="w-4 h-4" />
//                     Profile
//                   </Link>
//                 </Button>
//                 <SignOutButton>
//                   <Button
//                     variant="ghost"
//                     className="flex items-center gap-3 justify-start w-full"
//                   >
//                     <LogOutIcon className="w-4 h-4" />
//                     Logout
//                   </Button>
//                 </SignOutButton>
//               </>
//             ) : (
//               <SignInButton mode="modal">
//                 <Button variant="default" className="w-full">
//                   Sign In
//                 </Button>
//               </SignInButton>
//             )}
//           </nav>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

// export default MobileNavbar;
