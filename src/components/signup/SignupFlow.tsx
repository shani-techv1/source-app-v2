  "use client";

  import React from "react";

  // Export creative roles for use in the signup page
  export type CreativeRole = string;
  export const creativeRoles = [
    "MODEL",
    "INFLUENCER",
    "ACTOR",
    "STYLIST",
    "HAIR STYLIST",
    "MAKEUP ARTIST",
    "PHOTOGRAPHER",
    "VIDEOGRAPHER",
    "ASSISTANT",
    "LIGHTING",
    "DIRECTOR",
    "COSTUME DESIGNER",
    "PRODUCER",
    "SOUND ENGINEER",
    "POST PRODUCTION",
    "WRITER",
    "FIT MODEL",
    "TALENT AGENT",
    "SET DESIGNER",
    "GRAPHIC DESIGNER",
    "VEHICLE OWNER",
    "EQUIPTMENT",
    "PROPS",
    "LOCATION (STUDIOS, HOUSES & OTHER)",
    "BRAND",
    "OTHER"
  ];

  interface APIFormField {
    id: number | string;
    role_id: number | string;
    field_label: string;
    field_type: string;
    field_options: string[] | null;
    field_placeholder: string;
    is_multiple: boolean;
    allowed_file_types: string;
    order: number | string;
  }


  // Make all fields of APIFormField optional
  export type OptionalAPIFormField = Partial<APIFormField>;

  // Use it to extend the FormField
  export interface FormField extends OptionalAPIFormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    isOptional?: boolean;
    options?: string[];
    fields?: FormField[];
    repeatable?: boolean;
    multiselect?: boolean;
    maxSelections?: number;
  }

  function extractCommonFields(...roles: FormField[][]): FormField[] {
    const fieldMap = new Map<string, number>();

    roles.forEach(fields => {
      const uniqueNames = new Set(fields.map(f => f.name));
      uniqueNames.forEach(name => {
        fieldMap.set(name, (fieldMap.get(name) || 0) + 1);
      });
    });

    const commonNames = Array.from(fieldMap.entries())
      .filter(([, count]) => count > 1)
      .map(([name]) => name);

    // Find and return the full field definition (first occurrence is enough)
    const allFields = roles.flat();
    const seen = new Set();
    return allFields.filter(f => commonNames.includes(f.name) && !seen.has(f.name) && seen.add(f.name));
  }

  function excludeFields(base: FormField[], exclude: FormField[]): FormField[] {
    const excludeNames = new Set(exclude.map(f => f.name));
    return base.filter(f => !excludeNames.has(f.name));
  }



  // Export photographer fields -
  export const photographerFields: FormField[] = [
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
    {
      name: "instagram",
      label: "Instagram Account",
      type: "text",
      placeholder: "@yourusername",
      isOptional: true
    },
    {
      name: "dayRate",
      label: "Average Day Rate – Currency",
      type: "text",
      placeholder: "e.g., $300, £250"
    },
    {
      name: "interests",
      label: "Interests",
      type: "textarea",
      placeholder: "Your photography interests or specialties",
      isOptional: true
    },
    {
      name: "bio",
      label: "Bio",
      type: "textarea",
      placeholder: "Tell us a bit about yourself and your experience",
      isOptional: true
    },
    {
      name: "clients",
      label: "Clients",
      type: "textarea",
      placeholder: "List some of your notable clients",
      isOptional: true
    },
    {
      name: "portfolio photos",
      label: "Portfolio Photos - Images Drop Box",
      type: "file",
      placeholder: "Submit minimum of 4 photos"
    }
  ];


  // Export videographer fields
  export const videographerFields: FormField[] = [
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
    {
      name: "instagram",
      label: "Instagram Account",
      type: "text",
      placeholder: "@yourusername",
      isOptional: true
    },
    {
      name: "dayRate",
      label: "Average Day Rate – Currency",
      type: "text",
      placeholder: "e.g., $300, £250"
    },
    {
      name: "interests",
      label: "Interests",
      type: "textarea",
      placeholder: "Your videography interests or specialties",
      isOptional: true
    },
    {
      name: "bio",
      label: "Bio",
      type: "textarea",
      placeholder: "Tell us a bit about yourself and your experience",
      isOptional: true
    },
    {
      name: "clients",
      label: "Clients",
      type: "textarea",
      placeholder: "List some of your notable clients",
      isOptional: true
    },
    {
      name: "reelLink",
      label: "Reel Link",
      type: "text",
      placeholder: "Link to your reel (Vimeo, YouTube, etc.)"
    },
    {
      name: "portfolio videos",
      label: "Portfolio - Video Drop Box",
      type: "file",
      placeholder: "Submit minimum of 4 videos"
    }
  ];


  // Export vehicles fields

  export const vehiclesFields: FormField[] = [

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
  
    // Vehicle/Brand details section - repeatable
    {
      name: "vehicles",
      label: "Vehicles",
      type: "group",
      placeholder: "Vehicle information",
      repeatable: true,
      fields: [
        {
          name: "type",
          label: "Type (Brand)",
          type: "text",
          placeholder: "e.g., Mercedes, Audi"
        },
        {
          name: "model",
          label: "Model",
          type: "text",
          placeholder: "e.g., A-Class, Q5"
        },
        {
          name: "transmission",
          label: "Transmission",
          type: "text",
          placeholder: "e.g., Automatic or Manual",
          isOptional: true
        },
        {
          name: "year",
          label: "Year",
          type: "number",
          placeholder: "e.g., 2022"
        },
        {
          name: "colour",
          label: "Colour",
          type: "text",
          placeholder: "e.g., Black, White"
        },
        {
          name: "canDrive",
          label: "Can it be driven?",
          type: "radio",
          placeholder: "Select an option",
          options: ["Yes", "No"]
        }
      ]
    },
    {
      name: "dayRate",
      label: "Average Day Rate – Currency",
      type: "text",
      placeholder: "e.g., $500, £400"
    },
    {
      name: "bio",
      label: "Bio",
      type: "textarea",
      placeholder: "Tell us a bit about your brand or offerings",
      isOptional: true
    },
    {
      name: "portfolio",
      label: "Photos - Images Drop Box",
      type: "file",
      placeholder: "Submit minimum of 4 photos"
    }
  ];

  // Combine all role fields
  const photographer = photographerFields;
  const videographer = videographerFields;
  const vehicles = vehiclesFields;

  // Get common fields
  export const basicDetailsFields = extractCommonFields(photographer, videographer, vehicles);


  // Remove shared fields from each role-specific form
  export const finalPhotographerFields = excludeFields(photographer, basicDetailsFields);
  export const finalVideographerFields = excludeFields(videographer, basicDetailsFields);
  export const finalVehiclesFields = excludeFields(vehicles, basicDetailsFields);

  interface SignupFlowProps {
  onOpenChange?: (open: boolean) => void;
}

export default function SignupFlow({ onOpenChange }: SignupFlowProps) {
  const handleClick = () => {
    if (onOpenChange) {
      onOpenChange(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group relative w-full md:w-auto max-w-[200px] cursor-pointer overflow-hidden rounded-full bg-black p-2 px-4 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
    >
      <div className="flex items-center justify-center text-center gap-2">
        <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
          JOIN US
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-primary-foreground opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
        <span className="text-white">JOIN US</span>
      </div>
    </button>
  );
} 