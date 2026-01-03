"use client";

import MainNavbar from "@/components/layout/MainNavbar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CustomLink from "@/components/ui/CustomLink";
import Input from "@/components/ui/Input";

import asking from "@/assets/vectors/asking-questions.png";
import { MdError } from "react-icons/md";

import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { forgotPassword } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Forgot Password form submitted", { email });
    setLoading(true);
    setError(null);

    try {
      if (!email || email.trim() === "") {
        setError("Please enter your email address.");
        setLoading(false);
        return;
      }

      const { error, success } = await forgotPassword(email);

      if (!success) {
        setError(error || "An unknown error occurred");
      } else {
        router.push(
          `/auth/check-email?email=${encodeURIComponent(email)}&type=reset`
        );
      }
    } catch (err) {
      console.error("Error requesting password reset:", err);
      setError("Failed to request password reset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[577px] flex flex-col items-center justify-center">
      <Card variant="outline">
        <div className="px-6 md:px-12 py-12 md:py-12 flex flex-col">
          {/* Image */}

          <div className="w-48 h-48 md:w-48 md:h-48 relative mb-6 mx-auto">
            <Image
              src={asking}
              alt="Girl pointing upwards with question marks at head"
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-secondary-dark mb-4 pt-6">
            Forgot Password
          </h1>

          {/* Message */}
          <p className="text-secondary-dark mb-6">
            Enter your email address to receive a password reset link.
          </p>

          {/* Error Message */}

          <div id="login-error-message" aria-live="polite">
            {error && (
              <p className="text-red-700 bg-negative-base/10 p-2 flex items-center gap-2 border-l-4 border-red-700 rounded-e-lg mb-4">
                <MdError />
                Error: {error}
              </p>
            )}
          </div>

          {/* Input */}
          <form
            className="flex flex-col gap-4 items-start"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              placeholder="Enter your Email"
              label="Email"
              value={email}
              onChange={handleEmailChange}
            />

            <Button
              type="submit"
              color="secondary"
              size="large"
              loading={loading}
              fullWidth
              responsive={false}
            >
              Request Reset Link
            </Button>
          </form>

          <CustomLink
            href="/login"
            variant="text"
            className="mt-10 px-[4px] text-center text-sm items-center"
            responsive={false}
          >
            Back to Login
          </CustomLink>
        </div>
      </Card>
    </div>
  );
}
