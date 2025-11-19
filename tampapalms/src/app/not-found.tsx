import Link from "next/link";
import { headers } from "next/headers";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/serviceRoleClient";
import { logDbAction } from "@/lib/logs/logDbAction";

async function logNotFoundEvent() {
  try {
    const supabase = getSupabaseServiceRoleClient();
    const headersList = await headers();
    const path =
      headersList.get("x-invoke-path") ??
      headersList.get("referer") ??
      headersList.get("x-matched-path") ??
      "unknown";
    const userAgent = headersList.get("user-agent") ?? "unknown";

    await logDbAction(
      supabase,
      Promise.resolve({ data: null, error: null }),
      "404_ERROR",
      "anonymous_not_found",
      {
        table: "routing",
        operation: "page_not_found",
        path,
        userAgent,
      }
    );
  } catch (error) {
    console.error("Failed to log 404 event:", error);
  }
}

export default async function NotFound() {
  await logNotFoundEvent();
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-[#f9f7f3] px-6 py-16 text-[#1f1a16]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf8f3] via-transparent to-[#f1ebe4]" />

      <div className="relative z-10 max-w-2xl rounded-[32px] border border-[#e1d9cf] bg-white/80 px-8 py-12 text-center shadow-xl shadow-[#1f1a16]/10 backdrop-blur">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e1d9cf] bg-[#fdf8f3] px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
          Tampa Palms
        </span>

        <h1 className="mt-6 text-4xl font-semibold text-[#1f1a16] sm:text-5xl">
          404 - Page not found
        </h1>
        <p className="mt-4 text-base text-[#7a6754] sm:text-lg">
          We couldn’t locate the page you were searching for.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#1f1a16] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow shadow-[#1f1a16]/30 transition hover:bg-[#3a3127]"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
