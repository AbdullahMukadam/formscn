"use client";

import { useState } from "react";
import { Building2, Plus, Users, Settings2, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export function OrganizationSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const organizations = [
    { id: "1", name: "Acme Corp", role: "Admin" },
    { id: "2", name: "Global Tech", role: "Member" },
  ];
  const [activeOrg, setActiveOrg] = useState(organizations[0]);

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-12 px-3 justify-start gap-3 min-w-[200px] border-2 bg-background hover:bg-muted/50 transition-all shadow-sm ring-1 ring-black/5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/20">
              {activeOrg.name.charAt(0)}
            </div>
            <div className="flex flex-col items-start gap-0.5 overflow-hidden">
              <span className="text-sm font-semibold truncate w-full leading-none">{activeOrg.name}</span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{activeOrg.role}</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              className="ml-auto"
            >
              <Settings2 className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64 p-2 rounded-xl shadow-2xl border-2">
          <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 py-1.5">Your Organizations</DropdownMenuLabel>
          <div className="space-y-1 my-1">
            {organizations.map((org) => (
              <DropdownMenuItem 
                key={org.id} 
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${activeOrg.id === org.id ? 'bg-primary/5' : ''}`}
                onClick={() => setActiveOrg(org)}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${activeOrg.id === org.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground'}`}>
                  {org.name.charAt(0)}
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <span className="text-sm font-medium truncate">{org.name}</span>
                  <span className="text-[10px] text-muted-foreground">{org.role}</span>
                </div>
                {activeOrg.id === org.id && <Check className="w-3.5 h-3.5 text-primary ml-auto" />}
              </DropdownMenuItem>
            ))}
          </div>
          <DropdownMenuSeparator className="mx-1" />
          <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer text-primary hover:text-primary hover:bg-primary/5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold">Create Organization</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />
      
      <div className="hidden sm:flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary/5 hover:text-primary transition-colors">
          <Users className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary/5 hover:text-primary transition-colors">
          <Mail className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function OrganizationInviteForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");

  return (
    <Card className="w-full max-w-md border-2 shadow-xl overflow-hidden ring-1 ring-black/5">
      <CardHeader className="bg-muted/30 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
            <Mail className="w-5 h-5" />
          </div>
          <Badge variant="outline" className="bg-background text-[10px] font-bold tracking-tighter px-2">INVITATION</Badge>
        </div>
        <CardTitle className="text-xl font-bold tracking-tight">Invite Teammates</CardTitle>
        <CardDescription>Collaborate with your team</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
          <Input 
            placeholder="colleague@company.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-muted/20 border-2 rounded-xl focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Assign Role</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'member', title: 'Member', desc: 'Can view and edit' },
              { id: 'admin', title: 'Admin', desc: 'Full control' }
            ].map((r) => (
              <div 
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${role === r.id ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'bg-muted/20 border-transparent hover:border-muted'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${role === r.id ? 'text-primary' : ''}`}>{r.title}</span>
                  {role === r.id && <Check className="w-3 h-3 text-primary" />}
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-8 pt-2">
        <Button className="w-full h-12 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
          Send Invitation
        </Button>
      </CardFooter>
    </Card>
  );
}
