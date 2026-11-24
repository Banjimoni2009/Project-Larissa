import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Info, X } from '../imports';
import { Link } from 'react-router-dom';

/**
 * ForgotPassword Component
 *
 * Recreates the exact "Forgot password?" content container and "Important!" alert box
 * using React, Tailwind CSS, and lucide-react icons.
 */
export default function ForgotPW() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [resetLinkSent, setResetLinkSent] = useState(false);

  /**
   * Handles form submission when "Send reset link" is clicked.
   */
  const handleSendResetLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedEmail) {
      setIsError(true);
      setResetLinkSent(false);
      setStatusMessage('Please enter your registered email address.');
      return;
    }

    if (!isValidEmail) {
      setIsError(true);
      setResetLinkSent(false);
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setIsError(false);
    setResetLinkSent(true);
    setStatusMessage(`A password reset link has been sent to ${trimmedEmail}.`);
  };

  /**
   * Handles secondary action when "Didn’t get the link?" is clicked.
   */
  const handleDidNotGetLink = () => {
    const trimmedEmail = email.trim();
    setIsError(false);

    if (trimmedEmail) {
      setStatusMessage(
        `Check your spam folder or click "Send reset link" again to resend to ${trimmedEmail}.`
      );
    } else {
      setStatusMessage(
        'Enter your registered email address above and click "Send reset link" to try again.'
      );
    }
  };

  /**
   * Updates email state and clears active validation errors on change.
   */
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsError(false);
    setResetLinkSent(false);
    setStatusMessage(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] text-[#181818] font-sans antialiased flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Main Centered Container */}
      <main className="w-full max-w-[440px]">
        {/* Top Card Container: "Forgot password?" */}
        <section
          aria-labelledby="forgot-password-title"
          className="w-full bg-[#FFFFFF] border border-[#EAEAEA] rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
        >
          <form onSubmit={handleSendResetLink} noValidate>
            {/* Top Form Section */}
            <div className="p-6">
              <h1
                id="forgot-password-title"
                className="text-[22px] font-semibold leading-tight tracking-[-0.01em] text-[#181818]"
              >
                Forgot password?
              </h1>

              <p className="mt-2.5 text-[13.5px] leading-[1.5] text-[#636363]">
                Enter your registered email, and we’ll send you a reset link to recover your account.
              </p>

              {/* Email Input Field Group */}
              <div className="mt-6">
                <label
                  htmlFor="email-address"
                  className="block text-[12.5px] font-medium text-[#1C1C1C] mb-2"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email address"
                  className={`w-full h-[42px] px-3.5 bg-[#FFFFFF] border ${
                    isError ? 'border-[#B91C1C]' : 'border-[#D4D4D4]'
                  } rounded-[2px] text-[13.5px] text-[#181818] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[#515636] transition-colors duration-150`}
                />

                {/* Inline Feedback Message (only rendered after user interaction) */}
                {statusMessage && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`mt-2 text-[12px] leading-[1.4] ${
                      isError ? 'text-[#B91C1C]' : 'text-[#515636]'
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}
                {resetLinkSent && (
                  <Link to="/reset-password" className="mt-2 inline-block text-[12px] font-medium text-[#515636] underline underline-offset-2">
                    Open the password reset form
                  </Link>
                )}
              </div>
            </div>

            {/* Full-Bleed Horizontal Divider */}
            <div className="w-full border-t border-[#EAEAEA]" role="separator" />

            {/* Bottom Button Section */}
            <div className="p-6 space-y-3">
              <button
                type="submit"
                className="w-full h-[44px] bg-[#515636] hover:bg-[#44482D] active:bg-[#3A3E26] text-[#FFFFFF] text-[14px] font-normal rounded-[2px] transition-colors duration-150 cursor-pointer flex items-center justify-center"
              >
                Send reset link
              </button>

              <button
                type="button"
                onClick={handleDidNotGetLink}
                className="w-full h-[44px] bg-[#F2F2F2] hover:bg-[#E8E8E8] active:bg-[#DFDFDF] text-[#181818] text-[14px] font-normal rounded-[2px] transition-colors duration-150 cursor-pointer flex items-center justify-center"
              >
                Didn’t get the link?
              </button>
            </div>
          </form>
        </section>

        {/* Bottom Alert Banner: "Important!" */}
        {isAlertVisible ? (
          <aside
            role="alert"
            className="mt-4 w-full bg-[#FDF7EA] border border-[#EBD49B] rounded-[2px] p-4 flex items-start justify-between gap-3"
          >
            {/* Left Icon Box */}
            <div
              className="w-[34px] h-[34px] shrink-0 bg-[#FFFFFF] border border-[#EFECE6] rounded-[2px] flex items-center justify-center"
              aria-hidden="true"
            >
              <Info
                className="w-[17px] h-[17px] text-[#FFFFFF] fill-[#9A6B00]"
                strokeWidth={2.25}
              />
            </div>

            {/* Middle Text Content */}
            <div className="flex-1 min-w-0">
              <h2 className="text-[13.5px] font-semibold leading-snug text-[#181818]">
                Important!
              </h2>
              <p className="mt-1 text-[12.5px] leading-[1.48] text-[#595959]">
                Make sure you enter the correct email address, and if you forget which email address you registered with, contact the system administrator.
              </p>
            </div>

            {/* Right Dismiss Button */}
            <button
              type="button"
              onClick={() => setIsAlertVisible(false)}
              aria-label="Dismiss important alert"
              className="shrink-0 p-0.5 text-[#666666] hover:text-[#181818] transition-colors duration-150 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>
          </aside>
        ) : (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setIsAlertVisible(true)}
              className="text-[12px] text-[#7A7A7A] hover:text-[#181818] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Show important notice
            </button>
          </div>
        )}
      </main>
    </div>
  );
}