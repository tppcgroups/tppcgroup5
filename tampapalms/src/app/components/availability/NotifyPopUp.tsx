import React from 'react'
import axios from 'axios';
import UserNotify from '@/app/api/notify/route';

interface PopupComponentProps {
  onClose: () => void;
  buildingId: string;
}

const marketingEmailAddress =
  process.env.NEXT_PUBLIC_MARKETING_EMAIL ?? 'marketing@tampapalms.com';
const subscribeUrl =
  process.env.NEXT_PUBLIC_SUBSCRIBE_URL ?? 'https://tampapalms.com/updates';
const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;

function NotifyPopUp({onClose, buildingId}: PopupComponentProps) {
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const uuid = crypto.randomUUID();
            const emailInput = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
            const user: UserNotify = {
                user_id: uuid,
                email: emailInput,
                building_id: buildingId,
            }
            await axios.post('/api/notify', user);
        } catch (error) {
            console.error("Error submitting notify request:", error);
        }
        // EMAIL SEND TEST 
        try {
          const mail = {
            recipient: "jrsussner@gmail.com",
            subject: `You're on the list for suite ${buildingId}`,
            buildingId,
            marketingEmail: marketingEmailAddress,
            subscribeUrl,
            logoUrl,
          };

          await axios.post('/api/email', mail);
        } catch (error) {
          console.error("Error sending email:", error);
        }

        onClose();
    }

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
        <div className="rounded-3xl bg-white/95 p-6 shadow-lg shadow-slate-900/10">
          <div className="flex items-start justify-between">
            <div>
              <h2
                id="notify-title"
                className="text-lg font-semibold text-slate-900"
              >
                Notify Me When Available
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Enter your email and we'll notify you when this suite becomes
                available.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close notify dialog"
              className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
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
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 cursor-pointer"
              >
                Notify Me
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NotifyPopUp
