"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

import MainNavbar from "@/components/layout/MainNavbar";
import CustomLink from "@/components/ui/CustomLink";
import Card from "@/components/ui/Card";
import HeroSlideshow from "@/components/ui/HeroSlideshow";
import Button from "@/components/ui/Button";

import { FiMail } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

export default function CheckEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "your email";

  const [resending, setResending] = React.useState(false);
  const [resendSuccess, setResendSuccess] = React.useState(false);
  const [resendError, setResendError] = React.useState<string | null>(null);

  const handleResendEmail = async () => {
    setResending(true);
    setResendError(null);
    setResendSuccess(false);

    try {
      // TODO: Implement resend email logic with Supabase
      // For now, simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResendSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 5000);
    } catch (err) {
      setResendError("Failed to resend email. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10">
        <MainNavbar />
      </header>
      <main className="flex-1 flex justify-center px-6 md:px-12 py-12 md:py-6">
        <div className="w-full max-w-[1025px] flex flex-col md:flex-row md:gap-16 items-center">
          {/* Check Email Card */}
          <Card>
            <div className="max-w-[577px] px-6 md:px-12 py-12 md:py-6 flex flex-col justify-between">
              <div className="pt-11 pb-6 flex flex-col items-center text-center">
                {/* Mail Icon */}
                <div className="mb-6 p-6 bg-secondary-light/10 rounded-full">
                  <FiMail className="text-secondary-dark" size={64} />
                </div>

                <h1 className="text-3xl font-bold text-secondary-dark mb-2">
                  Check your email!
                </h1>
                <p className="text-secondary-dark text-lg mb-2">
                  We sent a verification link to
                </p>
                <p className="text-secondary-dark font-semibold text-lg mb-6">
                  {email}
                </p>
                <p className="text-neutral-dark max-w-md">
                  Click the link in the email to activate your account. If you don&apos;t see it, check your spam folder.
                </p>
              </div>

              {/* Success Message */}
              {resendSuccess && (
                <div
                  id="resend-success-message"
                  aria-live="polite"
                  className="mb-4"
                >
                  <p className="text-green-700 bg-green-100 p-2 flex items-center gap-2 border-l-4 border-green-700 rounded-e-lg">
                    <MdCheckCircle />
                    Email sent successfully! Check your inbox.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {resendError && (
                <div id="resend-error-message" aria-live="polite" className="mb-4">
                  <p className="text-red-700 bg-negative-base/10 p-2 flex items-center gap-2 border-l-4 border-red-700 rounded-e-lg">
                    <MdError />
                    Error: {resendError}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-4 mt-8">
                {/* Resend Email Button */}
                <Button
                  type="button"
                  color="secondary"
                  size="large"
                  fullWidth
                  loading={resending}
                  onClick={handleResendEmail}
                  responsive={false}
                >
                  Resend Email
                </Button>

                {/* Back to Login Link */}
                <div className="flex items-center justify-center pt-8">
                  <p className="text-neutral-dark">Ready to log in?</p>
                  <CustomLink
                    href="/login"
                    variant="text"
                    className="font-bold px-[4px] inline-block"
                    responsive={false}
                  >
                    Go to Login
                  </CustomLink>
                </div>
              </div>
            </div>
          </Card>

          {/* Photo Slide Show */}
          <div className="flex my-auto">
            <HeroSlideshow />
          </div>
        </div>
      </main>
    </div>
  );
}