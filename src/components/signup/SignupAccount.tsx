"use client";

import React from "react";
import { CreativeRole, FormField } from "./SignupFlow";
import { Dropdown, DropdownOption } from "../ui/Dropdown";
import { SignupStepQuestions } from "./SignupStepQuestions";
import { GoogleIcon } from "../ui/GoogleIcon";
import { FacebookIcon } from "../ui/FacebookIcon";
import { AppleIcon } from "../ui/AppleIcon";
import { Loader } from "../ui/Loader";

interface SignupAccountProps {
  basicDetails: Record<string, string | string[] | File[] | null>;
  formData: Record<string, string | string[] | File[] | null>;
  fields: FormField[];
  isSubmitting: boolean;
  handleBasicDetailsInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBasicDetailsDropdownChange?: (name: string, value: string | string[]) => void;
  handleFormDataInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFormDataFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function SignupAccount({ 
  basicDetails, 
  formData, 
  fields, 
  isSubmitting,
  handleBasicDetailsInputChange, 
  handleBasicDetailsDropdownChange, 
  handleFormDataInputChange, 
  handleFormDataFileChange, 
  onSubmit
}: SignupAccountProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Helper for Dropdown change
  const onDropdownChange = (name: string, value: string | string[]) => {
    if (handleBasicDetailsDropdownChange) {
      handleBasicDetailsDropdownChange(name, value);
    }
  };

  return (
    <div className="w-full min-h-0">
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
                  value={basicDetails[field.name] as string || ""}
                  onChange={handleBasicDetailsInputChange}
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
                  value={basicDetails[field.name] as string | string[] || null}
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
                  value={basicDetails[field.name] as string || ""}
                  onChange={handleBasicDetailsInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              )}
            </div>
          ))}
        </div>
        {
          basicDetails.selectRoles && (
            <SignupStepQuestions
              selectedRoles={basicDetails.selectRoles as CreativeRole[]}
              handleInputChange={handleFormDataInputChange}
              handleFileChange={handleFormDataFileChange}
              formData={formData}
            />
          )
        }
        <div className="flex justify-center pt-6">
          <button 
            type="submit" 
            className="w-64 py-3 bg-black text-white text-xl font-bold rounded-lg uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader size="sm" className="text-white" />}
            Submit
          </button>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
        <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          <GoogleIcon className="h-6 w-6" />
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          <FacebookIcon className="h-6 w-6" />
          Continue with Facebook
        </button>
        <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          <AppleIcon className="h-6 w-6" />
          Continue with Apple
        </button>
      </div>
    </div>
  );
} 