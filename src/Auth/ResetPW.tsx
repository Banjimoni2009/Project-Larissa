
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  CircleCheck,
  CircleX,
  AlertCircle,
} from "../imports";

export default function PasswordReset() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Live password validation
  const requirements = [
    {
      label: "At least contain 1 symbol",
      valid: /[^A-Za-z0-9]/.test(password),
    },
    {
      label: "Minimum 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "At least contain 1 number",
      valid: /\d/.test(password),
    },
    {
      label: "Using 1 capital letter",
      valid: /[A-Z]/.test(password),
    },
  ];

  const isPasswordValid = requirements.every(
    (item) => item.valid
  );

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const canSubmit = isPasswordValid && passwordsMatch;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    navigate("/password-updated");
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex justify-center items-start p-1 font-sans text-[#171717]">

      <div className="w-full max-w-[488px] bg-white border border-[#d8d8d8] shadow-sm">

        <div className="p-6">

          <h2 className="text-2xl font-semibold tracking-tight mb-3">
            Reset your password
          </h2>

          <p className="text-base text-[#606060] mb-7">
            Enter a new password for your Serenia Admin account.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Password field */}
            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <div
                className={`h-12 w-full flex items-center border bg-white transition-colors ${
                  password.length > 0
                    ? isPasswordValid
                      ? "border-green-600"
                      : "border-red-500"
                    : "border-[#d6d6d6]"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter new password"
                  className="flex-1 min-w-0 h-full px-3 outline-none bg-transparent text-base"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-11 h-full flex items-center justify-center hover:text-[#555a3b]"
                >
                  {showPassword
                    ? <EyeOff size={19} />
                    : <Eye size={19} />
                  }
                </button>
              </div>

              {password.length > 0 && !isPasswordValid && (
                <div className="flex items-center gap-1.5 text-red-500 text-[13px] mt-2">
                  <AlertCircle size={14} />
                  <span>
                    Your password does not meet all requirements.
                  </span>
                </div>
              )}

              {password.length > 0 && isPasswordValid && (
                <div className="flex items-center gap-1.5 text-green-600 text-[13px] mt-2">
                  <CircleCheck size={14} />
                  <span>Password meets all requirements.</span>
                </div>
              )}

              {/* Password requirements */}
              <div className="bg-[#f8f8f8] p-4 mt-2">

                <p className="text-sm font-medium mb-5">
                  Make sure your password is :
                </p>

                <div className="grid grid-cols-2 gap-x-3 gap-y-4">

                  {requirements.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-[#555] text-[13px] whitespace-nowrap"
                    >
                      {item.valid
                        ? (
                          <CircleCheck
                            size={18}
                            className="text-green-600 fill-green-600 stroke-white shrink-0"
                          />
                        )
                        : (
                          <CircleX
                            size={18}
                            className="text-red-600 fill-red-600 stroke-white shrink-0"
                          />
                        )
                      }

                      <span>{item.label}</span>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* Confirm password */}
            <div className="mt-5 mb-6">

              <label className="block text-sm font-medium mb-2">
                Confirm password
              </label>

              <div
                className={`h-12 w-full flex items-center border bg-white transition-colors ${
                  confirmPassword.length > 0
                    ? passwordsMatch
                      ? "border-green-600"
                      : "border-red-500"
                    : "border-[#d6d6d6]"
                }`}
              >
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Confirm new password"
                  className="flex-1 min-w-0 h-full px-3 outline-none bg-transparent text-base"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="w-11 h-full flex items-center justify-center hover:text-[#555a3b]"
                >
                  {showConfirm
                    ? <EyeOff size={19} />
                    : <Eye size={19} />
                  }
                </button>
              </div>

              {confirmPassword.length > 0 && (
                passwordsMatch
                  ? (
                    <div className="flex items-center gap-1.5 text-green-600 text-[13px] mt-2">
                      <CircleCheck size={14} />
                      <span>Passwords match.</span>
                    </div>
                  )
                  : (
                    <div className="flex items-center gap-1.5 text-red-500 text-[13px] mt-2">
                      <AlertCircle size={14} />
                      <span>Passwords do not match.</span>
                    </div>
                  )
              )}

            </div>

            {/* Submit button */}
            <div className="border-t border-[#ddd] -mx-6 -mb-6 px-6 py-6">

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full h-12 text-base font-medium text-white transition-colors ${
                  canSubmit
                    ? "bg-[#555a3b] hover:bg-[#41452d] cursor-pointer"
                    : "bg-[#77795e] opacity-80 cursor-not-allowed"
                }`}
              >
                Update password
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
