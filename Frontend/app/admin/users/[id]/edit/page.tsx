'use client'

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserDTO } from "@/api/DTO/UserDTO";
import { getUser, updateUser } from "@/api/DTO/apifunc";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import UserFormSkeleton from "@/components/layout/user-form-skeleton";

const UserEdit = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<UserDTO | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<string>("");

  const handleResetPassword = () => {
    setPassword("password");
  };

  useEffect(() => {
    if (id) {
      const userId = Array.isArray(id) ? id[0] : id;
      getUser(userId).then((userData) => {
        setUser(userData);
        setFullName(userData.fullName);
        setEmail(userData.email);
        setPassword(userData.password);
        setPhone(userData.phone);
        setAddress(userData.address);
        setRole(
          userData.isAdmin && userData.isManager
            ? "admin-manager"
            : userData.isAdmin
            ? "admin"
            : userData.isManager
            ? "manager"
            : ""
        );
      }).catch(error => {
        console.error("Error fetching user:", error);
      });
    }
  }, [id]);

  const handleUpdateUser = async () => {
    const updatedUser: UserDTO = {
      id: user!.id,
      fullName,
      email,
      password,
      phone: phone as number,
      address,
      isAdmin: role.includes("admin"),
      isManager: role.includes("manager"),
      isBlocked: user!.isBlocked,
    };

    try {
      const result = await updateUser(updatedUser);
      console.log("User updated:", result);
      router.push("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return (
      <div>
        <UserFormSkeleton />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin">Admin</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/users">Users</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit User</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-08-chunk-0">
                <CardHeader>
                  <CardTitle>Edit User</CardTitle>
                  <CardDescription>Edit user details below</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        placeholder="Enter user full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        className="w-full"
                        placeholder="Enter user email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button variant="outline" size="sm" onClick={handleResetPassword}>
                          Reset Password
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="number"
                        className="w-full"
                        placeholder="Enter user phone number"
                        value={phone?.toString()}
                        onChange={(e) => setPhone(Number(e.target.value))}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        className="w-full"
                        placeholder="Enter user address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="role">Roles</Label>
                      <Select onValueChange={(value) => setRole(value)} value={role}>
                        <SelectTrigger id="role" aria-label="Select role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="admin-manager">
                            Admin & Manager
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                      <Button variant="outline" size="sm">
                        Discard
                      </Button>
                      <Button size="sm" onClick={handleUpdateUser}>
                        Update
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserEdit;
