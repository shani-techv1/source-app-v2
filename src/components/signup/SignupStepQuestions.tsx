'use client';

import React, { useEffect, useState, Suspense, useRef } from "react";
import { FormField, CreativeRole } from "./SignupFlow";
import { cn } from "@/lib/utils";
import { getRoleFieldsById } from "@/app/actions/submit-form";

interface SignupStepQuestionsProps {
  selectedRoles: CreativeRole[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: Record<string, string | string[] | File[] | null>;
}

const FormContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-4 w-full", className)}>{children}</div>
);

// Loading component for individual role sections
const RoleSectionSkeleton = () => (
  <div className="pb-8 animate-pulse">
    <div className="mb-6">
      <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
    </div>
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded-lg border border-gray-200"></div>
        </div>
      ))}
    </div>
  </div>
);

// Individual role field component for better streaming
const RoleFieldComponent = React.lazy(() =>
  Promise.resolve({
    default: ({
      fields,
      handleInputChange,
      handleFileChange,
      formData
    }: {
      fields: FormField[];
      handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
      handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      formData: Record<string, string | string[] | File[] | null>;
    }) => (
      <div className="space-y-6">
        {fields.map((field, fieldIndex) => (
          <FormContainer key={field.name + "-" + fieldIndex}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 uppercase tracking-wide"
            >
              {field.field_label} {field.isOptional && <span className="text-gray-400">(Optional)</span>}
            </label>
            {field.field_type === "textarea" ? (
              <textarea
                id={`form_field_${field.id}`}
                name={`form_field_${field.id}`}
                placeholder={field.field_placeholder}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
              />
            ) : field.field_type === "file" ? (
              <div className="mt-1">
                <label htmlFor={`form_field_${field.id}`} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">{field.field_placeholder}</p>
                  </div>
                  {formData[`form_field_${field.id}`] && Array.isArray(formData[`form_field_${field.id}`]) && (
                    <p className="text-xs text-gray-500">{formData?.[`form_field_${field.id}`]?.length} files uploaded</p>
                  )}
                  {formData[`form_field_${field.id}`] && !Array.isArray(formData[`form_field_${field.id}`]) && (
                    <p className="text-xs text-gray-500">{formData?.[`form_field_${field.id}`] as string}</p>
                  )}
                  <input
                    id={`form_field_${field.id}`}
                    name={`form_field_${field.id}`}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            ) : field.field_type === "select" ? (
              <>
                {/* {console.log("field.field_options", field)} */}
                <select
                  id={`form_field_${field.id}`}
                  name={`form_field_${field.id}`}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                >
                  {(field.field_options as any[])?.map(option => (
                    <option
                      key={typeof option === 'string' ? option : option.value}
                      value={typeof option === 'string' ? option : option.value}
                      disabled={typeof option === 'object' && option.disabled}
                    >
                      {typeof option === 'string' ? option : option.label}
                    </option>
                  ))}
                </select>
              </>
            ) : field.field_type === "radio" ? (
              <>
                <div className="flex flex-col space-y-2">
                  {(field.field_options as any[])?.map(option => (
                    <label key={typeof option === 'string' ? option : option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`form_field_${field.id}_${typeof option === 'string' ? option : option.value}`}
                        name={`form_field_${field.id}`}
                        value={typeof option === 'string' ? option : option.value}
                        checked={formData[`form_field_${field.id}`] === (typeof option === 'string' ? option : option.value)}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        {typeof option === 'string' ? option : option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            ) : field.field_type === "checkbox" ? (
              <>
                <div className="flex flex-col space-y-2">
                  {(field.field_options as any[])?.map((option, index) => (
                    <label key={typeof option === 'string' ? option : option.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`form_field_${field.id}_${typeof option === 'string' ? option : option.value}`}
                        name={`form_field_${field.id}_${typeof option === 'string' ? option : option.value}`}
                        value={typeof option === 'string' ? option : option.value}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded text-black focus:ring-black border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        {typeof option === 'string' ? option : option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            ) : field.field_type === "group" ? (
              <>
                {field?.fields?.map(subField => (
                  <div key={`form_field_${subField.id}`} className="flex flex-col space-y-2">
                    <label
                      htmlFor={`form_field_${subField.id}`}
                      className="block text-sm font-medium text-gray-700 uppercase tracking-wide"
                    >
                      {subField.field_label} {subField.isOptional && <span className="text-gray-400">(Optional)</span>}
                    </label>
                    {subField.field_type === "textarea" ? (
                      <textarea
                        id={`form_field_${subField.id}`}
                        name={`form_field_${subField.id}`}
                        placeholder={subField.field_placeholder}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                      />
                    ) : subField.field_type === "file" ? (
                      <div className="mt-1">
                        <label htmlFor={`form_field_${subField.id}`} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">{subField.field_placeholder}</p>
                          </div>
                          {formData[`form_field_${subField.id}`] && Array.isArray(formData[`form_field_${subField.id}`]) && (
                            <p className="text-xs text-gray-500">{formData?.[`form_field_${subField.id}`]?.length} files uploaded</p>
                          )}
                          {formData[`form_field_${subField.id}`] && !Array.isArray(formData[`form_field_${subField.id}`]) && (
                            <p className="text-xs text-gray-500">{formData?.[`form_field_${field.id}`] as string}</p>
                          )}
                          <input
                            id={`form_field_${subField.id}`}
                            name={`form_field_${subField.id}`}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    ) : subField.field_type === "select" ? (
                      <select
                        id={`form_field_${subField.id}`}
                        name={`form_field_${subField.id}`}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                      >
                        {subField.options?.map(option => (
                          <option
                            key={typeof option === 'string' ? option : option.value}
                            value={typeof option === 'string' ? option : option.value}
                            disabled={typeof option === 'object' && option.disabled}
                          >
                            {typeof option === 'string' ? option : option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`form_field_${subField.id}`}
                        name={`form_field_${subField.id}`}
                        type={subField.field_type}
                        placeholder={subField.field_placeholder}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                      />
                    )}
                  </div>
                ))}
              </>
            ) : (
              <input
                id={`form_field_${field.id}`}
                name={`form_field_${field.id}`}
                type={field.field_type}
                placeholder={field.field_placeholder}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
              />
            )}
          </FormContainer>
        ))}
      </div>
    )
  })
);

export function SignupStepQuestions({
  selectedRoles,
  handleInputChange,
  handleFileChange,
  formData,
}: SignupStepQuestionsProps) {

  console.log("formData", formData);

  const [allFieldsByRole, setAllFieldsByRole] = useState<Record<string, FormField[]>>({});
  const [loadedRoles, setLoadedRoles] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get role ID mapping
  const getRoleId = (role: CreativeRole) => {
    const rolesMap = {
      "PHOTOGRAPHER": 1,
      "VIDEOGRAPHER": 2,
      "VEHICLE OWNER": 3
    } as const;
    return rolesMap[role as keyof typeof rolesMap] || 0;
  };

  // Stream fields for each role as they load
  const loadRoleFields = async (role: string) => {
    const roleId = getRoleId(role);
    if (roleId > 0 && !loadedRoles.has(role)) {
      try {
        const fields = await getRoleFieldsById(roleId);
        setAllFieldsByRole(prev => ({
          ...prev,
          [role]: fields
        }));
        setLoadedRoles(prev => new Set([...prev, role]));
      } catch (error) {
        console.error(`Error fetching fields for ${role}:`, error);
        setAllFieldsByRole(prev => ({
          ...prev,
          [role]: []
        }));
        setLoadedRoles(prev => new Set([...prev, role]));
      }
    }
  };

  // Start loading all roles immediately
  useEffect(() => {
    if (selectedRoles.length > 0) {
      // Load all roles in parallel
      selectedRoles.forEach(role => loadRoleFields(role));
    }
  }, [selectedRoles]);

  if (!selectedRoles.length) return null;

  return (
    <>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        className="space-y-6"
      >
        {selectedRoles.map((role, roleIndex) => (
          <div
            key={role + "" + roleIndex}
            className="pb-8"
            data-role-section
          >
            <div className="mb-6">
              <h3 className="text-xs font-semibold mb-2 uppercase tracking-wide text-gray-700">{role}</h3>
            </div>

            <Suspense fallback={<RoleSectionSkeleton />}>
              {loadedRoles.has(role) && allFieldsByRole[role] ? (
                <RoleFieldComponent
                  fields={allFieldsByRole[role]}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  formData={formData}
                />
              ) : (
                <RoleSectionSkeleton />
              )}
            </Suspense>
          </div>
        ))}

        <div className="pt-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              required
            />
            <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
              I have read and accept the{" "}
              <a href="#" className="underline font-semibold text-black">Privacy Policy</a>,{" "}
              <a href="#" className="underline font-semibold text-black">Licensing Agreement</a> and all{" "}
              <a href="#" className="underline font-semibold text-black">Terms and Conditions</a>
            </label>
          </div>
        </div>
      </div>
    </>
  );
} 