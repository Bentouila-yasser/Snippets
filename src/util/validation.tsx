interface InputValidationResult {
  errors: string[];
  isValid: boolean;
}

export default function validateInputs(...inputs: any[]): InputValidationResult {
  const errors: string[] = [];

  inputs.forEach((input, index) => {
    // Check for undefined/null values
    if (input === undefined || input === null) {
      errors.push(`Input ${index + 1} cannot be undefined or null.`);
    }

    // Check string inputs
    if (typeof input === 'string') {
      if (input.trim() === '') {
        errors.push(`Input ${index + 1} cannot be empty.`);
      }
      if (!/^[a-zA-Z\s]+$/.test(input)) {
        errors.push(`Input ${index + 1} contains invalid characters. Only letters and spaces are allowed.`);
      }
    }

    // Check number inputs
    if (typeof input === 'number') {
      if (isNaN(input)) {
        errors.push(`Input ${index + 1} is not a valid number.`);
      }
      if (Number.isFinite(input) && input <= 0) {
        errors.push(`Input ${index + 1} must be greater than zero.`);
      }
    }

    // Check boolean inputs
    if (typeof input === 'boolean') {
      if (!input) {
        errors.push(`Input ${index + 1} must be true.`);
      }
    }

    // Check object inputs
    if (typeof input === 'object') {
      if (!input || Array.isArray(input) || typeof input !== 'object') {
        errors.push(`Input ${index + 1} is not a valid object.`);
      }
    }

    // Reject function and symbol types
    if (typeof input === 'function') {
      errors.push(`Input ${index + 1} cannot be a function.`);
    }
    if (typeof input === 'symbol') {
      errors.push(`Input ${index + 1} cannot be a symbol.`);
    }
  });

  return { errors, isValid: errors.length === 0 };
}
