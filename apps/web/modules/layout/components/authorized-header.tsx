'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/modules/common/components/ui/avatar";
import { useUser } from "@/modules/auth/hooks/use-user";
import { Button } from "@/modules/common/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { rubikMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function AuthorizedHeader() {
  const user = useUser();

  return (
    <header className="flex items-center justify-between h-14 px-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.avatarUrl || ""} />
          <AvatarFallback>
            {user?.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <h1 className={cn("text-base font-bold", rubikMono.className)}>
        OnRepeat
      </h1>
      <Button variant="ghost">
        <SettingsIcon className="w-4 h-4" />
      </Button>
    </header>
  );
} 