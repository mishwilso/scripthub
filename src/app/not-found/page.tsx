"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import MainNavbar from "@/components/layout/MainNavbar";
import Card from "@/components/ui/Card";
import CustomLink from "@/components/ui/CustomLink";
import Button from "@/components/ui/Button";

import notFoundImage from "@/assets/vectors/404-not-found.png";

export default function NotFoundPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10">
        <MainNavbar />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-12 md:py-6">
        <div className="w-full max-w-[1025px] flex flex-col md:flex-row  gap-16 md:gap-0">
          <Card variant="none" className="items-center">
            {/* 404 Message */}
            <div className=" max-w-[535px] flex flex-col items-start gap-4  mx-auto">
              <h1 className="text-9xl text-secondary-dark font-bold">404</h1>
              <p className="font-bold text-3xl text-secondary-dark">
                You weren&apos;t meant to see this...
              </p>
              <p className="text-secondary-dark">
                Either the internet has broken or we couldn&apos;t find the page
                you were looking for.
              </p>
              <Button
                onClick={handleGoBack}
                variant="contained"
                color="secondary"
                responsive={false}
                className="mt-4 px-14"
              >
                Take Me Back
              </Button>
            </div>
          </Card>

          <div className="w-full h-80 md:h-96 relative flex items-center justify-center ml-auto mr-auto">
            <Image
              src={notFoundImage}
              alt="Broken laptop with warning signs on the screen and spilt coffee cup on keyboard"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
