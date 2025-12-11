"use client";

import React from "react";
import { useRouter } from "next/navigation";

import MainNavbar from "@/components/layout/MainNavbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { MdCheckCircle } from "react-icons/md";

export default function EmailConfirmedPage() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-full max-w-[577px]">
      <Card>
        <div className="px-6 md:px-12 py-12 md:py-16 flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 p-6 bg-green-100 rounded-full">
            <MdCheckCircle className="text-green-600" size={64} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-secondary-dark mb-4">
            Email Confirmed!
          </h1>

          {/* Message */}
          <p className="text-neutral-dark text-lg mb-2 max-w-md">
            Your email has been successfully verified.
          </p>
          <p className="text-neutral-dark mb-8 max-w-md">
            You can now log in to your account and start using ScriptHub.
          </p>

          {/* Login Button */}
          <div className="w-full max-w-sm">
            <Button
              type="button"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleGoToLogin}
              responsive={false}
            >
              Go to Login
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
