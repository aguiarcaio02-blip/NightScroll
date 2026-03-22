'use client';

import { ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-semibold">Privacy Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-20 max-w-3xl mx-auto space-y-8 text-sm leading-relaxed text-gray-300">
        <div>
          <p className="text-xs text-gray-500">Last Updated: March 2026</p>
          <p className="mt-3">
            NightScroll (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of our users. This Privacy Policy describes how we collect, use, disclose, and safeguard your personal information when you access or use the NightScroll platform, including all associated websites, applications, and services (collectively, the &quot;Platform&quot;). By using the Platform, you consent to the practices described in this Privacy Policy. If you do not agree with this Policy, please do not access or use the Platform.
          </p>
        </div>

        {/* 1. Information We Collect */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">1. Information We Collect</h2>

          <h3 className="text-white font-medium mt-4 mb-2">1.1 Information You Provide Directly</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-400">
            <li><span className="text-gray-300">Account Information:</span> email address, username, password, date of birth</li>
            <li><span className="text-gray-300">Profile Information:</span> display name, biography, profile photo</li>
            <li><span className="text-gray-300">Identity Verification Data:</span> government-issued identification documents and selfie images submitted for age and identity verification purposes</li>
            <li><span className="text-gray-300">Payment Information:</span> billing address, payment method details (processed through third-party payment processors; we do not store full credit card numbers)</li>
            <li><span className="text-gray-300">Communications:</span> messages, support requests, and feedback you send to us</li>
            <li><span className="text-gray-300">User Content:</span> videos, images, comments, and other content you upload or post</li>
          </ul>

          <h3 className="text-white font-medium mt-4 mb-2">1.2 Information Collected Automatically</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-400">
            <li><span className="text-gray-300">Device Information:</span> device type, operating system, unique device identifiers, browser type and version, screen resolution</li>
            <li><span className="text-gray-300">Network Information:</span> IP address, Internet Service Provider, mobile carrier</li>
            <li><span className="text-gray-300">Usage Data:</span> pages viewed, content interactions (views, likes, shares), search queries, navigation paths, session duration, timestamps</li>
            <li><span className="text-gray-300">Location Data:</span> approximate geographic location derived from IP address</li>
            <li><span className="text-gray-300">Cookies and Similar Technologies:</span> cookies, web beacons, pixel tags, and similar tracking technologies (see our Cookie Policy for details)</li>
            <li><span className="text-gray-300">Log Data:</span> server logs including access times, referring URLs, error logs</li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
            <li>To create, maintain, and secure your account</li>
            <li>To verify your age and identity in compliance with applicable laws</li>
            <li>To provide, operate, and improve the Platform and its features</li>
            <li>To personalize your experience, including content recommendations</li>
            <li>To process transactions and send related information</li>
            <li>To communicate with you regarding updates, security alerts, and support</li>
            <li>To detect, investigate, and prevent fraudulent, unauthorized, or illegal activity</li>
            <li>To enforce our Terms of Service and other policies</li>
            <li>To comply with legal obligations, including record-keeping requirements</li>
            <li>To conduct analytics and research to improve our services</li>
          </ul>
        </section>

        {/* 3. How We Share Your Information */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">3. How We Share Your Information</h2>
          <p>We may share your personal information with the following categories of recipients:</p>

          <h3 className="text-white font-medium mt-4 mb-2">3.1 Service Providers</h3>
          <p>
            Third-party vendors who perform services on our behalf, including hosting, data analytics, payment processing, identity verification, customer support, and email delivery. These providers are contractually obligated to use your information only as necessary to perform services for us and in accordance with this Policy.
          </p>

          <h3 className="text-white font-medium mt-4 mb-2">3.2 Legal and Safety Disclosures</h3>
          <p>
            We may disclose your information when we believe in good faith that disclosure is necessary to: (a) comply with applicable law, regulation, legal process, or governmental request; (b) enforce our Terms of Service or other agreements; (c) protect the safety, rights, or property of NightScroll, our users, or the public; (d) detect, prevent, or address fraud, security, or technical issues; or (e) respond to an emergency involving danger of death or serious physical injury.
          </p>

          <h3 className="text-white font-medium mt-4 mb-2">3.3 Business Transfers</h3>
          <p>
            In connection with any merger, acquisition, reorganization, sale of assets, or bankruptcy proceeding, your information may be transferred to the acquiring entity or successor. We will provide notice before your personal information is transferred and becomes subject to a different privacy policy.
          </p>

          <h3 className="text-white font-medium mt-4 mb-2">3.4 With Your Consent</h3>
          <p>
            We may share your information for other purposes with your express consent or at your direction.
          </p>

          <p className="mt-3">
            We do not sell your personal information to third parties for their direct marketing purposes.
          </p>
        </section>

        {/* 4. GDPR Rights */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">4. Your Rights Under the General Data Protection Regulation (GDPR)</h2>
          <p>
            If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, you have the following rights under the GDPR and equivalent legislation:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-400">
            <li><span className="text-gray-300">Right of Access (Article 15):</span> You have the right to request a copy of the personal data we hold about you and information about how it is processed.</li>
            <li><span className="text-gray-300">Right to Rectification (Article 16):</span> You have the right to request correction of inaccurate or incomplete personal data.</li>
            <li><span className="text-gray-300">Right to Erasure (Article 17):</span> You have the right to request deletion of your personal data where there is no compelling reason for its continued processing, subject to applicable legal retention requirements.</li>
            <li><span className="text-gray-300">Right to Data Portability (Article 20):</span> You have the right to receive your personal data in a structured, commonly used, machine-readable format and to transmit it to another controller.</li>
            <li><span className="text-gray-300">Right to Object (Article 21):</span> You have the right to object to processing of your personal data based on legitimate interests or for direct marketing purposes.</li>
            <li><span className="text-gray-300">Right to Restrict Processing (Article 18):</span> You have the right to request restriction of processing in certain circumstances.</li>
            <li><span className="text-gray-300">Right to Withdraw Consent:</span> Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at <span className="text-[#D946EF]">privacy@nightscroll.com</span>. We will respond to your request within thirty (30) days. You also have the right to lodge a complaint with your local data protection supervisory authority.
          </p>
        </section>

        {/* 5. CCPA Rights */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">5. Your Rights Under the California Consumer Privacy Act (CCPA/CPRA)</h2>
          <p>
            If you are a California resident, you have the following rights under the California Consumer Privacy Act as amended by the California Privacy Rights Act:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-400">
            <li><span className="text-gray-300">Right to Know:</span> You have the right to request that we disclose the categories and specific pieces of personal information we have collected about you, the categories of sources from which it was collected, the business or commercial purpose for collecting it, and the categories of third parties with whom it was shared.</li>
            <li><span className="text-gray-300">Right to Delete:</span> You have the right to request deletion of your personal information, subject to certain exceptions as provided by law.</li>
            <li><span className="text-gray-300">Right to Opt-Out of Sale or Sharing:</span> You have the right to opt out of the sale or sharing of your personal information. We do not sell personal information. If we engage in sharing for cross-context behavioral advertising, you may opt out by contacting us.</li>
            <li><span className="text-gray-300">Right to Correct:</span> You have the right to request correction of inaccurate personal information.</li>
            <li><span className="text-gray-300">Right to Non-Discrimination:</span> We will not discriminate against you for exercising any of your CCPA/CPRA rights.</li>
          </ul>
          <p className="mt-3">
            To submit a verifiable consumer request, please contact us at <span className="text-[#D946EF]">privacy@nightscroll.com</span>. We may require you to verify your identity before fulfilling your request.
          </p>
        </section>

        {/* 6. Data Retention */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">6. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as needed to provide you with our services. We may also retain and use your information as necessary to comply with our legal obligations (including record-keeping requirements under 18 U.S.C. 2257), resolve disputes, prevent fraud, and enforce our agreements. When your personal information is no longer needed, we will securely delete or anonymize it in accordance with our data retention policies.
          </p>
          <p className="mt-3">
            Identity verification records are retained for the duration required by applicable law. Usage logs and analytics data are retained in anonymized or aggregated form for a period not exceeding twenty-four (24) months from collection.
          </p>
        </section>

        {/* 7. Data Security */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">7. Data Security</h2>
          <p>
            We implement and maintain reasonable administrative, technical, and physical security measures designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, access controls, regular security assessments, and employee training. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* 8. Children's Privacy */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">8. Children&apos;s Privacy</h2>
          <p>
            The Platform is not intended for use by anyone under the age of eighteen (18). We do not knowingly collect personal information from individuals under 18. If we become aware that we have inadvertently collected personal information from a person under 18, we will take immediate steps to delete such information from our systems. If you believe that a minor has provided us with personal information, please contact us immediately at <span className="text-[#D946EF]">privacy@nightscroll.com</span>.
          </p>
        </section>

        {/* 9. International Data Transfers */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have data protection laws that differ from those in your jurisdiction. Where required, we implement appropriate safeguards for cross-border transfers, including Standard Contractual Clauses approved by the European Commission or other legally recognized transfer mechanisms.
          </p>
        </section>

        {/* 10. Changes */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make material changes, we will notify you by posting the updated Policy on the Platform with a revised &quot;Last Updated&quot; date and, where required by law, by sending you an email notification. Your continued use of the Platform after the effective date of any changes constitutes your acceptance of the revised Policy.
          </p>
        </section>

        {/* 11. Contact */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">11. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="mt-3 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="font-medium text-white">NightScroll Privacy Team</p>
            <p className="mt-1">Email: <span className="text-[#D946EF]">privacy@nightscroll.com</span></p>
          </div>
          <p className="mt-3">
            For GDPR-related inquiries, you may also contact our Data Protection Officer at the email address above with the subject line &quot;DPO Inquiry.&quot;
          </p>
        </section>
      </div>
    </div>
  );
}
