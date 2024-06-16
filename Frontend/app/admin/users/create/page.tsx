'use client'

import Link from "next/link";
import { useState } from "react";
<<<<<<< HEAD
import axios from "axios";
=======
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
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
<<<<<<< HEAD
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "@/api/DTO/apifunc";

export interface UserDTO {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  isAdmin?: boolean;
  isManager?: boolean;
  isBlocked?: boolean;
}

export default function UserCreate() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState<number | "">("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<string>("");

  const handleCreateUser = async () => {
=======
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

>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
    const user: UserDTO = {
      id: "",
      fullName,
      email,
      password,
<<<<<<< HEAD
      phone: phone as number,
=======
      phone: Number(phone),
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
      address,
      isAdmin: role.includes("admin"),
      isManager: role.includes("manager"),
      isBlocked: false,
    };

    try {
      const createdUser = await createUser(user);
<<<<<<< HEAD
      console.log("User created:", createdUser);
=======
      router.push("/admin/users");
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
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
<<<<<<< HEAD
                  <CardDescription>Enter user details below</CardDescription>
=======
                  <CardDescription>Enter user details below. New user will has default password.</CardDescription>
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Full Name</Label>
<<<<<<< HEAD
                      <Input
=======
                      <TextField
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
                        id="name"
                        type="text"
                        className="w-full"
                        placeholder="Enter user full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
<<<<<<< HEAD
=======
                        error={!!errors.fullName}
                        helperText={errors.fullName}
                        fullWidth
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
<<<<<<< HEAD
                      <Input
=======
                      <TextField
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
                        id="email"
                        type="email"
                        className="w-full"
                        placeholder="Enter user email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        className="w-full"
                        placeholder="Enter user password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
=======
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone">Phone</Label>
<<<<<<< HEAD
                      <Input
                        id="phone"
                        type="number"
                        className="w-full"
                        placeholder="Enter user phone number"
                        value={phone}
                        onChange={(e) => setPhone(Number(e.target.value))}
=======
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
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="address">Address</Label>
<<<<<<< HEAD
                      <Input
=======
                      <TextField
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
                        id="address"
                        type="text"
                        className="w-full"
                        placeholder="Enter user address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
<<<<<<< HEAD
=======
                        error={!!errors.address}
                        helperText={errors.address}
                        fullWidth
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="role">Roles</Label>
<<<<<<< HEAD
                      <Select onValueChange={(value) => setRole(value)}>
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
                      <Button size="sm" onClick={handleCreateUser}>
                        Create User
                      </Button>
                    </div>
                  </div>
                </CardContent>
=======
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
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
};

export default UserCreate;
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
