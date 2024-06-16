'use client';
<<<<<<< HEAD
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
=======
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
import { Session } from "next-auth";
=======
import { Icons } from '@/components/icons';
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48

export function UserNav() {
    const router = useRouter();

    const handleChangePasswordClick = () => {
        router.push('/auth/change-password');
    };
<<<<<<< HEAD
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
                <AvatarImage
                src={''}
                alt={''}
                />
                <AvatarFallback>{}</AvatarFallback>
            </Avatar>
=======

    const Icon = Icons['profile'];

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <Icon className="size-5" />
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                    Settings
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                {}
                </p>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
<<<<<<< HEAD
            <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
=======
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
            <DropdownMenuItem onClick={handleChangePasswordClick}>
                Change Password
                <DropdownMenuShortcut>⇧⌘W</DropdownMenuShortcut>
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => {await signOut({redirect:true})}}>
                Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    );
}
