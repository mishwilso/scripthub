"use client";

import MainNavbar from "@/components/layout/MainNavbar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CustomLink from "@/components/ui/CustomLink";
import Input from "@/components/ui/Input";

import reset from "@/assets/vectors/reset-password.png";
import resetSuccess from "@/assets/vectors/reset-password-success.png";

import { MdError } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const { updatePassword } = useAuth();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset Password form submitted", { password, confirmPassword });
    setLoading(true);
    setError(null);

    try {
      if (!password || password.trim() === "") {
        setError("Please enter your new password.");
        setLoading(false);
        return;
      }

      const { error, success } = await updatePassword(password);

      setSuccessResult(success);

      if (!success) {
        setError(error || "An unknown error occurred");
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
          {successResult ? (
            <div className="flex flex-col items-center">
              {/* Image */}
              <div className="w-48 h-48 md:w-48 md:h-48 relative mb-6 mx-auto">
                <Image
                  src={resetSuccess}
                  alt="Man locking a giant padlock with a new key, while old key is broken on the ground"
                />
              </div>

              <h1 className="text-3xl font-bold text-secondary-dark mb-4 pt-6">
                Password Updated!
              </h1>
              <p className="text-secondary-dark mb-6 text-center">
                Your password has been successfully updated. You can now log in
                with your new password.
              </p>
              <CustomLink href="/login" color="secondary" responsive={false}>
                <p className="px-10">Back to Login</p>
              </CustomLink>
            </div>
          ) : (
            <>
              {/* Image */}
              <div className="w-48 h-48 md:w-48 md:h-48 relative mb-6 mx-auto">
                <Image
                  src={reset}
                  alt="Girl clicking on reset button on phone and swapping password blocks"
                />
              </div>

              {/* Heading */}
              <h1 className="text-3xl font-bold text-secondary-dark mb-4 pt-6">
                Reset Password
              </h1>

              {/* Message */}
              <p className="text-secondary-dark mb-6">
                Please set your new password below.
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
                  type="text"
                  placeholder="Enter your new Password"
                  label="New Password"
                  fullWidth
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Input
                  type="password"
                  placeholder="Confirm your newPassword"
                  label="Confirm New Password"
                  fullWidth
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />

                <Button
                  type="submit"
                  color="secondary"
                  size="large"
                  loading={loading}
                  fullWidth
                  responsive={false}
                >
                  {loading ? "Updating..." : "Update Password"}
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
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
