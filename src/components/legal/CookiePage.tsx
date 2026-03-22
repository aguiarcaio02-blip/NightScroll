'use client';

import { ArrowLeft } from 'lucide-react';

interface CookiePageProps {
  onBack: () => void;
}

export default function CookiePage({ onBack }: CookiePageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-md px-lg py-md h-[44px]">
          <button
            onClick={onBack}
            className="w-[44px] h-[44px] flex items-center justify-center -ml-[8px]"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-semibold">Cookie Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-lg py-lg pb-[100px] max-w-[600px] mx-auto space-y-xl text-[14px] leading-[1.7] text-[#AAAAAA]">
        <div>
          <p className="text-[12px] text-[#666666]">Last Updated: March 2026</p>
          <p className="mt-md">
            This Cookie Policy explains how NightScroll (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar tracking technologies when you access or use the NightScroll platform, including all associated websites, applications, and services (collectively, the &quot;Platform&quot;). This Policy should be read in conjunction with our Privacy Policy, which provides additional details about how we collect and use your personal information.
          </p>
        </div>

        {/* 1. What Are Cookies */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device (computer, smartphone, tablet, or other device) when you visit a website or use an application. Cookies are widely used to make websites work more efficiently, to provide information to the operators of websites, and to enable certain features and functionality. Cookies may be &quot;session cookies&quot; (which are deleted when you close your browser) or &quot;persistent cookies&quot; (which remain on your device for a set period or until you delete them).
          </p>
          <p className="mt-md">
            In addition to cookies, we may use similar technologies such as web beacons (also known as pixel tags or clear GIFs), local storage, and device fingerprinting to collect information about your use of the Platform.
          </p>
        </section>

        {/* 2. Types of Cookies We Use */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">2. Types of Cookies We Use</h2>

          <div className="mt-4 p-lg bg-[#1A1A1A] rounded-[12px] border border-[#333333]">
            <h3 className="text-white font-medium mb-2">2.1 Essential Cookies (Strictly Necessary)</h3>
            <p className="text-gray-400">
              These cookies are required for the basic operation of the Platform and cannot be disabled. They enable core functionality such as user authentication, session management, security features (including CSRF protection), age verification status, content delivery, and load balancing. Without these cookies, the Platform cannot function properly.
            </p>
            <div className="mt-2 text-[12px] text-[#666666]">
              <p><span className="text-gray-400">Examples:</span> session identifiers, authentication tokens, security cookies, age gate status</p>
              <p><span className="text-gray-400">Duration:</span> Session to 12 months</p>
              <p><span className="text-gray-400">Legal basis:</span> Legitimate interest / necessity for service provision</p>
            </div>
          </div>

          <div className="mt-4 p-lg bg-[#1A1A1A] rounded-[12px] border border-[#333333]">
            <h3 className="text-white font-medium mb-2">2.2 Analytics and Performance Cookies</h3>
            <p className="text-gray-400">
              These cookies collect information about how visitors use the Platform, such as which pages are visited most often, how users navigate between pages, session duration, and whether users encounter error messages. The information collected is aggregated and anonymized. These cookies help us understand and improve the performance and usability of the Platform.
            </p>
            <div className="mt-2 text-[12px] text-[#666666]">
              <p><span className="text-gray-400">Examples:</span> page view tracking, scroll depth measurement, error logging, performance metrics</p>
              <p><span className="text-gray-400">Duration:</span> Session to 24 months</p>
              <p><span className="text-gray-400">Legal basis:</span> Consent</p>
            </div>
          </div>

          <div className="mt-4 p-lg bg-[#1A1A1A] rounded-[12px] border border-[#333333]">
            <h3 className="text-white font-medium mb-2">2.3 Functional Cookies</h3>
            <p className="text-gray-400">
              These cookies enable enhanced functionality and personalization, such as remembering your preferences (language, region, display settings), maintaining your content feed customizations, and providing features like video playback settings and autoplay preferences. If you do not allow these cookies, some or all of these features may not function properly.
            </p>
            <div className="mt-2 text-[12px] text-[#666666]">
              <p><span className="text-gray-400">Examples:</span> language preferences, theme settings, video quality preferences, content filters</p>
              <p><span className="text-gray-400">Duration:</span> Session to 12 months</p>
              <p><span className="text-gray-400">Legal basis:</span> Consent</p>
            </div>
          </div>

          <div className="mt-4 p-lg bg-[#1A1A1A] rounded-[12px] border border-[#333333]">
            <h3 className="text-white font-medium mb-2">2.4 Advertising and Targeting Cookies</h3>
            <p className="text-gray-400">
              These cookies are used to deliver advertisements that are more relevant to you and your interests. They may be set by us or by third-party advertising partners and are used to build a profile of your interests based on your browsing activity on the Platform and other sites. They do not directly store personal information but are based on uniquely identifying your browser and device. If you do not allow these cookies, you will experience less targeted advertising.
            </p>
            <div className="mt-2 text-[12px] text-[#666666]">
              <p><span className="text-gray-400">Examples:</span> interest-based advertising identifiers, frequency capping, conversion tracking, retargeting pixels</p>
              <p><span className="text-gray-400">Duration:</span> Session to 24 months</p>
              <p><span className="text-gray-400">Legal basis:</span> Consent</p>
            </div>
          </div>
        </section>

        {/* 3. Third-Party Cookies */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">3. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, third-party service providers may place cookies on your device when you use the Platform. These third parties include analytics providers, advertising networks, payment processors, and social media platforms. Third-party cookies are governed by the respective third party&apos;s own privacy and cookie policies, over which NightScroll has no control.
          </p>
          <p className="mt-md">
            We recommend reviewing the privacy policies of these third parties to understand their data collection practices and the choices they offer. Major third-party cookie providers include opt-out mechanisms through industry programs such as the Digital Advertising Alliance (DAA), the Network Advertising Initiative (NAI), and the European Interactive Digital Advertising Alliance (EDAA).
          </p>
        </section>

        {/* 4. Managing Cookies */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">4. How to Manage and Disable Cookies</h2>
          <p>
            You have several options for managing cookies:
          </p>

          <h3 className="text-white font-medium mt-4 mb-2">4.1 Browser Settings</h3>
          <p>
            Most web browsers allow you to control cookies through their settings. You can typically configure your browser to block all cookies, accept all cookies, or notify you when a cookie is set. The methods for managing cookies vary by browser:
          </p>
          <ul className="list-disc pl-[20px] mt-md space-y-sm text-[#999999]">
            <li><span className="text-gray-300">Chrome:</span> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
            <li><span className="text-gray-300">Firefox:</span> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
            <li><span className="text-gray-300">Safari:</span> Preferences &gt; Privacy &gt; Manage Website Data</li>
            <li><span className="text-gray-300">Edge:</span> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
          </ul>
          <p className="mt-2 text-[12px] text-[#666666]">
            Please note that disabling cookies may impair the functionality of the Platform. Essential cookies cannot be disabled without significantly affecting your ability to use the Platform.
          </p>

          <h3 className="text-white font-medium mt-4 mb-2">4.2 Mobile Device Settings</h3>
          <p>
            On mobile devices, you can manage tracking and advertising identifiers through your device settings:
          </p>
          <ul className="list-disc pl-[20px] mt-md space-y-sm text-[#999999]">
            <li><span className="text-gray-300">iOS:</span> Settings &gt; Privacy &amp; Security &gt; Tracking</li>
            <li><span className="text-gray-300">Android:</span> Settings &gt; Privacy &gt; Ads</li>
          </ul>

          <h3 className="text-white font-medium mt-4 mb-2">4.3 Platform Cookie Settings</h3>
          <p>
            Where required by applicable law, we will present you with a cookie consent mechanism when you first access the Platform. You may update your cookie preferences at any time through the cookie settings available in the Platform&apos;s footer or account settings.
          </p>
        </section>

        {/* 5. Consent */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">5. Consent</h2>
          <p>
            Where required by applicable law (including the EU ePrivacy Directive and GDPR), we obtain your consent before placing non-essential cookies on your device. Essential cookies that are strictly necessary for the provision of the Platform do not require your consent.
          </p>
          <p className="mt-md">
            You may withdraw your consent to non-essential cookies at any time by adjusting your cookie preferences through the Platform&apos;s cookie settings or by modifying your browser settings. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal.
          </p>
        </section>

        {/* 6. Do Not Track */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">6. Do Not Track Signals</h2>
          <p>
            Some browsers offer a &quot;Do Not Track&quot; (&quot;DNT&quot;) signal. Because there is no accepted standard for how to respond to DNT signals, the Platform does not currently respond to DNT signals. We will continue to monitor developments in DNT technology and may adopt a DNT standard in the future if one is established.
          </p>
          <p className="mt-md">
            We do honor the Global Privacy Control (GPC) signal as a valid opt-out of sale or sharing of personal information where required by applicable law, including the CCPA/CPRA.
          </p>
        </section>

        {/* 7. Changes */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">7. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, applicable law, or our data practices. When we make material changes, we will update the &quot;Last Updated&quot; date at the top of this Policy and, where appropriate, provide additional notice (such as a banner on the Platform or an email notification). We encourage you to review this Policy periodically.
          </p>
        </section>

        {/* 8. Contact */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">8. Contact Us</h2>
          <p>
            If you have questions or concerns about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          <div className="mt-md p-lg bg-[#1A1A1A] rounded-[12px] border border-[#333333]">
            <p className="font-medium text-white">NightScroll Privacy Team</p>
            <p className="mt-1">Email: <span className="text-[#D946EF]">privacy@nightscroll.com</span></p>
          </div>
        </section>
      </div>
    </div>
  );
}
