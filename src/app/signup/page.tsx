"use client";

import React from "react";

import MainNavbar from "@/components/layout/MainNavbar";
import CustomLink from "@/components/ui/CustomLink";

import Card from "@/components/ui/Card";
import HeroSlideshow from "@/components/ui/HeroSlideshow";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

export default function SignupPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Signup form submitted", {
      name,
      email,
      password,
      confirmPassword,
    });
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
                <form
                  className="flex flex-col gap-3 mt-4"
                  onSubmit={handleSubmit}
                >
                  <Input
                    type="text"
                    placeholder="Enter your Name"
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <Input
                    type="email"
                    placeholder="Enter your Email"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <div className="flex flex-col md:flex-row md:justify-between gap-4 pb-12">
                    <Input
                      type="text"
                      placeholder="Enter your Password"
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <Input
                      type="password"
                      placeholder="Confirm your Password"
                      label="Confirm Password"
                      fullWidth
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    color="secondary"
                    size="large"
                    fullWidth
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
                    size="full"
                    startIcon={<FaGoogle size={20} />}
                  >
                    Google
                  </Button>
                  <Button
                    variant="outlined"
                    color="tertiary"
                    size="full"
                    startIcon={<FaApple size={20} />}
                  >
                    Apple ID
                  </Button>
                  <Button
                    variant="outlined"
                    color="tertiary"
                    size="full"
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
