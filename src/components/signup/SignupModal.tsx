"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { creativeRoles, FormField, type CreativeRole } from "@/components/signup/SignupFlow";
import { cn } from "@/lib/utils";
import { SignupStepUserType } from "./SignupStepUserType";
import { SignupStepBasicDetails } from "./SignupStepBasicDetails";
import SignupAccount from "./SignupAccount";
import { SignupSuccessStep } from "./SignupSuccessStep";
import { useToast } from "@/components/ui/toast";


type FormData = Record<string, string | string[] | File[] | null>;

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const basicDetailsFirstFields: FormField[] = [
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
]

const ROLES = {
  PHOTOGRAPHER: "PHOTOGRAPHER",
  VIDEOGRAPHER: "VIDEOGRAPHER",
  VEHICLE_OWNER: "VEHICLE OWNER"
}

const enableRoles = [ROLES.PHOTOGRAPHER, ROLES.VIDEOGRAPHER, ROLES.VEHICLE_OWNER];

const basicDetailsSecondFields: FormField[] = [
  {
    name: 'selectRoles',
    label: 'SELECT ALL THAT APPLIES',
    type: 'select',
    placeholder: 'Select',
    options: creativeRoles.map(role => ({
      label: role,
      value: role,
      disabled: !enableRoles.includes(role)
    })),
    multiselect: true,
    maxSelections: 3
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
  const [step, setStep] = useState<"userType" | "basicDetails" | "roleSelection" | "success">("userType");
  const [userType, setUserType] = useState<"agent" | "client" | "talent" | null>(null);
  const [basicDetails, setBasicDetails] = useState<FormData>({});
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();


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
      setFormData({});
    } else {
 
      addToast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
        duration: 5000
      });
      setStep("userType");
      setFormData({});
      onClose();
    }
    setIsSubmitting(false);
  };

  

  const getRoleId = (role: CreativeRole) => {
    const rolesMap = {
      [ROLES.PHOTOGRAPHER]: 1,
      [ROLES.VIDEOGRAPHER]: 2,
      [ROLES.VEHICLE_OWNER]: 3
    } as const;
    return rolesMap[role as keyof typeof rolesMap] || 0;
  }

  // const getRoleName = (roleId: number) => {
  //   const rolesMap = {
  //     1: "PHOTOGRAPHER",
  //     2: "VIDEOGRAPHER",
  //     3: "VEHICLE OWNER"
  //   } as const;
  //   return rolesMap[roleId as keyof typeof rolesMap] || "";
  // }

  const goBack = () => {
    if (step === "basicDetails") {
      setStep("userType");
    } else if (step === "roleSelection") {
      setStep("basicDetails");
    }
  };

  const handleClose = () => {
    // Reset form state when closing
    setStep("userType");
    setFormData({});
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
            className={cn("bg-white rounded-sm shadow-2xl w-full max-w-2xl flex flex-col gap-6 max-h-[90vh] box-border p-6 pt-12 md:p-12", step === "userType" ? "max-w-lg" : "max-w-5xl")}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-white rounded-t-2xl z-50 relative">
              <div className="flex items-center justify-between absolute w-full -top-8 left-1/2 -translate-x-1/2">
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
                step === "userType" && (<h1 className="text-3xl font-bold text-center">Join As</h1>)
              }
              {
                ["basicDetails", "roleSelection", "success"].includes(step) && (<h1 className="text-3xl font-bold text-center bg-white ">Create an account</h1>)
              }
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === "userType" && (
                  <SignupStepUserType
                    userType={userType}
                    setUserType={setUserType}
                    onContinue={() => {
                      if (userType === "client") return;
                      if (userType === "agent" || userType === "talent") setStep("basicDetails");
                    }}
                  />
                )}
                {
                  step === "basicDetails" && (
                    <SignupStepBasicDetails
                      basicDetails={basicDetails}
                      fields={basicDetailsFirstFields}
                      handleBasicDetailsInputChange={handleInputChange(setBasicDetails)}
                      onSubmit={() => setStep("roleSelection")}
                    />
                  )
                }
                {step === "roleSelection" && (
                  <SignupAccount
                    basicDetails={basicDetails}
                    formData={formData}
                    handleBasicDetailsInputChange={handleInputChange(setBasicDetails)}
                    handleBasicDetailsDropdownChange={handleDropdownChange(setBasicDetails)}
                    handleFormDataInputChange={handleInputChange(setFormData)}
                    handleFormDataFileChange={handleFileChange(setFormData)}
                    fields={basicDetailsSecondFields}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                  />
                )}
                {step === "success" && (
                  <SignupSuccessStep onClose={handleClose} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 