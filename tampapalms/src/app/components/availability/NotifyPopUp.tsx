import React from 'react'
import axios from 'axios';
import UserNotify from '@/app/api/notify/route';
import { toast } from 'react-toastify';

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
      const emailInput = (
        document.querySelector('input[name="email"]') as HTMLInputElement
      ).value;
        e.preventDefault();
        try {
            const uuid = crypto.randomUUID();
            
            const user: UserNotify = {
                user_id: uuid,
                email: emailInput,
                building_id: buildingId,
            }
            const response = await axios.post('/api/notify', user);
            if (response.data.success) {
              toast.success(response.data.msg, { autoClose: 2000 });
              // EMAIL SEND TEST
              try {
                const mail = {
                  recipient: emailInput,
                  subject: `You're on the list for suite ${buildingId}`,
                  buildingId,
                  marketingEmail: marketingEmailAddress,
                  subscribeUrl,
                  logoUrl,
                };

                await axios.post("/api/email", mail);
              } catch (error) {
                console.error("Error sending email:", error);
              }
            } else if (response.data.warning) {
              toast.warning(response.data.msg, {autoClose: 2000});
            } else if (response.data.error) {
              toast.error(response.data.msg, {autoClose: 2000});
            }
        } catch (error) {
            console.error("Error submitting notify request:", error);
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
                Enter your email and we&apos;ll notify you when this suite becomes
                available.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close notify dialog"
              className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e1d9cf] bg-white text-[#4a4034] hover:bg-[#fdf8f3] cursor-pointer"
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
            />

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#4a4034] hover:bg-[#f4ece1] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#1f1a16] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3a3127] cursor-pointer"
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
