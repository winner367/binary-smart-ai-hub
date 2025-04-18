
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Search,
  MoreHorizontal,
  Lock,
  Unlock,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Mail,
  Wallet,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { getDerivAccounts } from "@/services/deriv-auth";

// Enhanced user data structure with proper type definitions
interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  accountType: "real" | "demo" | "both";
  registeredDate: string;
  lastLogin: string;
  profit: number;
  balance?: {
    real?: number;
    demo?: number;
  };
  currency?: string;
}

interface NewUserInput {
  name: string;
  email: string;
  accountType: "real" | "demo" | "both";
}

// Mock user data
const generateMockUsers = (): User[] => {
  const users: User[] = [];
  const statuses: Array<"active" | "inactive" | "suspended"> = ["active", "inactive", "suspended"];
  const accountTypes: Array<"real" | "demo" | "both"> = ["real", "demo", "both"];
  
  // Get real accounts from Deriv if available
  const derivAccounts = getDerivAccounts();
  let derivEmail = "";
  
  if (derivAccounts.length > 0) {
    // Try to extract email from account data
    const firstAccount = derivAccounts[0];
    if (firstAccount.email) {
      derivEmail = firstAccount.email;
    }
  }
  
  // Add the current user first if they have Deriv accounts
  if (derivAccounts.length > 0) {
    const demoBalance = derivAccounts.find(acc => acc.account_type === "demo")?.balance || 0;
    const realBalance = derivAccounts.find(acc => acc.account_type === "real")?.balance || 0;
    const currency = derivAccounts.find(acc => acc.currency)?.currency || "USD";
    
    users.push({
      id: `current-user-${Date.now()}`,
      name: "Current User",
      email: derivEmail || "current.user@example.com",
      status: "active",
      accountType: demoBalance && realBalance ? "both" : (realBalance ? "real" : "demo"),
      registeredDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0],
      profit: Math.floor(Math.random() * 1000) - 200,
      balance: {
        real: realBalance,
        demo: demoBalance
      },
      currency
    });
  }
  
  // Add mock users
  for (let i = 1; i <= 20; i++) {
    const randomCurrency = ["USD", "EUR", "GBP"][Math.floor(Math.random() * 3)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomAccountType = accountTypes[Math.floor(Math.random() * accountTypes.length)];
    
    users.push({
      id: `user-${i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      status: randomStatus,
      accountType: randomAccountType,
      registeredDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      lastLogin: new Date(2023, 11, Math.floor(Math.random() * 31) + 1).toISOString().split('T')[0],
      profit: Math.floor(Math.random() * 10000) - 2000,
      balance: {
        real: Math.floor(Math.random() * 5000) + 100,
        demo: Math.floor(Math.random() * 10000) + 1000
      },
      currency: randomCurrency
    });
  }
  
  return users;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [newUser, setNewUser] = useState<NewUserInput>({
    name: "",
    email: "",
    accountType: "demo"
  });
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  
  // Initialize users on component mount
  useEffect(() => {
    setUsers(generateMockUsers());
  }, []);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle user status change
  const toggleUserStatus = (userId: string) => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'suspended' : 'active';
        toast({
          title: `User ${newStatus}`,
          description: `${user.name} has been ${newStatus === 'active' ? 'activated' : 'suspended'}.`,
          variant: newStatus === 'active' ? 'default' : 'destructive',
        });
        return { ...user, status: newStatus as "active" | "inactive" | "suspended" };
      }
      return user;
    }));
  };
  
  // Delete user
  const deleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    
    toast({
      title: "User Deleted",
      description: `${userToDelete?.name} has been removed from the system.`,
      variant: "destructive",
    });
    
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  // Add new user
  const handleAddUser = () => {
    if (newUser.name.trim() === "" || newUser.email.trim() === "") {
      toast({
        title: "Validation Error",
        description: "Name and email are required fields.",
        variant: "destructive",
      });
      return;
    }

    const newUserObject: User = {
      id: `user-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      status: "active",
      accountType: newUser.accountType,
      registeredDate: new Date().toISOString().split('T')[0],
      lastLogin: "-",
      profit: 0,
      balance: {
        real: newUser.accountType === "real" || newUser.accountType === "both" ? 0 : undefined,
        demo: newUser.accountType === "demo" || newUser.accountType === "both" ? 10000 : undefined
      },
      currency: "USD"
    };

    setUsers(prevUsers => [newUserObject, ...prevUsers]);
    
    toast({
      title: "User Added",
      description: `${newUser.name} has been added to the system.`,
    });
    
    // Reset form
    setNewUser({
      name: "",
      email: "",
      accountType: "demo"
    });
    
    setOpenDialog(false);
  };
  
  // Refresh user list
  const refreshUsers = () => {
    setUsers(generateMockUsers());
    toast({
      title: "User List Refreshed",
      description: "Latest user data has been loaded.",
    });
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-7 w-7" />
          User Management
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refreshUsers} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">Export Users</Button>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. The user will need to authenticate with Deriv to access the platform.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter user name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      className="pl-10"
                      placeholder="user@example.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-type">Account Type</Label>
                  <select 
                    id="account-type"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={newUser.accountType}
                    onChange={(e) => setNewUser({...newUser, accountType: e.target.value as "demo" | "real" | "both"})}
                  >
                    <option value="demo">Demo</option>
                    <option value="real">Real</option>
                    <option value="both">Both (Demo & Real)</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={handleAddUser}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage platform users and their access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Balances</TableHead>
                  <TableHead>Profit/Loss</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          user.status === 'active' ? 'default' : 
                          user.status === 'inactive' ? 'secondary' : 
                          'destructive'
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.accountType}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.registeredDate}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {user.balance?.real !== undefined && (
                          <div className="flex items-center text-sm">
                            <Badge variant="outline" className="bg-green-50">Real</Badge>
                            <span className="ml-2">{user.balance.real} {user.currency}</span>
                          </div>
                        )}
                        {user.balance?.demo !== undefined && (
                          <div className="flex items-center text-sm">
                            <Badge variant="outline" className="bg-blue-50">Demo</Badge>
                            <span className="ml-2">{user.balance.demo} {user.currency}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={user.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {user.profit >= 0 ? '+' : ''}{user.profit} {user.currency || "USD"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={user.status === 'active'} 
                        onCheckedChange={() => toggleUserStatus(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View details</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                            {user.status === 'active' ? (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                <span>Suspend user</span>
                              </>
                            ) : (
                              <>
                                <Unlock className="mr-2 h-4 w-4" />
                                <span>Activate user</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteUser(user.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete user</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[...Array(Math.ceil(filteredUsers.length / usersPerPage))].slice(
                Math.max(0, currentPage - 3),
                Math.min(Math.ceil(filteredUsers.length / usersPerPage), currentPage + 2)
              ).map((_, i) => {
                const pageNum = Math.max(1, currentPage - 2) + i;
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredUsers.length / usersPerPage)))}
                disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
