'use server';

// Use a more compatible approach for server actions
const API_BASE = 'http://13.61.49.212:3000';

export interface FormData {
  [key: string]: string | string[] | number | number[] | File[] | null;
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
  try {
    const response = await fetch(`${API_BASE}/api/v1/roles`);
    if (!response.ok) {
      throw new Error(`Failed to fetch roles: ${response.status}`);
    }
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

export async function getRoleFieldsById(roleId: number): Promise<FormField[]> {
  try {
    const response = await fetch(`${API_BASE}/api/v1/role-fields/role/${roleId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch role fields: ${response.status}`);
    }
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching role fields:', error);
    return [];
  }
}

export async function submitForm(formData: SubmitFormData) {
  try {
    // // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !formData.basicDetails[field]);
    
    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      };
    }

    // // Clean and prepare the basic details data for submission
    // const cleanedBasicDetails = Object.entries(formData.basicDetails).reduce((acc, [key, value]) => {
    //   // Convert arrays to comma-separated strings for Google Sheets
    //   if (Array.isArray(value)) {
    //     acc[key] = value.join(', ');
    //   } else if (value !== null && value !== undefined) {
    //     acc[key] = value;
    //   }
    //   return acc;
    // }, {} as Record<string, string>);

    // // Add timestamp
    // cleanedBasicDetails.timestamp = new Date().toISOString();

    // // formData.formData is an object with the form field id as the key and the value as the value, this is submitted form-data in API

    const form = new FormData();

    Object.entries(formData.formData).forEach(([key, value]) => {
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

    form.append("email", formData.basicDetails.email as string);

    
    const basicDetailsResponse = await fetch(`http://13.61.49.212:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData.basicDetails)
    })

    const formDetailsResponse = await fetch(`http://13.61.49.212:3000/api/v1/role-fields/submit`, {
      method: "POST",
      body: form
    })

    const basicDetailsData = await basicDetailsResponse.json();

    const formDataResponse = await formDetailsResponse.json();


    // Check both responses
    if (!basicDetailsResponse.ok) {
      const errors = [];
      errors.push(`Basic details: ${basicDetailsResponse.status}`);
      return {
        success: false,
        error: `Failed to submit: ${errors.join(', ')}`
      };
    }

    if (!formDetailsResponse.ok) {
      const errors = [];
      errors.push(`Form: ${formDetailsResponse.status}`);
      return {
        success: false,
        error: `Failed to submit: ${errors.join(', ')}`
      };
    }

    return {
      success: true,
      basicDetailsData,
      formDataResponse,
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