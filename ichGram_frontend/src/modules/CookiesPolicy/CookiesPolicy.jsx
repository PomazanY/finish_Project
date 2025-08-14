
import styles from "./CookiesPolicy.module.css"

const CookiesPolicy = () => {
  return (
   <div className={styles.container}>
      <h1 className={styles.title}>Cookies Policy</h1>
      <p className={styles.date}><strong>Last updated:</strong> 31 July 2025</p>

      <p>
        This Cookies Policy explains how <strong>[Your App Name]</strong> uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
      </p>

      <h2 className={styles.sectionTitle}>1. What are cookies?</h2>
      <p>
        Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work or to work more efficiently, as well as to provide reporting information.
      </p>

      <h2 className={styles.sectionTitle}>2. Why do we use cookies?</h2>
      <p>We use cookies for several reasons, including:</p>
      <ul className={styles.list}>
        <li>To ensure the website functions properly</li>
        <li>To remember your preferences and settings</li>
        <li>To analyze traffic and user behavior</li>
        <li>To deliver targeted advertising (if applicable)</li>
      </ul>

      <h2 className={styles.sectionTitle}>3. Types of cookies we use</h2>
      <ul className={styles.list}>
        <li><strong>Essential cookies:</strong> Required for technical operation of our site.</li>
        <li><strong>Performance cookies:</strong> Help us understand how visitors interact with the site.</li>
        <li><strong>Functionality cookies:</strong> Remember your preferences.</li>
        <li><strong>Targeting cookies:</strong> Used to deliver relevant ads (if applicable).</li>
      </ul>

      <h2 className={styles.sectionTitle}>4. How can you control cookies?</h2>
      <p>
        You can set your browser to refuse all or some cookies. Please note that disabling cookies may affect the functionality of the website.
      </p>

      <h2 className={styles.sectionTitle}>5. Changes to this policy</h2>
      <p>
        We may update this Cookies Policy from time to time. Changes will be posted on this page with the updated date.
      </p>

      <h2 className={styles.sectionTitle}>6. Contact us</h2>
      <p>
        If you have any questions about our use of cookies, please contact us at:<br />
       <a href="mailto:your@email.com" className={styles.email}>
          your@email.com
        </a>
      </p>
    </div>
  )
}

export default CookiesPolicy;
