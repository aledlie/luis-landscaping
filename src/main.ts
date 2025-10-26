import './style.css';
import { businessInfo } from './config/business';
import { ContactForm } from './components/ContactForm';

class App {
  constructor() {
    this.init();
  }

  private init(): void {
    this.populateBusinessInfo();
    this.initContactForm();
    this.setCurrentYear();
  }

  private populateBusinessInfo(): void {
    // Set business name
    const businessNameElement = document.getElementById('business-name');
    const footerBusinessName = document.getElementById('footer-business-name');
    if (businessNameElement) businessNameElement.textContent = businessInfo.name;
    if (footerBusinessName) footerBusinessName.textContent = businessInfo.name;

    // Set address
    const addressElement = document.getElementById('business-address');
    if (addressElement) {
      addressElement.textContent = `${businessInfo.address}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zip}`;
    }

    // Set phone
    const phoneLink = document.getElementById('business-phone-link') as HTMLAnchorElement;
    if (phoneLink) {
      phoneLink.textContent = businessInfo.phone;
      phoneLink.href = `tel:${businessInfo.phone.replace(/\D/g, '')}`;
    }

    // Populate services
    const servicesList = document.getElementById('services-list');
    if (servicesList) {
      servicesList.innerHTML = businessInfo.services
        .map(service => `<li>${service}</li>`)
        .join('');
    }
  }

  private initContactForm(): void {
    try {
      new ContactForm('contact-form');
    } catch (error) {
      console.error('Failed to initialize contact form:', error);
    }
  }

  private setCurrentYear(): void {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
