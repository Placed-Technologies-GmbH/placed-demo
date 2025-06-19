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
    router.push(`/${lang}/`);
  };

  return (
    <nav className={`w-full h-14 bg-background shadow-lg ${className}`}>
      <Container size="xl">
        <div className="h-14 flex items-center justify-between">
          {/* Logo - Left Side */}
          <Link 
            href={`/${lang}/dashboard`} 
            className="flex items-center transition-fast hover:opacity-80"
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

          {/* User Avatar - Right Side */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-8 w-8">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={user?.avatar || "/api/placeholder/32/32"} 
                      alt={user?.email || "User"} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
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
                  className="w-[214px] h-[32px] px-2 py-[6px] mx-auto flex items-center gap-2 hover:bg-background-subtle rounded-[4px] mt-1 text-text-secondary text-md font-medium"
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
    </nav>
  );
} 