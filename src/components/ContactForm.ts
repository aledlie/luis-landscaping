import type { ContactFormData, ValidationError } from '../types';
import { FormValidator } from '../utils/validation';

export class ContactForm {
  private form: HTMLFormElement;
  private errorContainer: HTMLElement;

  constructor(formId: string) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) {
      throw new Error(`Form with id "${formId}" not found`);
    }
    this.form = form;
    this.errorContainer = this.createErrorContainer();
    this.form.insertBefore(this.errorContainer, this.form.firstChild);
    this.attachEventListeners();
  }

  private createErrorContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'error-container';
    container.setAttribute('role', 'alert');
    container.setAttribute('aria-live', 'polite');
    return container;
  }

  private attachEventListeners(): void {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    // Clear errors on input
    this.form.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        this.clearErrors();
      });
    });
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    this.clearErrors();

    const formData = this.getFormData();
    const errors = FormValidator.validateForm(formData);

    if (errors.length > 0) {
      this.displayErrors(errors);
      return;
    }

    this.submitForm(formData);
  }

  private getFormData(): ContactFormData {
    return {
      name: FormValidator.sanitizeInput((this.form.elements.namedItem('name') as HTMLInputElement).value),
      email: FormValidator.sanitizeInput((this.form.elements.namedItem('email') as HTMLInputElement).value),
      phone: FormValidator.sanitizeInput((this.form.elements.namedItem('phone') as HTMLInputElement).value),
      message: FormValidator.sanitizeInput((this.form.elements.namedItem('message') as HTMLTextAreaElement).value),
    };
  }

  private displayErrors(errors: ValidationError[]): void {
    this.errorContainer.innerHTML = `
      <ul class="error-list">
        ${errors.map(error => `<li>${error.message}</li>`).join('')}
      </ul>
    `;
    this.errorContainer.style.display = 'block';

    // Highlight error fields
    errors.forEach(error => {
      const field = this.form.elements.namedItem(error.field) as HTMLElement;
      field.classList.add('error-field');
    });
  }

  private clearErrors(): void {
    this.errorContainer.style.display = 'none';
    this.errorContainer.innerHTML = '';

    this.form.querySelectorAll('.error-field').forEach((field) => {
      field.classList.remove('error-field');
    });
  }

  private submitForm(data: ContactFormData): void {
    // In a real application, this would send data to a backend
    console.log('Form submitted:', data);

    this.showSuccessMessage();
    this.form.reset();
  }

  private showSuccessMessage(): void {
    this.errorContainer.innerHTML = `
      <div class="success-message">
        Thank you for your message! We'll get back to you soon.
      </div>
    `;
    this.errorContainer.style.display = 'block';

    setTimeout(() => {
      this.clearErrors();
    }, 5000);
  }
}
