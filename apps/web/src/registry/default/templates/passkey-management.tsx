"use client";

import { useState } from "react";
import { Fingerprint, Smartphone, Key, ShieldCheck, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export function PasskeyManagement() {
  const [passkeys, setPasskeys] = useState([
    { id: "1", name: "MacBook Pro", createdAt: "2 days ago" },
    { id: "2", name: "iPhone 15", createdAt: "1 week ago" },
  ]);

  const removePasskey = (id: string) => {
    setPasskeys(passkeys.filter(p => p.id !== id));
  };

  return (
    <Card className="w-full max-w-md border-2 shadow-xl overflow-hidden ring-1 ring-black/5">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
            <Fingerprint className="w-5 h-5" />
          </div>
          <Badge variant="secondary" className="text-[10px] font-bold tracking-tighter px-2">SECURE</Badge>
        </div>
        <CardTitle className="text-xl font-bold tracking-tight">Passkeys</CardTitle>
        <CardDescription>Sign in securely using biometrics or screen lock</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {passkeys.map((passkey) => (
              <motion.div
                key={passkey.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-4 p-3 rounded-xl border-2 bg-muted/20 border-transparent hover:border-muted transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shadow-sm">
                  {passkey.name.includes("iPhone") ? <Smartphone className="w-5 h-5" /> : <Key className="w-5 h-5" />}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-bold truncate">{passkey.name}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Added {passkey.createdAt}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                  onClick={() => removePasskey(passkey.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {passkeys.length === 0 && (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center text-muted-foreground">
              <ShieldCheck className="w-6 h-6 opacity-20" />
            </div>
            <p className="text-xs text-muted-foreground font-medium">No passkeys registered yet.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pb-8 pt-2">
        <Button className="w-full h-12 rounded-xl font-bold text-sm bg-background border-2 text-foreground hover:bg-muted group">
          <Plus className="w-4 h-4 mr-2" />
          Register New Passkey
          <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Button>
      </CardFooter>
    </Card>
  );
}
