"use client";

import React from "react";
import { FormField } from "./SignupFlow";

interface SignupStepBasicDetailsProps {
  basicDetails: Record<string, string | string[] | File[] | null>;
  fields: FormField[];
  handleBasicDetailsInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
}

export function SignupStepBasicDetails({ 
  basicDetails, 
  fields, 
  handleBasicDetailsInputChange, 
  onSubmit 
}: SignupStepBasicDetailsProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="min-h-0 md:flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-stretch">
          {fields.map((field: FormField) => (
            <div key={field.name} className="flex flex-col">
              <label className="block text-xs mb-2 uppercase tracking-wide" htmlFor={field.name}>
                {field.label}
                {field.isOptional && <span className="text-gray-400 ml-1">(Optional)</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={basicDetails[field.name] as string || ""}
                  onChange={handleBasicDetailsInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  rows={3}
                />
              ) :  (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={basicDetails[field.name] as string || ""}
                  onChange={handleBasicDetailsInputChange}
                  className="w-[300px] rounded-lg border border-gray-300 px-4 py-3"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-6">
          <button 
            type="submit" 
            className="w-64 py-3 bg-black text-white text-xl font-bold rounded-lg uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
} 