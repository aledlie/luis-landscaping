import type { ContactFormData, ValidationError } from '../types';

export class FormValidator {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly PHONE_REGEX = /^[\d\s\-\(\)]+$/;

  static validateForm(data: ContactFormData): ValidationError[] {
    const errors: ValidationError[] = [];

    // Validate name
    if (!data.name.trim()) {
      errors.push({ field: 'name', message: 'Name is required' });
    } else if (data.name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
    }

    // Validate email
    if (!data.email.trim()) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!this.EMAIL_REGEX.test(data.email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }

    // Validate phone
    if (!data.phone.trim()) {
      errors.push({ field: 'phone', message: 'Phone number is required' });
    } else if (!this.PHONE_REGEX.test(data.phone)) {
      errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
    }

    // Validate message
    if (!data.message.trim()) {
      errors.push({ field: 'message', message: 'Message is required' });
    } else if (data.message.trim().length < 10) {
      errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
    }

    return errors;
  }

  static sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }
}
