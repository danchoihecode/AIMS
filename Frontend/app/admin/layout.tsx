import { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { authOption } from "@/configs/next-auth-config";

export default async function AdminLayOut({ children }: Readonly<{ children: ReactNode; }>) {
    const session = await getServerSession(authOption) as Session;
    if (!session || !session.access_token || !session.admin) {
        redirect("/auth/login");
    }
    return children;
}
