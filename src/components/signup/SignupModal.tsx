"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { creativeRoles, finalPhotographerFields, finalVehiclesFields, finalVideographerFields, FormField, type CreativeRole } from "@/components/signup/SignupFlow";
import { cn } from "@/lib/utils";
import { SignupStepUserType } from "./SignupStepUserType";
import { SignupStepQuestions } from "./SignupStepQuestions";
import SignupAccount from "./SignupAccount";
import { getRoleFieldsById, submitForm } from "@/app/actions/submit-form";

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
    options: creativeRoles,
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
    name: "password",
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
  const [step, setStep] = useState<"userType" | "roleSelection" | "questions">("userType");
  const [userType, setUserType] = useState<"agent" | "client" | "talent" | null>(null);
  const [basicDetails, setBasicDetails] = useState<FormData>({});
  const [formData, setFormData] = useState<FormData>({});
  const [currentRole, setCurrentRole] = useState<CreativeRole | null>(null);


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
    
    const formPayload = {
      basicDetails,
      formData
    }

    const result = await submitForm(formPayload);
    
    if (result?.success) {
      alert(result.message);
      handleClose();
    } else if (result?.error) {
      alert(result.error);
    } else {
      alert("An error occurred. Please try again later.");
    }
  };

  const getFieldsForCurrentRole = async () => {

    if (!currentRole) return [];

    const rolesMap = {
      "PHOTOGRAPHER": 1,
      "VIDEOGRAPHER": 2,
      "VEHICLE OWNER": 3
    } as const;

    const roleFields = await getRoleFieldsById(currentRole in rolesMap ? rolesMap[currentRole as keyof typeof rolesMap] : 0);
    return roleFields;
  };

  const handleNextRole = () => {
    const currentIndex = (basicDetails.selectRoles as CreativeRole[])?.indexOf(currentRole!);
    if (currentIndex < (basicDetails.selectRoles as CreativeRole[]).length - 1) {
      setCurrentRole((basicDetails.selectRoles as CreativeRole[])[currentIndex + 1]);
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
            className={cn("bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", step === "userType" ? "max-w-2xl" : "max-w-7xl")}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
              {step !== "userType" && (
                    <button 
                      onClick={goBack}
                      className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Back
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
                ["roleSelection", "questions"].includes(step) && (<h1 className="text-3xl font-bold text-center">Create an account</h1>)
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
                      setCurrentRole(basicDetails.selectRoles?.[0] as CreativeRole);
                      setStep("questions")
                    }}
                  />
                )}
                {step === "questions" && (
                  <SignupStepQuestions
                    currentRole={currentRole}
                    selectedRoles={basicDetails.selectRoles as CreativeRole[]}
                    setCurrentRole={setCurrentRole}
                    getFieldsForCurrentRole={getFieldsForCurrentRole}
                    handleInputChange={handleInputChange(setFormData)}
                    handleFileChange={handleFileChange(setFormData)}
                    handleNextRole={handleNextRole}
                    formData={formData}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 