"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import Image from 'next/image';
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/firebase/auth-context";
import { toast } from "sonner";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const router = useRouter();
  const { signIn, signInWithGoogle, signInWithPhone, confirmPhoneCode } = useAuth();

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
      const result = await signIn(
        formData.get("email") as string,
        formData.get("password") as string
      );
      
      // Check if email is verified
      if (!result.user.emailVerified) {
        await auth.signOut();
        toast.error("Please verify your email address first");
        return;
      }

      router.push("/dashboard");
      toast.success("Successfully logged in!");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      router.push("/dashboard");
      toast.success("Successfully logged in with Google!");
    } catch (error) {
      toast.error("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignIn = async () => {
    if (!showPhoneInput) {
      setShowPhoneInput(true);
      return;
    }

    try {
      setIsLoading(true);
      if (!phoneNumber || phoneNumber.length < 8) {
        throw new Error('Invalid phone number');
      }
      
      const confirmationResult = await signInWithPhone(phoneNumber);
      setVerificationId(confirmationResult.verificationId);
      toast.success("Verification code sent!");
    } catch (error: any) {
      console.error("Phone sign-in error:", error);
      toast.error(error.message || "Failed to send verification code");
      setShowPhoneInput(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsLoading(true);
      if (!verificationCode || verificationCode.length !== 6) {
        throw new Error('Invalid verification code format');
      }
      
      await confirmPhoneCode(verificationId, verificationCode);
      router.push("/dashboard");
      toast.success("Successfully logged in!");
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(error.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

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
              &ldquo;This inventory system has transformed how we manage our warehouse operations. 
              The real-time insights and automation have saved us countless hours.&rdquo;
            </p>
            <footer className="text-sm">Sofia Chen, Logistics Manager</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            {!showPhoneInput ? (
              <form onSubmit={onSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="name@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    type="button"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                  >
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button"
                    className="w-full"
                    onClick={handlePhoneSignIn}
                  >
                    <Icons.phone className="mr-2 h-4 w-4" />
                    Phone Number
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <CardContent className="space-y-4">
                {!verificationId ? (
                  <>
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
                    <Button 
                      className="w-full" 
                      onClick={handlePhoneSignIn}
                      disabled={isLoading}
                    >
                      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                      Send Code
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="code">Verification Code</Label>
                      <Input
                        id="code"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        required
                        maxLength={6}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleVerifyCode}
                      disabled={isLoading}
                    >
                      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                      Verify Code
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setShowPhoneInput(false);
                    setVerificationId("");
                    setVerificationCode("");
                  }}
                >
                  Back to Login
                </Button>
                <div id="recaptcha-container" />
              </CardContent>
            )}
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}