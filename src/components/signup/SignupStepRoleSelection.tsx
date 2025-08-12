import React from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/hooks/lib/utils";
import { CreativeRole } from "./SignupFlow";

interface SignupStepRoleSelectionProps {
  selectedRoles: CreativeRole[];
  setSelectedRoles: (roles: CreativeRole[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleRoleConfirm: () => void;
  filteredRoles: CreativeRole[];
}

export function SignupStepRoleSelection({
  selectedRoles,
  setSelectedRoles,
  searchTerm,
  setSearchTerm,
  handleRoleConfirm,
  filteredRoles,
}: SignupStepRoleSelectionProps) {
  const handleRoleToggle = (role: CreativeRole) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      const updatedRoles = [...selectedRoles, role];
      if (!updatedRoles.includes("Basic Details")) {
        updatedRoles.unshift("Basic Details");
      }
      setSelectedRoles(updatedRoles);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">I&apos;m a...</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md mx-auto">Check what applies to you</p>
      {selectedRoles.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 max-w-lg mx-auto">
          {selectedRoles.map(role => (
            role !== "Basic Details" && (
              <div
                key={role}
                className="inline-flex items-center rounded-full py-1.5 px-3 bg-gray-100 gap-1 border border-gray-200"
              >
                <span className="text-sm font-medium">{role}</span>
                <button
                  onClick={() => handleRoleToggle(role)}
                  className="rounded-full w-5 h-5 inline-flex items-center justify-center hover:bg-gray-200"
                  aria-label={`Remove ${role}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )
          ))}
        </div>
      )}
      <div className="relative mb-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search roles..."
          className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded-xl mb-6 max-w-lg mx-auto">
        {filteredRoles.map(role => (
          <div
            key={role}
            className={`border-b border-gray-200 last:border-b-0 ${
              role !== "PHOTOGRAPHER" && role !== "VIDEOGRAPHER" && role !== "VEHICLE OWNER" ? "opacity-50" : ""
            }`}
          >
            <button
              onClick={() => handleRoleToggle(role)}
              className={`w-full text-left py-3.5 px-4 flex items-center justify-between ${
                selectedRoles.includes(role) ? "bg-black text-white" : "hover:bg-gray-50"
              }`}
              disabled={role !== "PHOTOGRAPHER" && role !== "VIDEOGRAPHER" && role !== "VEHICLE OWNER"}
            >
              <span className="text-base font-medium">{role}</span>
              {selectedRoles.includes(role) && <Check className="h-5 w-5" />}
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleRoleConfirm}
          disabled={selectedRoles.length === 0}
          className={cn(
            "py-3 px-8 bg-black text-white uppercase font-semibold tracking-wide rounded-lg",
            selectedRoles.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800 transition-colors"
          )}
        >
          Continue
        </button>
      </div>
    </>
  );
} 