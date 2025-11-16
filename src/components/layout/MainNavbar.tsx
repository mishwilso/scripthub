import React from "react";
import Link from "next/link";

export default function MainNavbar() {
  return (
    <nav>
      <Link href="/">
        ScriptHub
      </Link>
      <Link href="/login">Log In</Link>
      <Link href="/signup">Sign Up</Link>
    </nav>
  );
}
