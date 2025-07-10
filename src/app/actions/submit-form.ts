'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://13.61.49.212:3000';

export interface FormData {
  [key: string]: string | string[] | File[] | null;
}

interface SubmitFormData {
  basicDetails: FormData;
  formData: FormData;
}

interface Role {
  id: number;
  name: string;
  // Add other properties as needed
}

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  isOptional?: boolean;
  options?: string[];
  // Add other properties as needed
}

export async function getRoles(): Promise<Role[]> {
  const response = await fetch(`${API_URL}/api/v1/roles`);
  const json = await response.json();
  return json.data;
}

export async function getRoleFieldsById(roleId: number): Promise<FormField[]> {
  const response = await fetch(`${API_URL}/api/v1/role-fields/role/${roleId}`);
  const json = await response.json();
  return json.data;
}

export async function submitForm(formData: SubmitFormData) {

  try {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !formData.basicDetails[field]);
    
    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      };
    }

    // Clean and prepare the basic details data for submission
    const cleanedBasicDetails = Object.entries(formData.basicDetails).reduce((acc, [key, value]) => {
      // Convert arrays to comma-separated strings for Google Sheets
      if (Array.isArray(value)) {
        acc[key] = value.join(', ');
      } else if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    // Add timestamp
    cleanedBasicDetails.timestamp = new Date().toISOString();

    // Submit basic details to your API
    const basicDetailsResponse = await fetch(`${API_URL}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cleanedBasicDetails)
    });

    if (!basicDetailsResponse.ok) {
      console.error('Basic Details API Error:', basicDetailsResponse.status);
      return {
        success: false,
        error: `Failed to submit basic details: ${basicDetailsResponse.status}`
      };
    }

    // Clean and prepare the role-specific form data
    const cleanedFormData = Object.entries(formData.formData).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.join(', ');
      } else if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    // Combine both datasets for Google Sheets
    const combinedData = {
      ...cleanedBasicDetails,
      ...cleanedFormData
    };

    // Submit to Google Sheets as backup
    const sheetsResponse = await fetch("https://api.sheetbest.com/sheets/fed5974d-ea39-40fd-8504-8118e38d5718", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(combinedData)
    });

    if (!sheetsResponse.ok) {
      console.error('Google Sheets API Error:', sheetsResponse.status);
      // Don't fail the entire submission if Google Sheets fails
      console.warn('Google Sheets backup failed, but basic details were submitted successfully');
    }

    return {
      success: true,
      message: "Thank you for submitting. Your profile is in review. We will email you if your application is successful / once it's public."
    };

  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      error: "An error occurred. Please check your network and try again."
    };
  }
} 