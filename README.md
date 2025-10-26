# Luis Landscaping & Handyman Services Website

A professional, responsive website built with TypeScript and Vite for Luis Landscaping & Handyman Services in Austin, TX.

## Features

- Modern, responsive design
- Contact form with client-side validation
- TypeScript for type safety
- Component-based architecture
- Accessible HTML with ARIA labels
- Mobile-first responsive design
- Form input sanitization for security

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vanilla JS** - No framework dependencies for optimal performance
- **CSS3** - Modern CSS with CSS variables

## Project Structure

```
luis-landscaping/
├── src/
│   ├── components/       # Reusable components
│   │   └── ContactForm.ts
│   ├── config/          # Configuration files
│   │   └── business.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   └── validation.ts
│   ├── main.ts          # Application entry point
│   └── style.css        # Global styles
├── index.html           # HTML template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Best Practices Implemented

### Code Quality
- TypeScript for type safety
- Separation of concerns (components, config, utils)
- Class-based architecture for better organization
- Error handling and user feedback

### Security
- Input sanitization to prevent XSS
- Form validation on client-side
- No inline JavaScript or styles

### Accessibility
- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- Proper form labels and error messages

### Performance
- Minimal dependencies
- CSS variables for efficient styling
- Optimized build with Vite
- Lazy loading ready

### User Experience
- Responsive design (mobile, tablet, desktop)
- Clear error messages
- Success feedback
- Smooth transitions and hover effects

## Customization

### Update Business Information

Edit `/src/config/business.ts` to update business details:

```typescript
export const businessInfo: BusinessInfo = {
  name: 'Your Business Name',
  address: 'Your Address',
  city: 'Your City',
  state: 'ST',
  zip: '12345',
  phone: '(123) 456-7890',
  services: ['Service 1', 'Service 2'],
};
```

### Modify Styling

Edit `/src/style.css` and update CSS variables in the `:root` selector:

```css
:root {
  --primary-color: #2d6a4f;
  --secondary-color: #40916c;
  --accent-color: #52b788;
  /* ... */
}
```

## Form Submission

Currently, the contact form validates and displays success messages client-side. To connect it to a backend:

1. Update the `submitForm` method in `/src/components/ContactForm.ts`
2. Add your API endpoint
3. Handle server responses appropriately

Example:
```typescript
private async submitForm(data: ContactFormData): Promise<void> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      this.showSuccessMessage();
      this.form.reset();
    }
  } catch (error) {
    console.error('Form submission error:', error);
  }
}
```

## License

Copyright © 2025 Luis Landscaping & Handyman Services. All rights reserved.

## Contact

Luis Landscaping & Handyman Services
12028 Timber Heights Drive
Austin, TX 78754
Phone: (737) 420-7339
