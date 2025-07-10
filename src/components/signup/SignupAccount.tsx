"use client";

import React from "react";
import { FormField } from "./SignupFlow";
import { Dropdown, DropdownOption } from "../ui/Dropdown";

interface SignupAccountProps {
  formData: Record<string, string | string[] | File[] | null>;
  fields: FormField[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDropdownChange?: (name: string, value: string | string[]) => void;
  onContinue: () => void;
}

export default function SignupAccount({ formData, fields, handleInputChange, handleDropdownChange, onContinue }: SignupAccountProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue();
  };

  // Helper for Dropdown change
  const onDropdownChange = (name: string, value: string | string[]) => {
    if (handleDropdownChange) {
      handleDropdownChange(name, value);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="relative w-9/12 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fields.map((field: FormField) => (
              <div key={field.name} className="flex flex-col">
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" htmlFor={field.name}>
                  {field.label}
                  {field.isOptional && <span className="text-gray-400 ml-1">(Optional)</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] as string || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                ) : field.type === "select" ? (
                  <Dropdown
                    options={
                      field.options?.map(opt => 
                        typeof opt === 'string' 
                          ? { label: opt, value: opt }
                          : opt
                      ) as DropdownOption[]
                    }
                    value={formData[field.name] as string | string[] || null}
                    onChange={val => onDropdownChange(field.name, val)}
                    placeholder={field.placeholder}
                    multiselect={field.multiselect}
                    maxSelections={field.maxSelections}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] as string || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                )}
              </div>
            ))}
          </div>
         <div className="flex justify-center">
         <button type="submit" className="w-96 py-4 bg-black text-white text-xl font-bold rounded-lg uppercase tracking-wide mt-4">Continue</button>
         </div>
        </form>
        <div className="text-center mt-8">
          <span className="text-base">Already have an account? <a href="#" className="text-blue-600 underline">Log in</a></span>
        </div>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
            <img src="/google.svg" alt="Google" className="h-6 w-6" />
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
            <img src="/facebook.svg" alt="Facebook" className="h-6 w-6" />
            Continue with Facebook
          </button>
          <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
            <img src="/apple.svg" alt="Apple" className="h-6 w-6" />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
} 