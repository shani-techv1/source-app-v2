import React, { useEffect, useState } from "react";
import { FormField, CreativeRole } from "./SignupFlow";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SignupStepQuestionsProps {
  currentRole: CreativeRole | null;
  selectedRoles: CreativeRole[];
  setCurrentRole: (role: CreativeRole) => void;
  getFieldsForCurrentRole: () => Promise<FormField[]>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextRole: () => void;
  formData: Record<string, string | string[] | File[] | null>;
  isSubmitting: boolean;
}

const FormContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-4 w-full", className)}>{children}</div>
);

export function SignupStepQuestions({
  currentRole,
  selectedRoles,
  setCurrentRole,
  getFieldsForCurrentRole,
  handleInputChange,
  handleFileChange,
  handleNextRole,
  formData,
  isSubmitting,
}: SignupStepQuestionsProps) {

  console.log("formData", formData);

  const [fields, setFields] = useState<FormField[]>([]);

  useEffect(() => {
    getFieldsForCurrentRole().then(setFields);
  }, [getFieldsForCurrentRole]);

  if (!currentRole && !fields.length) return null;
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex mb-6 border-b border-gray-200 overflow-x-auto">
        {selectedRoles.map(role => (
          <button
            key={role}
            className={`py-3 px-5 font-medium whitespace-nowrap ${
              currentRole === role ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setCurrentRole(role)}
          >
            {role}
          </button>
        ))}
      </div>
      <form onSubmit={e => { e.preventDefault(); handleNextRole(); }}>
        <div className="space-y-6">
          {fields.map(field => (
            <FormContainer key={field.name}>
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
                <select
                  id={`form_field_${field.id}`}
                  name={`form_field_${field.id}`}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                >
                  {field.options?.map(option => (
                    <option
                    key={typeof option === 'string' ? option : option.value}
                    value={typeof option === 'string' ? option : option.value}
                    disabled={typeof option === 'object' && option.disabled}
                  >
                    {typeof option === 'string' ? option : option.label}
                  </option>
                  ))}
                </select>
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
          <div className="pt-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
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
          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center justify-between gap-2 py-3 px-8 bg-black text-white uppercase font-semibold tracking-wide rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isSubmitting && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {currentRole === selectedRoles[selectedRoles.length - 1] ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 