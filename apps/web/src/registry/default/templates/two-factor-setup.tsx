"use client";

import { useState } from "react";
import { ShieldCheck, Fingerprint, Lock, ShieldAlert, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export function TwoFactorSetup() {
  const [step, setStep] = useState<"intro" | "qr" | "verify" | "success">("intro");
  const [code, setCode] = useState("");

  const nextStep = () => {
    if (step === "intro") setStep("qr");
    else if (step === "qr") setStep("verify");
    else if (step === "verify") setStep("success");
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-2 shadow-xl ring-1 ring-black/5">
      <div className="h-1.5 w-full bg-muted flex">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "25%" }}
          animate={{ 
            width: step === "intro" ? "25%" : step === "qr" ? "50%" : step === "verify" ? "75%" : "100%" 
          }}
        />
      </div>
      
      <CardHeader className="text-center pt-8">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 ring-8 ring-primary/5">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Two-Factor Auth</CardTitle>
        <CardDescription>Secure your account with an extra layer of protection</CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8 min-h-[300px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-center"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                Two-factor authentication adds an extra layer of security to your account. To log in, you'll need to provide a code from your authenticator app.
              </p>
              <div className="grid grid-cols-1 gap-2 text-left pt-2">
                {[
                  { icon: Lock, text: "Protects against stolen passwords" },
                  { icon: Fingerprint, text: "Requires physical access to your device" },
                  { icon: ShieldAlert, text: "Prevents unauthorized logins" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-xs font-medium border border-transparent hover:border-primary/10 transition-colors">
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === "qr" && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-6 text-center"
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Scan this QR Code</h3>
                <p className="text-xs text-muted-foreground">Use Google Authenticator or Authy</p>
              </div>
              
              <div className="mx-auto w-48 h-48 bg-white border-8 border-white shadow-2xl rounded-2xl flex items-center justify-center p-2">
                <div className="w-full h-full bg-black/5 rounded-lg flex items-center justify-center relative overflow-hidden group">
                  <div className="grid grid-cols-4 grid-rows-4 gap-1 opacity-20">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="bg-black w-full h-full" />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Placeholder</span>
                    <span className="text-[10px] font-mono text-black/60">QR_CODE_DATA</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted rounded-xl border border-dashed text-xs font-mono break-all">
                ABCD EFGH IJKL MNOP
              </div>
            </motion.div>
          )}

          {step === "verify" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Verify the setup</h3>
                <p className="text-xs text-muted-foreground">Enter the 6-digit code from your app</p>
              </div>

              <div className="flex justify-center gap-2">
                <Input 
                  className="text-center text-2xl font-bold tracking-[0.5em] h-14 bg-muted/50 border-2 focus-visible:ring-primary ring-offset-4"
                  maxLength={6}
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                Enter code to finish
              </p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Check className="w-10 h-10" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">You're protected!</h3>
                <p className="text-sm text-muted-foreground px-4">Two-factor authentication is now active on your account.</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-2xl border border-primary/5 space-y-2">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Recovery Codes</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-1 bg-background rounded border">XXXX-XXXX</div>
                  <div className="p-1 bg-background rounded border">XXXX-XXXX</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="px-8 pb-8 flex flex-col gap-3">
        {step !== "success" ? (
          <>
            <Button className="w-full h-12 rounded-xl text-sm font-semibold group" onClick={nextStep}>
              {step === "intro" ? "Get Started" : step === "qr" ? "I've scanned it" : "Verify & Enable"}
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            {step !== "intro" && (
              <Button variant="ghost" className="w-full text-xs text-muted-foreground" onClick={() => setStep("intro")}>
                Go Back
              </Button>
            )}
          </>
        ) : (
          <Button className="w-full h-12 rounded-xl text-sm font-semibold" variant="outline">
            Download Recovery Codes
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
