import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// Removed unused import: import UserNotify from '@/app/api/notify/route';

interface PopupComponentProps {
  onClose: () => void;
  buildingId: string;
}

const marketingEmailAddress =
  process.env.NEXT_PUBLIC_MARKETING_EMAIL ?? "marketing@tampapalms.com";
const subscribeUrl = "https://tppcgroup5.vercel.app/pages/DeleteEmail";
const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;

function NotifyPopUp({ onClose, buildingId }: PopupComponentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const emailInput = (
      document.querySelector("#notify-email") as HTMLInputElement
    )?.value;

    if (!emailInput) {
      toast.error("Please enter a valid email address.", { autoClose: 2000 });
      setIsLoading(false);
      return;
    }

    let notifyRequestId: string | null = null;
    let success = false;
    let unsubscribeToken: string | null = null;

    try {
      // --- 1. CREATE USER & NOTIFY REQUEST ---
      const requestPayload = {
        email: emailInput,
        buildingId: buildingId,
      };

      const response = await axios.post("/api/notify-request", requestPayload);

      if (response.data.success) {
        success = true;
        notifyRequestId = response.data.notify_request_id;
        toast.success(response.data.msg, { autoClose: 2000 });
        unsubscribeToken = response.data.unsubscribe_token ?? null;
      } else if (response.data.warning) {
        // Warning handles 'already exists'
        toast.warning(response.data.msg, { autoClose: 2000 });
        setIsLoading(false);
        onClose();
        return;
      } else if (response.data.error) {
        toast.error(response.data.msg || "Failed to save request.", {
          autoClose: 2000,
        });
        setIsLoading(false);
        onClose();
        return;
      }
    } catch (error) {
      console.error("Error submitting notify request:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        autoClose: 2000,
      });
      setIsLoading(false);
      onClose();
      return;
    }

    // --- 2. SEND EMAIL & LOG COMPLETION (If Request was successful) ---
    if (success && notifyRequestId) {
      try {
        const mailPayload = {
          recipient: emailInput,
          subject: `You're on the list for suite ${buildingId}`,
          buildingId,
          marketingEmail: marketingEmailAddress,
          subscribeUrl,
          logoUrl,
          unsubscribeToken,
        };

        // Assuming /api/email handles the email send logic
        await axios.post("/api/email", mailPayload);

        // Completed notify entries are now handled by the availability cron job once suites open.
      } catch (error) {
        // Note: The main request was saved, but the email failed.
        // The completed_notify record might also fail here.
        console.warn(
          "Notification request saved, but subsequent email send/completion log failed.",
          error
        );
        toast.info(
          "Your request was saved, but we had trouble sending the confirmation email.",
          { autoClose: 4000 }
        );
      }
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notify-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="rounded-3xl bg-white/95 p-6 shadow-lg shadow-[#1f1a16]/10">
          <div className="flex items-start justify-between">
            <div>
              <h2
                id="notify-title"
                className="text-lg font-semibold text-[#1f1a16]"
              >
                Notify Me When Available
              </h2>
              <p className="mt-1 text-sm text-[#7a6754]">
                Enter your email and we&apos;ll notify you when this suite
                becomes available.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close notify dialog"
              className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e1d9cf] bg-white text-[#4a4034] hover:bg-[#fdf8f3] cursor-pointer"
              disabled={isLoading}
            >
              ×
            </button>
          </div>

          <form
            className="mt-6 flex w-full flex-col gap-3"
            onSubmit={onSubmitHandler}
          >
            <label htmlFor="notify-email" className="sr-only">
              Email address
            </label>
            <input
              id="notify-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#e1d9cf] bg-white px-4 py-3 text-sm text-[#1f1a16] shadow-sm placeholder:text-[#c8b79f] focus:outline-none focus:ring-2 focus:ring-[#b6a895]"
              required
              disabled={isLoading}
            />

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#4a4034] hover:bg-[#f4ece1] cursor-pointer"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#1f1a16] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3a3127] cursor-pointer disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Notify Me"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NotifyPopUp;
