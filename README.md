# Anaya Escapes Website - Custom Contact Form Backend

This project has been updated to use a custom backend for contact form submissions instead of FormSubmit, using Vercel's serverless functions and Hostinger email SMTP.

## Features

- ✅ Custom serverless API endpoint for contact form submissions
- ✅ Newsletter subscription handling
- ✅ Hostinger SMTP email integration
- ✅ Form validation and error handling
- ✅ Success/error notifications
- ✅ Support for all contact forms (main contact, modal popups, newsletter)

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root with your Hostinger email credentials:

```env
# Hostinger SMTP Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=sales@anayaescapes.com
SMTP_PASS=your_actual_email_password_here
NODE_ENV=production
```

**Important:** Replace the values above with your actual Hostinger email settings:
- `SMTP_HOST`: `smtp.hostinger.com` (Hostinger's SMTP server)
- `SMTP_PORT`: `465` (SSL encryption)
- `SMTP_USER`: Your full Hostinger email address (e.g., sales@anayaescapes.com)
- `SMTP_PASS`: Your Hostinger email password

### 2. Vercel Deployment

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Add environment variables to Vercel:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all the environment variables from your `.env.local` file

### 3. Hostinger Email Settings

Based on your Hostinger configuration, use these exact settings:

**SMTP Configuration:**
- **Outgoing Server (SMTP):** smtp.hostinger.com
- **SMTP Port:** 465 (SSL/TLS enabled)
- **Security:** SSL/TLS

**Additional Hostinger Settings (for reference):**
- **Incoming Server (IMAP):** imap.hostinger.com (Port: 993)
- **Incoming Server (POP):** pop.hostinger.com (Port: 995)

Make sure your Hostinger email account has:
- **IMAP/SMTP enabled**
- **Email account is active and accessible**

## API Endpoints

### POST `/api/contact`

Handles both contact form submissions and newsletter subscriptions.

#### Contact Form Submission
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "package": "International Package",
  "persons": 2,
  "children": 1,
  "children_ages": "5, 8"
}
```

#### Newsletter Subscription
```json
{
  "newsletter_email": "john@example.com",
  "type": "newsletter"
}
```

## File Structure

```
├── api/
│   └── contact.js              # Serverless function for form handling
├── js/
│   └── Global/
│       └── contactForm.js      # Frontend form handling
├── .env.example                # Environment variables template
├── .env.local                  # Your actual environment variables (not in git)
├── package.json                # Dependencies
├── vercel.json                 # Vercel configuration
└── README.md                   # This file
```

## Forms Updated

The following forms have been updated to use the custom backend:

1. **Contact.html** - Main contact page form
2. **index.html** - Homepage contact form
3. **index.html** - Newsletter subscription form
4. **packages.html** - Packages page contact form
5. **Modal forms** - Auto-popup and package detail modals

## Testing

1. **Local Development:**
   ```bash
   vercel dev
   ```
   This will start a local development server with the serverless functions.

2. **Test Contact Form:**
   - Fill out any contact form on the website
   - Check that you receive the email at `sales@anayaescapes.com`
   - Verify success/error notifications work

3. **Test Newsletter:**
   - Subscribe to the newsletter
   - Check that you receive the subscription email
   - Verify success notification appears

## Troubleshooting

### Common Issues

1. **Email not sending:**
   - Check environment variables are set correctly in Vercel
   - Verify Hostinger SMTP credentials
   - Check Hostinger email account settings

2. **CORS errors:**
   - The API includes CORS headers, but if issues persist, check Vercel logs

3. **Form not submitting:**
   - Check browser console for JavaScript errors
   - Verify the API endpoint is accessible

### Debugging

- Check Vercel function logs in your Vercel dashboard
- Use browser developer tools to inspect network requests
- Test the API endpoint directly using tools like Postman

## Security Notes

- Environment variables are securely stored in Vercel
- Email credentials are not exposed in the frontend code
- Form validation is performed on both frontend and backend
- CORS is properly configured for your domain

## Support

If you encounter any issues:
1. Check the Vercel function logs
2. Verify your Hostinger email settings
3. Ensure all environment variables are correctly set
4. Test with a simple curl request to the API endpoint

---

**Note:** Make sure to never commit your `.env.local` file to version control. It's already included in `.gitignore`.
