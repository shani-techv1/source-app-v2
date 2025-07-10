import { Dropdown, DropdownOption } from "../ui/Dropdown";
import React from "react";

interface SignupStepUserTypeProps {
  userType: "agent" | "client" | "talent" | null;
  setUserType: (type: "agent" | "client" | "talent" | null) => void;
  onContinue: () => void;
}

const userTypeOptions: DropdownOption[] = [
  { label: "Client", value: "client" },
  { label: "Talent", value: "talent" },
  { label: "Agency", value: "agent" },
];

export function SignupStepUserType({ userType, setUserType, onContinue }: SignupStepUserTypeProps) {
  return (
    <>
      <div className="flex flex-col items-center max-w-md mx-auto">
        <Dropdown
          options={userTypeOptions}
          value={userType}
          onChange={val => setUserType(val as "agent" | "client" | "talent")}
          placeholder="I’m a..."
          className="mb-6"
        />
        <button
          className="w-full py-3 px-8 bg-black text-white uppercase font-semibold tracking-wide rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!userType || userType === "client"}
          onClick={onContinue}
        >
          Continue
        </button>
        {userType == "client" && (
          <p className="text-center text-base font-medium text-gray-600 bg-gray-50 rounded-md px-4 py-3 my-8 shadow-sm border border-gray-200">
            Client signup is coming soon.
          </p>
        )}
      </div>
    </>
  );
} 