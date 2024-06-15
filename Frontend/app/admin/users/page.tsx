'use client'

import Link from "next/link"
import {
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { UserDTO } from "@/api/DTO/UserDTO";
import { getUsers, deleteUser, blockUser, unblockUser } from "@/api/DTO/apifunc";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

type UserStatus = "All" | "Active" | "Block";

export default function Users() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    getUsers().then((data) => {
      if (data) setUsers(data);
    });
  }, []);
  
  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete);
        setUsers(users.filter(user => user.id !== userToDelete));
        setIsDialogOpen(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleOpenDialog = (id: string) => {
    setUserToDelete(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setUserToDelete(null);
  };

  const handleBlock = async (id: string) => {
    try {
      await blockUser(id);
      setUsers(users.map(user => user.id === id ? { ...user, isBlocked: true } : user));
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleUnblock = async (id: string) => {
    try {
      await unblockUser(id);
      setUsers(users.map(user => user.id === id ? { ...user, isBlocked: false } : user));
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const filteredUsers = (status: UserStatus) => {
    if (status === "All") return users;
    return users.filter(user => {
      if (status === "Block") {
        return user.isBlocked;
      } else if (status === "Active") {
        return !user.isBlocked;
      }
      return false;
    });
  };

  return (
    <div>
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
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="All">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Active">Active</TabsTrigger>
                  <TabsTrigger value="Block">Block</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <Link href="/admin/users/create">
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add User
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
              <TabsContent value="All">
                <UserTable users={filteredUsers("All")} handleOpenDialog={handleOpenDialog} handleBlock={handleBlock} handleUnblock={handleUnblock} />
              </TabsContent>
              <TabsContent value="Active">
                <UserTable users={filteredUsers("Active")} handleOpenDialog={handleOpenDialog} handleBlock={handleBlock} handleUnblock={handleUnblock} />
              </TabsContent>
              <TabsContent value="Block">
                <UserTable users={filteredUsers("Block")} handleOpenDialog={handleOpenDialog} handleBlock={handleBlock} handleUnblock={handleUnblock} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function UserTable({ users, handleOpenDialog, handleBlock, handleUnblock }: { users: UserDTO[], handleOpenDialog: (id: string) => void, handleBlock: (id: string) => void, handleUnblock: (id: string) => void }) {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/admin/users/${id}/edit`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage your users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Roles</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{user.fullName}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{user.isBlocked ? 'Block' : 'Active'}</Badge>
                </TableCell>
                <TableCell>
                  {user.isAdmin && user.isManager ? (
                    <div>
                      <Badge variant="outline">Admin</Badge>
                      <Badge variant="outline">Manager</Badge>
                    </div>
                  ) : user.isAdmin ? (
                    <Badge variant="outline">Admin</Badge>
                  ) : user.isManager ? (
                    <Badge variant="outline">Manager</Badge>
                  ) : null}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenDialog(user.id)}>
                        Delete User
                      </DropdownMenuItem>
                      {user.isBlocked ? (
                        <DropdownMenuItem onClick={() => handleUnblock(user.id)}>
                          Unblock User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleBlock(user.id)}>
                          Block User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{users.length}</strong> users
        </div>
      </CardFooter>
    </Card>
  );
}
