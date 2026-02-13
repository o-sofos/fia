# Form Component Template

This template creates a Fia form component with validation, error handling, and submission logic.

## Template

```typescript
import { form, div, input, button, label, p, $, $e, batch } from "fia";

/**
 * Form data interface
 */
interface {ComponentName}Data {
  field1: string;
  field2: string;
  // Add more fields as needed
}

/**
 * Form errors interface
 */
interface {ComponentName}Errors {
  field1: string;
  field2: string;
  // Match formData fields
}

/**
 * {ComponentName} - Form component with validation
 *
 * {Detailed description of the form's purpose}
 *
 * @example
 * ```typescript
 * {ComponentName}({
 *   onSubmit: (data) => console.log(data)
 * });
 * ```
 *
 * @param props - Component properties
 * @param props.initialData - Initial form values
 * @param props.onSubmit - Callback when form is successfully submitted
 * @param props.onCancel - Optional callback when form is cancelled
 * @returns {SmartElement<"form">} The form element
 */
export const {ComponentName} = (props: {
  initialData?: Partial<{ComponentName}Data>;
  onSubmit: (data: {ComponentName}Data) => void | Promise<void>;
  onCancel?: () => void;
}) => {
  // Form state (use store for object with property-level reactivity)
  const formData = $(
    {
      field1: props.initialData?.field1 ?? "",
      field2: props.initialData?.field2 ?? "",
    },
    "field1",
    "field2"
  );

  // Error state
  const errors = $(
    {
      field1: "",
      field2: "",
    },
    "field1",
    "field2"
  );

  // Submission state
  const isSubmitting = $(false);
  const submitError = $<string | null>(null);

  // Validation logic
  const validateField1 = (value: string): string => {
    if (!value.trim()) return "Field 1 is required";
    if (value.length < 3) return "Field 1 must be at least 3 characters";
    return "";
  };

  const validateField2 = (value: string): string => {
    if (!value.trim()) return "Field 2 is required";
    // Add custom validation logic
    return "";
  };

  const validateForm = (): boolean => {
    batch(() => {
      errors.field1 = validateField1(formData.field1);
      errors.field2 = validateField2(formData.field2);
    });

    return !errors.field1 && !errors.field2;
  };

  // Event handlers
  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!validateForm()) return;

    isSubmitting.value = true;
    submitError.value = null;

    try {
      await props.onSubmit({
        field1: formData.field1,
        field2: formData.field2,
      });
    } catch (error) {
      submitError.value =
        error instanceof Error ? error.message : "Submission failed";
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleCancel = () => {
    props.onCancel?.();
  };

  const handleReset = () => {
    batch(() => {
      formData.field1 = props.initialData?.field1 ?? "";
      formData.field2 = props.initialData?.field2 ?? "";
      errors.field1 = "";
      errors.field2 = "";
      submitError.value = null;
    });
  };

  // Real-time validation on blur
  const handleField1Blur = () => {
    errors.field1 = validateField1(formData.field1);
  };

  const handleField2Blur = () => {
    errors.field2 = validateField2(formData.field2);
  };

  // Render form
  return form({ class: "{component-name}-form", onsubmit: handleSubmit }, () => {
    // Field 1
    div({ class: "form-field" }, () => {
      label({ textContent: "Field 1", for: "field1" });
      input({
        id: "field1",
        type: "text",
        value: formData.field1,
        oninput: (e) => (formData.field1 = e.currentTarget.value),
        onblur: handleField1Blur,
        placeholder: "Enter field 1",
        class: $(() => (errors.field1 ? "input-error" : "")),
      });
      if (errors.field1) {
        p({ class: "error-message", textContent: errors.field1 });
      }
    });

    // Field 2
    div({ class: "form-field" }, () => {
      label({ textContent: "Field 2", for: "field2" });
      input({
        id: "field2",
        type: "text",
        value: formData.field2,
        oninput: (e) => (formData.field2 = e.currentTarget.value),
        onblur: handleField2Blur,
        placeholder: "Enter field 2",
        class: $(() => (errors.field2 ? "input-error" : "")),
      });
      if (errors.field2) {
        p({ class: "error-message", textContent: errors.field2 });
      }
    });

    // Submit error
    if (submitError.value) {
      div({ class: "submit-error" }, () => {
        p({ textContent: submitError.value! });
      });
    }

    // Form actions
    div({ class: "form-actions" }, () => {
      button({
        type: "submit",
        textContent: $(() => (isSubmitting.value ? "Submitting..." : "Submit")),
        disabled: $(() => isSubmitting.value),
      });

      button({
        type: "button",
        textContent: "Reset",
        onclick: handleReset,
      });

      if (props.onCancel) {
        button({
          type: "button",
          textContent: "Cancel",
          onclick: handleCancel,
        });
      }
    });
  });
};
```

