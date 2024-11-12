"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth-context";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import VerificationInput from "react-verification-input";

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();
  const { signUp, signInWithGoogle, signInWithPhone, confirmPhoneCode } = useAuth();

  const formatPhoneDisplay = (phone: string) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Format based on length
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else {
      return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      await signUp(
        formData.get("email") as string,
        formData.get("password") as string
      );
      router.push("/dashboard");
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      router.push("/dashboard");
      toast.success("Account created successfully with Google!");
    } catch (error) {
      toast.error("Failed to sign up with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const confirmationResult = await signInWithPhone(phoneNumber);
      setVerificationId(confirmationResult.verificationId);
      setShowVerification(true);
      startResendTimer();
      toast.success("Verification code sent!");
    } catch (error: any) {
      console.error("Phone sign-in error:", error);
      toast.error(error.message || "Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await confirmPhoneCode(verificationId, verificationCode);
      router.push("/dashboard");
      toast.success("Successfully signed in!");
    } catch (error) {
      toast.error("Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

    function setPhoneDisplay(formattedNumber: string) {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
            alt="Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.boxIcon className="mr-2 h-6 w-6" />
          StockFlow
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Join thousands of businesses that have streamlined their inventory management with StockFlow.&rdquo;
            </p>
            <footer className="text-sm">Start your journey today</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Choose your preferred registration method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                  <TabsTrigger value="google">Google</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={onSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="name@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="phone">
                  {!showVerification ? (
                    <form onSubmit={handlePhoneSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <PhoneInput
                          country={'us'}
                          value={phoneNumber}
                          onChange={(phone, data: any) => {
                            const fullNumber = "+" + phone;
                            setPhoneNumber(fullNumber);
                            // Update display in the verification screen
                            const formattedNumber = formatPhoneDisplay(phone);
                            setPhoneDisplay(formattedNumber);
                          }}
                          inputClass="w-full p-2 rounded-md border"
                          containerClass="w-full"
                          buttonClass="!border-input !bg-background"
                          dropdownClass="!bg-background !border-input"
                          searchClass="!bg-background"
                          enableSearch
                          disableSearchIcon
                          inputProps={{
                            required: true,
                            id: 'phone'
                          }}
                        />
                      </div>
                      <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading && (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send Verification Code
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Enter Verification Code</Label>
                        <div className="flex justify-center py-4">
                          <VerificationInput
                            value={verificationCode}
                            onChange={setVerificationCode}
                            length={6}
                            placeholder=""
                            classNames={{
                              container: "verification-input",
                              character: "verification-character",
                              characterInactive: "verification-character--inactive",
                              characterSelected: "verification-character--selected",
                            }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          We sent a code to {formatPhoneDisplay(phoneNumber.slice(1))}
                        </p>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleVerificationSubmit}
                        disabled={isLoading || verificationCode.length !== 6}
                      >
                        {isLoading && (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Verify Code
                      </Button>
                      <div className="flex justify-between items-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowVerification(false)}
                        >
                          Change Number
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handlePhoneSubmit}
                          disabled={isLoading || resendTimer > 0}
                        >
                          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                        </Button>
                      </div>
                      <div id="recaptcha-container" />
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="google">
                  <div className="space-y-4 mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      <Icons.google className="mr-2 h-4 w-4" />
                      Continue with Google
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Separator />
              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 