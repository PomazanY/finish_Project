import styles from "./Terms.module.css"

const Terms = () => {
    return (
        <main>
            <div className={styles.container}>
                <h1 className={styles.title}>Terms and Conditions</h1>
                <p className={styles.date}><strong>Last updated:</strong> 31 July 2025</p>

                <p>
                    Welcome to <strong>[Your App Name]</strong>. By accessing or using our website and services,
                    you agree to comply with and be bound by the following Terms and Conditions. If you do not agree,
                    please do not use our service.
                </p>

                <h2 className={styles.sectionTitle}>1. Use of the Service</h2>
                <p>You agree to use the service only for lawful purposes and in accordance with these Terms. You must not:</p>
                <ul className={styles.list}>
                    <li>Use the service in any way that violates applicable laws or regulations.</li>
                    <li>Attempt to gain unauthorized access to the system or accounts of other users.</li>
                    <li>Distribute viruses or any other technologies that may harm the website or users.</li>
                </ul>

                <h2 className={styles.sectionTitle}>2. User Accounts</h2>
                <p>If you create an account on our platform:</p>
                <ul className={styles.list}>
                    <li>You are responsible for maintaining the confidentiality of your login information.</li>
                    <li>You agree to provide accurate and complete information.</li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
                </ul>

                <h2 className={styles.sectionTitle}>3. Intellectual Property</h2>
                <p>
                    All content on this site, including logos, text, graphics, and software, is the property of
                    <strong> [Your Company Name]</strong> and is protected by copyright and trademark laws.
                    You may not copy, modify, or distribute any part of the site without written permission.
                </p>

                <h2 className={styles.sectionTitle}>4. Limitation of Liability</h2>
                <p>
                    Our service is provided "as is" and "as available" without warranties of any kind.
                    We do not guarantee the website will be error-free or uninterrupted.
                    We are not responsible for any damages that result from the use or inability to use the service.
                </p>

                <h2 className={styles.sectionTitle}>5. Third-Party Services</h2>
                <p>
                    We may use third-party services (such as payment gateways or SMS verification tools).
                    We are not responsible for the terms or practices of these third parties.
                    Use of such services is at your own risk.
                </p>

                <h2 className={styles.sectionTitle}>6. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these Terms at any time.
                    Updated versions will be posted on this page with the "Last updated" date.
                    Continued use of the service means you accept the changes.
                </p>

                <h2 className={styles.sectionTitle}>7. Contact Us</h2>
                <p>
                    If you have any questions about these Terms, please contact us at:<br />
                    <a href="mailto:your@email.com" className={styles.email}>
                        your@email.com
                    </a>
                </p>
            </div>
        </main>
    )
}
export default Terms;