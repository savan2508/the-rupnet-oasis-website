"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

export default function SubmitButton({ children, pendingLabel, disabled }) {
  const { pending } = useFormStatus();

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(pending || disabled);
  }, [disabled, pending]);

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={isDisabled}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
