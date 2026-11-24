import { passwordUpdatedImage as image } from '../imports'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export interface PasswordUpdatedProps {
  /** Callback fired when the primary action button is clicked */
  onBackToLogin?: () => void;
  /** Optional custom heading text (defaults to "Password updated!") */
  title?: string;
  /** Optional custom description text */
  description?: React.ReactNode;
  /** Optional custom button label (defaults to "Back to login") */
  buttonText?: string;
  /** Optional additional class names for the outer card */
  className?: string;
}

/**
 * High-precision layered 3D SVG recreating the tilted forest-green circular
 * coin/badge with a glossy raised bevel rim, recessed matte face, and
 * extruded off-white/cream checkmark.
 */
const ThreeDCheckmarkBadge: React.FC = () => {
  return (
    <div className="flex flex-col items-center select-none" aria-hidden="true">
        <img src={image} alt="Password Updated" />
      {/* Floating elliptical soft drop shadow directly beneath the coin */}
      <div className="w-[68px] h-[9px] bg-black/[0.14] rounded-full blur-[4px] mt-2.5 mb-7" />
    </div>
  );
};

/**
 * PasswordUpdated Confirmation Card Component
 */
export const PasswordUpdated: React.FC<PasswordUpdatedProps> = ({
  onBackToLogin,
  title = 'Password updated!',
  description,
  buttonText = 'Back to login',
  className = '',
}) => {
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const handleActionClick = () => {
    if (onBackToLogin) {
      onBackToLogin();
      return;
    }

    setFeedbackNotice('Redirecting to login screen...');
    window.setTimeout(() => {
      setFeedbackNotice(null);
    }, 2600);
  };

  return (
    <section
      aria-labelledby="password-updated-heading"
      className={`w-full max-w-[440px] bg-white border border-[#E5E5E5] rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${className}`}
    >
      {/* Top Section: 3D Icon + Heading + Description */}
      <div className="pt-14 pb-12 px-8 flex flex-col items-center text-center border-b border-[#E5E5E5]">
        <ThreeDCheckmarkBadge />

        <h1
          id="password-updated-heading"
          className="text-[#141414] text-[24px] font-bold tracking-[-0.015em] leading-tight mb-3"
        >
          {title}
        </h1>

        <p className="text-[#5C5C5C] text-[15px] leading-[1.5] max-w-[330px]">
          {description ?? (
            <>
              Your password has been reset. You can now
              <br />
              use your new credentials to log in.
            </>
          )}
        </p>
      </div>

      {/* Bottom Section: Action Footer */}
      <div className="p-6">
        <button
          type="button"
          onClick={handleActionClick}
          className="w-full h-[48px] rounded-none bg-[#525538] hover:bg-[#43462E] active:bg-[#383A26] transition-colors duration-150 text-white text-[15px] font-medium flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#525538] focus-visible:ring-offset-2"
        >
          {buttonText}
        </button>

        {feedbackNotice && (
          <p
            role="status"
            aria-live="polite"
            className="mt-3 text-center text-[13px] text-[#525538] font-medium"
          >
            {feedbackNotice}
          </p>
        )}
      </div>
    </section>
  );
};

/**
 * Default Preview Wrapper centered on a light neutral canvas
 */
export default function App() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center p-4 sm:p-8 antialiased">
      <PasswordUpdated onBackToLogin={() => navigate('/login')} />
    </main>
  );
}