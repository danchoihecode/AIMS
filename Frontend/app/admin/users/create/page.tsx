'use client'

import Link from "next/link";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextField, MenuItem } from "@mui/material";
import validator from "validator";
import { createUser } from "@/api/DTO/apifunc";
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { UserDTO } from "@/api/DTO/UserDTO";

const UserCreate = () => {
  const router = useRouter()

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password] = useState("password");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFields = () => {
    let errors: { [key: string]: string } = {};
    if (validator.isEmpty(fullName)) errors.fullName = "Full Name is required";
    if (!validator.isEmail(email)) errors.email = "Invalid email";
    if (!validator.isNumeric(phone)) errors.phone = "Phone number must be digits";
    if (validator.isEmpty(address)) errors.address = "Address is required";
    return errors;
  };

  const handleCreateUser = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const user: UserDTO = {
      id: "",
      fullName,
      email,
      password,
      phone: Number(phone),
      address,
      isAdmin: role.includes("admin"),
      isManager: role.includes("manager"),
      isBlocked: false,
    };

    try {
      const createdUser = await createUser(user);
      router.push("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

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
                <BreadcrumbPage>Create User</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-08-chunk-0">
                <CardHeader>
                  <CardTitle>Create User</CardTitle>
                  <CardDescription>Enter user details below. New user will has default password.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Full Name</Label>
                      <TextField
                        id="name"
                        type="text"
                        className="w-full"
                        placeholder="Enter user full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        error={!!errors.fullName}
                        helperText={errors.fullName}
                        fullWidth
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <TextField
                        id="email"
                        type="email"
                        className="w-full"
                        placeholder="Enter user email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone">Phone</Label>
                      <TextField
                        id="phone"
                        type="text"
                        className="w-full"
                        placeholder="Enter user phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        fullWidth
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="address">Address</Label>
                      <TextField
                        id="address"
                        type="text"
                        className="w-full"
                        placeholder="Enter user address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={!!errors.address}
                        helperText={errors.address}
                        fullWidth
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="role">Roles</Label>
                      <TextField
                        select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        error={!!errors.role}
                        helperText={errors.role}
                        fullWidth
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="admin-manager">Admin & Manager</MenuItem>
                      </TextField>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleCreateUser}>
                    Create User
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserCreate;
