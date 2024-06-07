'use client'
import {Button} from "@mui/material";
import {getSession, signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function TestPage(){
    const router = useRouter();
    return <div>
        Manager page!!
        <Button onClick={async () => {
            await signOut({redirect:true})
        }}>Sign Out</Button>
    </div>
}