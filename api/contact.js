const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, country_code, package: packageName, adults, children, children_ages, newsletter_email, type } = req.body;
    
    console.log('API received data:', { name, email, phone, country_code, package: packageName, adults, children, children_ages, newsletter_email, type });

    // Handle newsletter subscription
    if (type === 'newsletter') {
      if (!newsletter_email) {
        return res.status(400).json({ error: 'Email is required for newsletter subscription' });
      }

      // Create transporter using Hostinger SMTP
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Newsletter email content
      const emailContent = `
        <h2>New Newsletter Subscription - Anaya Escapes</h2>
        <p><strong>Email:</strong> ${newsletter_email}</p>
        <hr>
        <p><em>This email was sent from the Anaya Escapes newsletter subscription form.</em></p>
      `;

      // Email options
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: 'sales@anayaescapes.com',
        subject: 'New Newsletter Subscription - Anaya Escapes',
        html: emailContent,
        replyTo: newsletter_email,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ 
        success: true, 
        message: 'Newsletter subscription successful' 
      });
    }

    // Validate required fields for contact form
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create transporter using Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const emailContent = `
      <h2>New Contact Form Submission - Anaya Escapes</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${country_code ? country_code + ' ' : ''}${phone}</p>
      ${packageName ? `<p><strong>Package:</strong> ${packageName}</p>` : ''}
      ${adults ? `<p><strong>Adults:</strong> ${adults}</p>` : ''}
      ${children ? `<p><strong>Children:</strong> ${children}</p>` : ''}
      ${children_ages ? `<p><strong>Children Ages:</strong> ${children_ages}</p>` : ''}
      <hr>
      <p><em>This email was sent from the Anaya Escapes contact form.</em></p>
    `;

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'sales@anayaescapes.com',
      subject: 'New Contact Form Submission - Anaya Escapes',
      html: emailContent,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message,
      stack: error.stack
    });
  }
}
