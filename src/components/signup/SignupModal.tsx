"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { creativeRoles, FormField, type CreativeRole } from "@/components/signup/SignupFlow";
import { cn } from "@/lib/utils";
import { SignupStepUserType } from "./SignupStepUserType";
import { SignupStepQuestions } from "./SignupStepQuestions";
import SignupAccount from "./SignupAccount";
import { getRoleFieldsById } from "@/app/actions/submit-form";

type FormData = Record<string, string | string[] | File[] | null>;

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const basicDetailsFields: FormField[] = [
  {
    name: 'selectRoles',
    label: 'SELECT ALL THAT APPLIES',
    type: 'select',
    placeholder: 'Select',
    options: creativeRoles.map(role => ({
      label: role,
      value: role,
      disabled: role !== 'PHOTOGRAPHER' && role !== 'VIDEOGRAPHER'
    })),
    multiselect: true,
    maxSelections: 3
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Your first name"
  },
  {
    name: "lastName",
    label: "Surname",
    type: "text",
    placeholder: "Your surname"
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Your email address"
  },
  {
    name: "confirmEmail",
    label: "Confirm Email",
    type: "email",
    placeholder: "Re-enter your email address"
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "Your contact number"
  },
    {
    name: "accountPassword",
    label: "Account Password",
    type: "password",
    placeholder: "Create a secure password"
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Street address, city, etc."
  },
  {
    name: "zipCode",
    label: "ZIP / Post Code",
    type: "text",
    placeholder: "ZIP or postal code"
  },
    {
    name: "gender",
    label: "Gender",
    type: "select",
    placeholder: "Select your gender",
    options: ["Male", "Female", "Other", "Prefer not to say"]
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    placeholder: "Select your birth date"
  },

  {
    name: "mainLocation",
    label: "Main Location",
    type: "text",
    placeholder: "City or area you work in"
  },
]