## Key Features

- **Reactive Form State**: Store for form data with property-level reactivity
- **Validation**: Field-level and form-level validation
- **Error Handling**: Display field errors and submission errors
- **Submission State**: Loading indicator during async submission
- **Real-time Feedback**: Validation on blur
- **Type Safety**: Typed form data and errors
- **Reset/Cancel**: Form reset and cancel actions

## Customization Points

1. **Form Fields**: Add/remove fields in formData and errors
2. **Validation Rules**: Customize validation logic per field
3. **Field Types**: Use different input types (email, password, select, etc.)
4. **Submission Logic**: Handle API calls, redirects, etc.
5. **Styling**: Add classes for error states, disabled states
6. **Advanced Features**: File uploads, multi-step forms, conditional fields

## Example Customizations

### Login Form
```typescript
interface LoginData {
  email: string;
  password: string;
}

export const LoginForm = (props: {
  onSubmit: (data: LoginData) => Promise<void>;
}) => {
  const formData = $(
    { email: "", password: "" },
    "email",
    "password"
  );

  const errors = $(
    { email: "", password: "" },
    "email",
    "password"
  );

  const validateEmail = (email: string): string => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  // ... rest of implementation
};
```

### Contact Form
```typescript
interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = (props: {
  onSubmit: (data: ContactData) => Promise<void>;
}) => {
  const formData = $(
    { name: "", email: "", message: "" },
    "name",
    "email",
    "message"
  );

  // Use textarea for message field
  div({ class: "form-field" }, () => {
    label({ textContent: "Message", for: "message" });
    textarea({
      id: "message",
      value: formData.message,
      oninput: (e) => (formData.message = e.currentTarget.value),
      rows: 5,
      placeholder: "Enter your message",
    });
  });

  // ... rest of implementation
};
```

### Multi-Step Form
```typescript
export const MultiStepForm = () => {
  const currentStep = $(1);
  const totalSteps = 3;

  const formData = $(
    {
      // Step 1 fields
      name: "",
      email: "",
      // Step 2 fields
      address: "",
      city: "",
      // Step 3 fields
      preferences: "",
    },
    "name",
    "email",
    "address",
    "city",
    "preferences"
  );

  const goToNextStep = () => {
    if (validateCurrentStep()) {
      currentStep.value++;
    }
  };

  const goToPreviousStep = () => {
    currentStep.value--;
  };

  return form(() => {
    // Render current step based on currentStep.value
    if (currentStep.value === 1) {
      // Step 1 fields
    } else if (currentStep.value === 2) {
      // Step 2 fields
    } else if (currentStep.value === 3) {
      // Step 3 fields
    }

    // Navigation buttons
    div(() => {
      if (currentStep.value > 1) {
        button("Previous", goToPreviousStep);
      }
      if (currentStep.value < totalSteps) {
        button("Next", goToNextStep);
      } else {
        button({ type: "submit", textContent: "Submit" });
      }
    });
  });
};
```

## Best Practices

1. **Use Stores for Form Data** - Property-level reactivity
2. **Batch Validation Updates** - Use `batch()` for multiple error updates
3. **Validate on Blur** - Provide real-time feedback
4. **Disable During Submission** - Prevent double submissions
5. **Show Loading States** - "Submitting..." text or spinner
6. **Handle Errors Gracefully** - Display user-friendly error messages
7. **Type Form Data** - Create interfaces for data and errors
8. **Clear Errors on Input** - Remove error when user starts typing
9. **Use Semantic HTML** - label, fieldset, legend for accessibility
10. **Prevent Default** - Always `e.preventDefault()` in onsubmit
