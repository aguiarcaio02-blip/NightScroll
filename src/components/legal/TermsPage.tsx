'use client';

import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
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
          <h1 className="text-lg font-semibold">Terms of Service</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-20 max-w-3xl mx-auto space-y-8 text-sm leading-relaxed text-gray-300">
        <div>
          <p className="text-xs text-gray-500">Last Updated: March 2026</p>
          <p className="mt-3">
            Welcome to NightScroll. These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and NightScroll (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of the NightScroll platform, including all associated websites, applications, services, and content (collectively, the &quot;Platform&quot;). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree, you must immediately cease all use of the Platform.
          </p>
        </div>

        {/* 1. Eligibility */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">1. Eligibility</h2>
          <p>
            The Platform is intended exclusively for individuals who are at least eighteen (18) years of age, or the age of majority in their jurisdiction, whichever is greater. By accessing or using the Platform, you represent and warrant that you meet this age requirement. We reserve the right to request proof of age at any time and to terminate or suspend access for any User who fails to provide satisfactory evidence of eligibility or who is found to have misrepresented their age.
          </p>
          <p className="mt-3">
            If you are accessing the Platform from a jurisdiction where adult content is prohibited or restricted, you are solely responsible for compliance with applicable local laws. We make no representation that the Platform is appropriate or available for use in all locations.
          </p>
        </section>

        {/* 2. Account Registration and Responsibilities */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">2. Account Registration and Responsibilities</h2>
          <p>
            To access certain features of the Platform, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary. You are solely responsible for maintaining the confidentiality of your account credentials, including your password, and for all activities that occur under your account.
          </p>
          <p className="mt-3">
            You agree to immediately notify us at <span className="text-[#D946EF]">legal@nightscroll.com</span> of any unauthorized use of your account or any other breach of security. We shall not be liable for any loss or damage arising from your failure to protect your account credentials. You may not transfer, sell, or assign your account to any third party without our prior written consent.
          </p>
        </section>

        {/* 3. Prohibited Content and Conduct */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">3. Prohibited Content and Conduct</h2>
          <p>
            You agree not to upload, post, transmit, or otherwise make available any content that:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-400">
            <li>Depicts, promotes, or involves minors in any sexual or exploitative manner. NightScroll maintains an absolute zero-tolerance policy regarding child sexual abuse material (CSAM). Any such content will be immediately removed and reported to the National Center for Missing &amp; Exploited Children (NCMEC) and applicable law enforcement agencies.</li>
            <li>Depicts non-consensual sexual activity, including but not limited to content produced without the informed, voluntary consent of all depicted individuals, or content that simulates or glorifies non-consensual acts.</li>
            <li>Constitutes, facilitates, or promotes human trafficking, sexual exploitation, or forced labor in any form.</li>
            <li>Constitutes revenge pornography or non-consensual intimate imagery, meaning sexually explicit content distributed without the consent of one or more depicted individuals, including content originally created with consent but shared in violation of an express or implied agreement of confidentiality.</li>
            <li>Contains obscene material that lacks serious literary, artistic, political, or scientific value as determined in accordance with applicable community standards.</li>
            <li>Infringes upon the intellectual property rights, privacy rights, or other proprietary rights of any third party.</li>
            <li>Promotes violence, self-harm, terrorism, or illegal activity.</li>
            <li>Contains malware, viruses, or any harmful code designed to disrupt the Platform.</li>
          </ul>
          <p className="mt-3">
            We reserve the right to investigate and take appropriate action, including content removal, account suspension or termination, and reporting to law enforcement, against any User who violates this Section in our sole discretion.
          </p>
        </section>

        {/* 4. Content Ownership and License Grant */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">4. Content Ownership and License Grant</h2>
          <p>
            You retain all ownership rights in the content you upload to the Platform (&quot;User Content&quot;). However, by uploading, posting, or otherwise submitting User Content to the Platform, you hereby grant NightScroll a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with the operation of the Platform and the promotion, advertising, and redistribution of the Platform or any part thereof, in any media formats and through any media channels now known or hereafter developed.
          </p>
          <p className="mt-3">
            This license persists for so long as the User Content remains on the Platform and for a commercially reasonable period thereafter to allow for the removal of cached or archived copies. You may terminate this license as to specific User Content by deleting such content from the Platform, subject to the foregoing retention period and any legal obligation to retain certain content.
          </p>
          <p className="mt-3">
            You represent and warrant that you own or have the necessary rights, licenses, consents, and permissions to grant the foregoing license, and that all persons depicted in your User Content have provided informed, verifiable consent to the creation and distribution of such content.
          </p>
        </section>

        {/* 5. DMCA Compliance */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">5. Digital Millennium Copyright Act (DMCA) Compliance</h2>
          <p>
            NightScroll respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act of 1998 (&quot;DMCA&quot;). We will respond to properly submitted notices of alleged copyright infringement that comply with the DMCA and any other applicable intellectual property laws. For details on how to submit a takedown notice or counter-notification, please refer to our separate DMCA Policy.
          </p>
          <p className="mt-3">
            Our designated agent for receiving DMCA notices may be contacted at <span className="text-[#D946EF]">dmca@nightscroll.com</span>.
          </p>
        </section>

        {/* 6. Termination */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">6. Termination</h2>
          <p>
            We may, in our sole discretion, suspend or terminate your access to the Platform at any time, with or without notice, for any reason, including but not limited to breach of these Terms, suspected illegal activity, extended periods of inactivity, or upon request by law enforcement or government agencies.
          </p>
          <p className="mt-3">
            You may terminate your account at any time by contacting us or using the account deletion feature within the Platform settings. Upon termination, your right to access and use the Platform will immediately cease. Sections of these Terms that by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnification obligations, and limitations of liability.
          </p>
        </section>

        {/* 7. Disclaimers and Limitation of Liability */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">7. Disclaimers and Limitation of Liability</h2>
          <p className="uppercase text-xs text-gray-400">
            THE PLATFORM IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. NIGHTSCROLL DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE PLATFORM OR ITS SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
          <p className="uppercase text-xs text-gray-400 mt-3">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL NIGHTSCROLL, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE PLATFORM, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, EVEN IF NIGHTSCROLL HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p className="uppercase text-xs text-gray-400 mt-3">
            IN JURISDICTIONS THAT DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, NIGHTSCROLL&apos;S LIABILITY SHALL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW. IN NO EVENT SHALL NIGHTSCROLL&apos;S AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS RELATED TO THE PLATFORM EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS (USD $100.00) OR THE AMOUNTS PAID BY YOU TO NIGHTSCROLL IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
          </p>
        </section>

        {/* 8. Indemnification */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">8. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless NightScroll and its officers, directors, employees, agents, affiliates, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising from or relating to: (a) your use of the Platform; (b) your User Content; (c) your violation of these Terms; or (d) your violation of any rights of any third party.
          </p>
        </section>

        {/* 9. Governing Law and Dispute Resolution */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">9. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States of America, without regard to its conflict of law principles. Any legal action or proceeding arising out of or relating to these Terms or the Platform shall be brought exclusively in the federal or state courts located in Wilmington, Delaware, and you hereby irrevocably consent to the personal jurisdiction and venue of such courts.
          </p>
          <p className="mt-3">
            For any dispute or claim arising out of or relating to these Terms, the parties agree to first attempt to resolve the matter through good-faith negotiation for a period of thirty (30) days. If the dispute cannot be resolved through negotiation, either party may pursue binding arbitration administered by the American Arbitration Association in accordance with its Commercial Arbitration Rules.
          </p>
        </section>

        {/* 10. Modifications */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">10. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time in our sole discretion. Material changes will be communicated via the Platform or by email to the address associated with your account. Your continued use of the Platform following the posting of revised Terms constitutes your acceptance of such changes. It is your responsibility to review these Terms periodically.
          </p>
        </section>

        {/* 11. Severability */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">11. Severability</h2>
          <p>
            If any provision of these Terms is found by a court of competent jurisdiction to be invalid, illegal, or unenforceable, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, shall be severed from these Terms, and the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        {/* 12. Contact */}
        <section>
          <h2 className="text-[#D946EF] text-base font-semibold mb-3">12. Contact Information</h2>
          <p>
            If you have questions, concerns, or complaints regarding these Terms or the Platform, please contact us at:
          </p>
          <div className="mt-3 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="font-medium text-white">NightScroll Legal Department</p>
            <p className="mt-1">Email: <span className="text-[#D946EF]">legal@nightscroll.com</span></p>
          </div>
        </section>
      </div>
    </div>
  );
}
