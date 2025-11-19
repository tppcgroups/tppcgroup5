'use client'
import React from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
    // router for navigation
    const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
      toast.error("Please enter a valid email address.", { autoClose: 2000 });
      return;
    }

    try {
      const response = await axios.delete("/api/users", {
        data: { email },
      });

      if (response.data.success) {
        toast.success(response.data.message, { onClose: () => router.push("/"), autoClose: 2000 });
        // event.currentTarget.reset();
      } else if (response.data.error) {
        toast.error(response.data.error, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Unsubscribe failed:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f9f7f3] text-[#1f1a16]">
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
        <span className="inline-flex items-center rounded-full border border-[#e1d9cf] bg-[#fdf8f3] px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
          Preferences
        </span>
        <h1 className="text-3xl font-semibold text-[#1f1a16] sm:text-4xl">
          Do you wish to unsubscribe from email notifications?
        </h1>
        <p className="max-w-2xl text-sm text-[#7a6754] sm:text-base">
          Unsubscribing will remove you from our availability and updates list. You can
          resubscribe at any time from our website or by contacting our leasing team.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-full border border-[#e1d9cf] bg-white px-5 py-2 text-sm text-[#1f1a16] placeholder:text-[#a49382] focus:border-[#7a6754] focus:outline-none sm:max-w-md"
          />
          <button
            type="submit"
            className="rounded-full border border-[#1f1a16] bg-[#1f1a16] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow transition hover:bg-[#3a3127]"
          >
            Unsubscribe me
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-full border border-[#e1d9cf] bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7a6754] shadow transition hover:bg-[#fdf8f3]"
        >
          No, keep me updated
        </Link>
      </section>
    </main>
  );
};

export default Page;
