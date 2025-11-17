"use client";

import MainNavbar from "@/components/layout/MainNavbar";
import CustomLink from "@/components/ui/CustomLink";
import Link from "next/link";

import Card from "@/components/ui/Card";
import HeroSlideshow from "@/components/ui/HeroSlideshow";

import heroImage from "@/assets/vectors/knowledge-base.png";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";


export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <header className="sticky top-0 z-10">
        <MainNavbar/>
      </header>
      <main className="flex-1 flex justify-center px-6 md:px-12 py-12 md:py-6">
        <div className="w-full max-w-[1025px] flex flex-col md:flex-row md:gap-16 items-center">
            {/* Sign up Card */}
            <Card>
              <div className=" max-w-[577px] px-6 md:px-12 py-12 md:py-6 flex flex-col justify-between">
                <div>
                <div className="pt-11 pb-6">
                  <h1 className="text-3xl font-bold text-secondary-dark">Create Your Account</h1>
                  <p className="text-secondary-dark">Please enter your details to get stared</p>
                </div>
                <form className="flex flex-col gap-3 mt-4">
                    <Input 
                        type="text"
                        placeholder="Enter your Name"
                        label="Name"
                    />
                    <Input 
                        type="email"
                        placeholder="Enter your Email"
                        label="Email"
                    />
                    <div className="flex flex-col md:flex-row md:justify-between gap-4 pb-12"> 
                      <Input 
                          type="text"
                          placeholder="Enter your Password"
                          label="Password"
                          fullWidth
                      />
                      <Input 
                          type="password"
                          placeholder="Confirm your Password"
                          label="Confirm Password"
                          fullWidth
                      />
                    </div>

                    <Button type="submit" color="secondary" size="large" fullWidth>
                        Sign Up
                    </Button>
                </form>

                <div className="flex flex-row items-center gap-4 py-8">
                  <hr className="border-t-2 border-secondary-dark flex-1"/>
                  <p>Or Continue With</p>
                  <hr className="border-t-2 border-secondary-dark flex-1"/>
                </div>

                <div className="flex flex-1 gap-4">
                    <Button variant="outlined" color="tertiary" size="full" startIcon={<FaGoogle size={20}/>}>
                        Google
                    </Button>
                    <Button variant="outlined" color="tertiary" size="full" startIcon={<FaApple size={20}/>}>
                        Apple ID
                    </Button>
                    <Button variant="outlined" color="tertiary" size="full" startIcon={<FaGithub size={20}/>}>
                        Github
                    </Button>
                </div>
                </div>
                <div className="flex items-center justify-center pt-32">
                  <p className="text-neutral-dark">Already have an account?</p>
                  <CustomLink href="/login" variant="text" className="font-bold px-[4px] inline-block" responsive={false}>Log In</CustomLink>
                </div>

              </div>
            </Card>
            {/* Photo Slide Show */}
            <div className="flex my-auto">
              <HeroSlideshow/>
            </div>
        </div>
      </main>
    </div>
  )
}