const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" as const }
  }
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" as const }
  }
};

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [step, setStep] = useState<"userType" | "roleSelection" | "questions"|"success">("userType");
  const [userType, setUserType] = useState<"agent" | "client" | "talent" | null>(null);
  const [basicDetails, setBasicDetails] = useState<FormData>({});
  const [formData, setFormData] = useState<FormData>({});
  const [currentRole, setCurrentRole] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleInputChange = (setter: (value: React.SetStateAction<FormData>) => void) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (setter: (value: React.SetStateAction<FormData>) => void) => 
    (name: string, value: string | string[]) => {
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (setter: (value: React.SetStateAction<FormData>) => void) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setter((prev) => ({ ...prev, [e.target.name]: files }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const basicDetailsPayload = {
      firstName: basicDetails.firstName,
      lastName: basicDetails.lastName,
      email: basicDetails.email,
      phoneNumber: basicDetails.phoneNumber,
      accountPassword: basicDetails.accountPassword,
      address: basicDetails.address,
      zipCode: basicDetails.zipCode,
      gender: basicDetails.gender,
      dateOfBirth: basicDetails.dob,
      main_location: basicDetails.mainLocation,
      role_ids: (basicDetails.selectRoles as CreativeRole[])?.map((role: CreativeRole) => getRoleId(role)),
      "instagram_account": "@johndoe",
      "average_day_rate_currency": "$1000",
      "interests": "Music, Coding",
      "bio": "Experienced dev",
      "clients": "Apple, Google",
    }

    const formPayload = {
      basicDetails: basicDetailsPayload,
      formData
    }

    // const result = await submitForm(formPayload);

    // console.log("result", result);

    const form = new FormData();

    Object.entries(formPayload.formData).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          // Handle arrays (string[] or File[])
          value.forEach((item, index) => {
            if (typeof item === 'string') {
              form.append(`${key}[${index}]`, item);
            } else if (item instanceof File) {
              form.append(`${key}[${index}]`, item);
            }
          });
        } else if (typeof value === 'string') {
          form.append(key, value);
        } else if (typeof value === 'object' && value !== null && 'name' in value) {
          // Handle File objects
          form.append(key, value as Blob);
        }
      }
    });

    form.append("email", formPayload.basicDetails.email as string);

    
    const basicDetailsResponse = await fetch(`http://13.61.49.212:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formPayload.basicDetails)
    })

    const formDetailsResponse = await fetch(`http://13.61.49.212:3000/api/v1/role-fields/submit`, {
      method: "POST",
      body: form
    })

    const basicDetailsData = await basicDetailsResponse.json();

    const formDataResponse = await formDetailsResponse.json();

    console.log("basicDetailsData", basicDetailsData);
    console.log("formDataResponse", formDataResponse);

    
    if (basicDetailsResponse.ok && formDetailsResponse.ok) {
      setStep("success");
    } else {
      alert("An error occurred. Please try again later.");
      setStep("userType");
      setFormData({});
      setCurrentRole(null);
      onClose();
    }
    setIsSubmitting(false);
  };

  

  const getRoleId = (role: CreativeRole) => {
    const rolesMap = {
      "PHOTOGRAPHER": 1,
      "VIDEOGRAPHER": 2,
      "VEHICLE OWNER": 3
    } as const;
    return rolesMap[role as keyof typeof rolesMap] || 0;
  }

  const getRoleName = (roleId: number) => {
    const rolesMap = {
      1: "PHOTOGRAPHER",
      2: "VIDEOGRAPHER",
      3: "VEHICLE OWNER"
    } as const;
    return rolesMap[roleId as keyof typeof rolesMap] || "";
  }

  const getFieldsForCurrentRole = async () => {

    if (!currentRole) return [];

    const roleFields = await getRoleFieldsById(currentRole);
    return roleFields;
  };

  const handleNextRole = () => {
    const currentIndex = (basicDetails.selectRoles as CreativeRole[])?.indexOf(getRoleName(currentRole!));
    if (currentIndex < (basicDetails.selectRoles as CreativeRole[]).length - 1) {
      setCurrentRole(getRoleId((basicDetails.selectRoles as CreativeRole[])[currentIndex + 1]));
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (step === "roleSelection") {
      setStep("userType");
    } else if (step === "questions") {
      setStep("roleSelection");
    }
  };

  const handleClose = () => {
    // Reset form state when closing
    setStep("userType");
    setFormData({});
    setCurrentRole(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn("bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", step === "userType" ? "max-w-2xl" : "max-w-5xl")}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-4 rounded-t-2xl z-50  ">
              <div className="flex items-center justify-between">
              {step !== "userType" && (
                    <button 
                      onClick={goBack}
                      className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Back to details
                    </button>
                  )}
                  <button 
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-auto"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
              </div>
              {
                step === "userType" && (<h1 className="text-3xl font-bold mb-6 text-center">Join As</h1>)
              }
              {
                ["roleSelection", "questions", "success"].includes(step) && (<h1 className="text-3xl font-bold text-center bg-white ">Create an account</h1>)
              }
            </div>
            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === "userType" && (
                  <SignupStepUserType
                    userType={userType}
                    setUserType={setUserType}
                    onContinue={() => {
                      if (userType === "client") return;
                      if (userType === "agent" || userType === "talent") setStep("roleSelection");
                    }}
                  />
                )}
                {step === "roleSelection" && (
                  <SignupAccount
                    formData={basicDetails}
                    handleInputChange={handleInputChange(setBasicDetails)}
                    handleDropdownChange={handleDropdownChange(setBasicDetails)}
                    fields={basicDetailsFields}
                    onContinue={() => {
                      const roleId = getRoleId(basicDetails.selectRoles?.[0] as CreativeRole);
                      setCurrentRole(roleId);
                      setStep("questions")
                    }}
                  />
                )}
                {step === "questions" && (
                  <SignupStepQuestions
                    currentRole={getRoleName(currentRole!)}
                    selectedRoles={basicDetails.selectRoles as CreativeRole[]}
                    setCurrentRole={(role: CreativeRole) => setCurrentRole(getRoleId(role))}
                    getFieldsForCurrentRole={getFieldsForCurrentRole}
                    handleInputChange={handleInputChange(setFormData)}
                    handleFileChange={handleFileChange(setFormData)}
                    handleNextRole={handleNextRole}
                    formData={formData}
                    isSubmitting={isSubmitting}
                  />
                )}
                {step === "success" && (
                   <div className="flex flex-col items-center text-center max-w-md mx-auto py-8">
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                       <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                     
                     <h1 className="text-2xl font-bold text-gray-900 mb-4">
                       Thank you for submitting your application!
                     </h1>
                     
                     <div className="space-y-4 text-gray-600 mb-8">
                       <p className="text-base leading-relaxed">
                         We&apos;re reviewing your information. You&apos;ll receive a confirmation email
                         as soon as your profile is approved and goes live.
                       </p>
                       <p className="text-base leading-relaxed">
                         In the meantime, we recommend visiting your account settings to
                         complete your profile. A more complete profile can help build trust
                         and increase visibility with potential clients.
                       </p>
                     </div>
                     
                     <div className="flex flex-col sm:flex-row gap-4 w-full">
                       <button
                         onClick={handleClose}
                         className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                       >
                         Close
                       </button>
                       <Link
                         href="/account"
                         className="flex-1 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                       >
                         Go to Account Settings
                       </Link>
                     </div>
                   </div>
                 )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 