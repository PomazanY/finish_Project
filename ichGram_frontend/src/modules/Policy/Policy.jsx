
import styles from "./Policy.module.css"

const Policy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.date}><strong>Last updated:</strong> 31 July 2025</p>

      <p>
        This Privacy Policy explains how <strong>[Your App Name]</strong> ("we", "us", or "our")
        collects, uses, and protects your personal information when you use our website or services.
      </p>

      <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul className={styles.list}>
        <li>Name and contact details (e.g., email address)</li>
        <li>Login and account credentials</li>
        <li>Usage data (e.g., IP address, browser type, visit time)</li>
      </ul>

      <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
      <p>We use your data to:</p>
      <ul className={styles.list}>
        <li>Provide and improve our services</li>
        <li>Send important updates</li>
        <li>Prevent abuse and ensure security</li>
      </ul>

      <h2 className={styles.sectionTitle}>3. Cookies</h2>
      <p>
        We may use cookies to improve your experience. You can disable cookies in your browser settings.
      </p>

      <h2 className={styles.sectionTitle}>4. Third-Party Services</h2>
      <p>
        We may share your information with trusted third-party providers (e.g., analytics, payments).
        They are required to protect your data in line with this policy.
      </p>

      <h2 className={styles.sectionTitle}>5. Data Security</h2>
      <p>
        We take appropriate measures to protect your data, but no system is 100% secure.
      </p>

      <h2 className={styles.sectionTitle}>6. Your Rights</h2>
      <p>You may request:</p>
      <ul className={styles.list}>
        <li>Access to your personal data</li>
        <li>Correction or deletion</li>
        <li>Withdrawal of consent</li>
      </ul>

      <h2 className={styles.sectionTitle}>7. Changes</h2>
      <p>
        We may update this policy from time to time. Changes will be posted on this page with the new date.
      </p>

      <h2 className={styles.sectionTitle}>8. Contact</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us:<br />
         <a href="mailto:your@email.com" className={styles.email}>
          your@email.com
        </a>
      </p>
    </div>
  )
}

export default Policy;
