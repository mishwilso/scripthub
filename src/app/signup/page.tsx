"use client";

import React from "react";
import { useRouter } from "next/navigation";

import MainNavbar from "@/components/layout/MainNavbar";
import CustomLink from "@/components/ui/CustomLink";

import Card from "@/components/ui/Card";
import HeroSlideshow from "@/components/ui/HeroSlideshow";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";

import { MdError } from "react-icons/md";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const [error, setError] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<{ [key: string]: string | null }>({
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
  });

  const [loading, setLoading] = React.useState(false);

  const { signup } = useAuth();

  // Validate form submission
  const validateForm = () => {
    const newErrors: { [key: string]: string | null } = {
      email: null,
      password: null,
      confirmPassword: null,
      name: null,
    };

    let isValid = true;
    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Signup form submitted", {
      name,
      email,
      password,
      confirmPassword,
    });

    setError(null);
    setLoading(true);
    setConfirmPassword("");

    if (validateForm() === false) {
      setLoading(false);
      return;
    }

    try {
      const { success, error } = await signup(email, password, name);
      if (!success) {
        setError(error || "An unknown error occurred");
      } else {
        // Signup successful, redirect to check-email page
        console.log("Signup successful");
        router.push(
          `/auth/check-email?email=${encodeURIComponent(
            email
          )}&type=verification`
        );
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  // Compare Passwords: ensure they match. if not send error message to confirm password input field

  // Pass the error state and message to the Input component for confirm password

  // Handle error states returned by supabase

  return (
    <div className="min-h-screen flex flex-col ">
      <header className="sticky top-0 z-10">
        <MainNavbar />
      </header>
      <main className="flex-1 flex justify-center px-6 md:px-12 py-12 md:py-6">
        <div className="w-full max-w-[1025px] flex flex-col md:flex-row md:gap-16 items-center">
          {/* Sign up Card */}
          <Card>
            <div className=" max-w-[577px] px-6 md:px-12 py-12 md:py-6 flex flex-col justify-between">
              <div>
                <div className="pt-11 pb-6">
                  <h1 className="text-3xl font-bold text-secondary-dark">
                    Create Your Account
                  </h1>
                  <p className="text-secondary-dark">
                    Please enter your details to get stared
                  </p>
                </div>

                <div id="login-error-message" aria-live="polite">
                  {error && (
                    <p className="text-red-700 bg-negative-base/10 p-2 flex items-center gap-2 border-l-4 border-red-700 rounded-e-lg mb-4">
                      <MdError />
                      Error: {error}
                    </p>
                  )}
                </div>

                <form
                  className="flex flex-col gap-3 mt-4"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <Input
                    type="text"
                    placeholder="Enter your Name"
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    errorMessage={errors.name}
                    error={!!errors.name}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Enter your Email"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    errorMessage={errors.email}
                    error={!!errors.email}
                    required
                  />
                  <div className="flex flex-col md:flex-row md:justify-between gap-4 pb-12">
                    <Input
                      type="text"
                      placeholder="Enter your Password"
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={handlePasswordChange}
                      errorMessage={errors.password}
                      error={!!errors.password}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Confirm your Password"
                      label="Confirm Password"
                      fullWidth
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      errorMessage={errors.confirmPassword}
                      error={!!errors.confirmPassword}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    color="secondary"
                    size="large"
                    fullWidth
                    loading={loading}
                  >
                    Sign Up
                  </Button>
                </form>

                <div className="flex flex-row items-center gap-4 py-8">
                  <hr className="border-t-2 border-secondary-dark flex-1" />
                  <p className="font-semibold text-secondary-dark">
                    Or Continue With
                  </p>
                  <hr className="border-t-2 border-secondary-dark flex-1" />
                </div>

                <div className="flex flex-1 gap-4">
                  <Button
                    variant="outlined"
                    color="tertiary"
                    fullWidth
                    startIcon={<FaGoogle size={20} />}
                  >
                    Google
                  </Button>
                  <Button
                    variant="outlined"
                    color="tertiary"
                    fullWidth
                    startIcon={<FaApple size={20} />}
                  >
                    Apple ID
                  </Button>
                  <Button
                    variant="outlined"
                    color="tertiary"
                    fullWidth
                    startIcon={<FaGithub size={20} />}
                  >
                    Github
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center pt-32">
                <p className="text-neutral-dark">Already have an account?</p>
                <CustomLink
                  href="/login"
                  variant="text"
                  className="font-bold px-[4px] inline-block"
                  responsive={false}
                >
                  Log In
                </CustomLink>
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
