'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { LogOut } from 'lucide-react';
import { NavSearchbar } from '@/components/ui/NavSearchbar';

interface InternalNavbarProps {
  className?: string;
  dict?: {
    dashboard?: {
      navigation?: {
        logoAlt?: string;
      };
    };
  };
}

export function InternalNavbar({ className = '', dict }: InternalNavbarProps) {
  const { user } = useAuth();
  const params = useParams();
  const lang = params?.lang || 'en';
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout(); // or supabase.auth.signOut() as a placeholder
    router.push(`/${lang}/login`);
  };

  return (
      <Container size="xl" className="sticky top-3 backdrop-blur z-50 ">
        <div className={`mt-4 w-[1200px] h-14 flex items-center justify-between rounded-full bg-interactive/60 px-[80px] ${className}`}>
          {/* Logo - Left Side */}
          <Link 
            href={`/${lang}/dashboard`} 
            className="flex items-center transition-fast hover:opacity-80 hover:cursor-pointer"
            aria-label={dict?.dashboard?.navigation?.logoAlt || "Navigate to Dashboard"}
          >
            <Image
              src="/logos/Placed_LogoLockup_Blue.svg"
              alt="Placed Logo"
              width={128.37}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 flex justify-center">
            <NavSearchbar />
          </div>

          {/* User Avatar - Right Side */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 hover:cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={user?.avatar || "/api/placeholder/32/32"} 
                      alt={user?.email || "User Avatar"} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {user?.email?.charAt(0).toUpperCase() ||
                        <svg width="20" height="2o" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 13.75C10.8628 13.75 9.75106 13.4128 8.80547 12.781C7.85989 12.1491 7.1229 11.2511 6.6877 10.2004C6.25249 9.14976 6.13862 7.99362 6.36049 6.87823C6.58235 5.76284 7.12999 4.73829 7.93414 3.93414C8.73829 3.12999 9.76284 2.58235 10.8782 2.36049C11.9936 2.13862 13.1498 2.25249 14.2004 2.6877C15.2511 3.1229 16.1491 3.85989 16.781 4.80547C17.4128 5.75106 17.75 6.86276 17.75 8C17.7474 9.52419 17.1407 10.9852 16.0629 12.0629C14.9852 13.1407 13.5242 13.7474 12 13.75ZM12 3.75C11.1594 3.75 10.3377 3.99926 9.63883 4.46626C8.93992 4.93325 8.39519 5.59701 8.07351 6.3736C7.75184 7.15018 7.66768 8.00472 7.83167 8.82914C7.99565 9.65356 8.40043 10.4108 8.9948 11.0052C9.58917 11.5996 10.3464 12.0044 11.1709 12.1683C11.9953 12.3323 12.8498 12.2482 13.6264 11.9265C14.403 11.6048 15.0668 11.0601 15.5337 10.3612C16.0007 9.66227 16.25 8.84057 16.25 8C16.2474 6.87364 15.7987 5.79417 15.0023 4.99772C14.2058 4.20126 13.1264 3.75264 12 3.75Z" fill="white"/>
                          <path d="M21 21.75C20.8019 21.7474 20.6126 21.6676 20.4725 21.5275C20.3324 21.3874 20.2526 21.1981 20.25 21C20.2474 19.078 19.4827 17.2355 18.1236 15.8764C16.7645 14.5173 14.922 13.7526 13 13.75H11C9.07799 13.7526 7.23546 14.5173 5.8764 15.8764C4.51733 17.2355 3.75265 19.078 3.75 21C3.75 21.1989 3.67098 21.3897 3.53033 21.5303C3.38968 21.671 3.19891 21.75 3 21.75C2.80109 21.75 2.61032 21.671 2.46967 21.5303C2.32902 21.3897 2.25 21.1989 2.25 21C2.25265 18.6802 3.17537 16.4561 4.81574 14.8157C6.45611 13.1754 8.68017 12.2526 11 12.25H13C15.3198 12.2526 17.5439 13.1754 19.1843 14.8157C20.8246 16.4561 21.7474 18.6802 21.75 21C21.7474 21.1981 21.6676 21.3874 21.5275 21.5275C21.3874 21.6676 21.1981 21.7474 21 21.75Z" fill="white"/>
                        </svg>


                     }
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[224px] h-[83px] mt-3 rounded-[6px] border border-border bg-white shadow-lg flex flex-col p-0"
                style={{ minWidth: 224, minHeight: 83 }}
                align="end"
              >
                {/* My Account label */}
                <div
                  className="w-[214px] h-[32px] px-2 py-[6px] mx-auto flex items-center text-text-primary text-md mt-1 font-medium cursor-default select-none border-b border-border"
                  style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6 }}
                >
                  My Account
                </div>
                {/* Log Out item */}
                <DropdownMenuItem
                  className="w-[214px] h-[32px] px-2 py-[6px] mx-auto flex items-center gap-2 hover:bg-background-subtle rounded-[4px] mt-1 text-text-secondary text-md font-medium hover:cursor-pointer"
                  style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6 }}
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 text-text-secondary text-shadow-sm" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
  );
} 