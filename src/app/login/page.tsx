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
import { useAuth } from "@/context/AuthContext";

import { MdError } from "react-icons/md";

export default function LoginPage() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const { login } = useAuth();

    // handle chahes
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    // handle submit
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        // add your login logic here
        setPassword("");
        setError(null); // reset previous error
        console.log("Login form submitted", {email, password});
        console.log(login(email, password));
        setLoading(true);
        try {
          const { success, error, data } = await login(email, password);

          // handle login result - error
          if (!success) {
              setError(error || "An unknown error occurred");
          } else {
              // Login successful, you can redirect or show a success message
              console.log("Login successful", data);
          }
        } catch (err) {
          setError("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
    }

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
                <div className="pt-11 pb-6">
                  <h1 className="text-3xl font-bold text-secondary-dark">
                    Welcome back!
                  </h1>
                  <p className="text-secondary-dark">
                    Enter your details to sign in to your account
                  </p>
                </div>

                <div id="login-error-message" aria-live="polite">
                  {error && <p className="text-red-700 bg-negative-base/10 p-2 flex items-center gap-2 border-l-4 border-red-700 rounded-e-lg mb-4">
                  <MdError />
                  Error: {error}</p>}
                </div>

                <form className="flex flex-col gap-3 mt-4 items-start" onSubmit={handleSubmit}>
                  <Input
                    type="email"
                    placeholder="Enter your Email"
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <Input
                    type="password"
                    placeholder="Enter your Password"
                    label="Password"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                  />

                  <div>
                    <CustomLink
                        href="/"
                        variant="text"
                        className="px-[4px] block justify-stretch text-end"
                        responsive={false}
                    >
                        Forgot Password?
                    </CustomLink>
                  </div>

                  <Button
                    type="submit"
                    color="secondary"
                    size="large"
                    loading={loading}
                    fullWidth
                  >
                    Log In
                  </Button>
                </form>

                <div className="flex flex-row items-center gap-4 py-8">
                  <hr className="border-t-2 border-secondary-dark flex-1" />
                  <p className="font-semibold text-secondary-dark">Or Log In With</p>
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
              
              <div className="flex items-center justify-center pt-32">
                <p className="text-neutral-dark">Don&apos;t have an account?</p>
                <CustomLink
                  href="/signup"
                  variant="text"
                  className="font-bold px-[4px] inline-block"
                  responsive={false}
                >
                  Sign Up
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
