'use client';

import { ArrowLeft } from 'lucide-react';

interface DMCAPageProps {
  onBack: () => void;
}

export default function DMCAPage({ onBack }: DMCAPageProps) {
  return (
    <div className="h-full overflow-y-auto bg-[#0A0A0A] text-white">
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
          <h1 className="text-lg font-semibold">DMCA Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-lg py-lg pb-[100px] max-w-[600px] mx-auto space-y-xl text-[14px] leading-[1.7] text-[#AAAAAA]">
        <div>
          <p className="text-[12px] text-[#666666]">Last Updated: March 2026</p>
          <p className="mt-md">
            NightScroll (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects the intellectual property rights of others and expects our users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (17 U.S.C. &sect; 512) (&quot;DMCA&quot;), we have adopted the following policy for addressing claims of copyright infringement on the NightScroll platform (the &quot;Platform&quot;).
          </p>
        </div>

        {/* 1. Reporting Copyright Infringement */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">1. Reporting Copyright Infringement (Takedown Notice)</h2>
          <p>
            If you are a copyright owner, or authorized to act on behalf of one, and you believe that content available on the Platform infringes your copyrighted work, you may submit a written notification pursuant to the DMCA to our Designated Agent. Your notification must include all of the following elements to be effective under 17 U.S.C. &sect; 512(c)(3):
          </p>
          <ol className="list-decimal pl-[20px] mt-md space-y-sm text-[#999999]">
            <li>
              <span className="text-gray-300">Physical or Electronic Signature:</span> A physical or electronic signature of the copyright owner or a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
            </li>
            <li>
              <span className="text-gray-300">Identification of Copyrighted Work:</span> Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works on the Platform are covered by a single notification, a representative list of such works.
            </li>
            <li>
              <span className="text-gray-300">Identification of Infringing Material:</span> Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material. Providing URLs in the body of your notification is the most effective way to help us locate the content.
            </li>
            <li>
              <span className="text-gray-300">Contact Information:</span> Information reasonably sufficient to permit us to contact you, including your name, mailing address, telephone number, and email address.
            </li>
            <li>
              <span className="text-gray-300">Good Faith Statement:</span> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              <span className="text-gray-300">Accuracy and Authority Statement:</span> A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
            </li>
          </ol>
          <p className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200/80 text-xs">
            <strong>Warning:</strong> Under 17 U.S.C. &sect; 512(f), any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages, including costs and attorneys&apos; fees incurred by the alleged infringer or by the service provider. Before filing a takedown notice, please ensure you have a good faith basis for your claim.
          </p>
        </section>

        {/* 2. Designated Agent */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">2. Designated Agent</h2>
          <p>
            DMCA takedown notices should be submitted to our Designated Agent at:
          </p>
          <div className="mt-md p-lg bg-[#1A1A1A] rounded-[12px] border border-[#333333]">
            <p className="font-medium text-white">NightScroll DMCA Designated Agent</p>
            <p className="mt-1">Email: <span className="text-[#D946EF]">dmca@nightscroll.com</span></p>
            <p className="mt-1 text-gray-400 text-xs">Please include &quot;DMCA Takedown Notice&quot; in the subject line.</p>
          </div>
          <p className="mt-md">
            Upon receipt of a valid takedown notice, we will expeditiously remove or disable access to the allegedly infringing material and will make a good faith effort to notify the user who posted the content.
          </p>
        </section>

        {/* 3. Counter-Notification */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">3. Counter-Notification Process</h2>
          <p>
            If you believe that material you posted on the Platform was removed or disabled as a result of a mistake or misidentification, you may submit a written counter-notification to our Designated Agent. Your counter-notification must include all of the following elements pursuant to 17 U.S.C. &sect; 512(g)(3):
          </p>
          <ol className="list-decimal pl-[20px] mt-md space-y-sm text-[#999999]">
            <li>
              <span className="text-gray-300">Physical or Electronic Signature:</span> Your physical or electronic signature.
            </li>
            <li>
              <span className="text-gray-300">Identification of Removed Material:</span> Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access was disabled.
            </li>
            <li>
              <span className="text-gray-300">Statement Under Penalty of Perjury:</span> A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled.
            </li>
            <li>
              <span className="text-gray-300">Consent to Jurisdiction:</span> A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located (or if outside the United States, the judicial district in which NightScroll is located) and that you will accept service of process from the person who provided the original takedown notification or an agent of such person.
            </li>
            <li>
              <span className="text-gray-300">Contact Information:</span> Your name, address, and telephone number.
            </li>
          </ol>
          <p className="mt-md">
            Upon receipt of a valid counter-notification, we will promptly forward a copy to the original complainant. If the original complainant does not file a court action seeking to restrain the allegedly infringing activity within ten (10) business days of receiving the counter-notification, we will restore the removed material within ten (10) to fourteen (14) business days after receipt of the counter-notification, unless our Designated Agent first receives notice that the original complainant has filed such action.
          </p>
        </section>

        {/* 4. Repeat Infringer Policy */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">4. Repeat Infringer Policy</h2>
          <p>
            In accordance with the DMCA and other applicable law, NightScroll has adopted a policy of terminating, in appropriate circumstances and at our sole discretion, the accounts of users who are deemed to be repeat infringers. We may also, at our sole discretion, limit access to the Platform and/or terminate the accounts of any users who infringe any intellectual property rights of others, whether or not there is any repeat infringement.
          </p>
          <p className="mt-md">
            Generally, a user will be considered a repeat infringer if they have been the subject of three (3) or more valid takedown notices. However, we reserve the right to terminate accounts after fewer incidents where warranted by the severity or nature of the infringement.
          </p>
        </section>

        {/* 5. Modifications to Copyright Content */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">5. Accommodation of Standard Technical Measures</h2>
          <p>
            NightScroll accommodates and does not interfere with standard technical measures used by copyright owners to identify or protect copyrighted works, as defined in 17 U.S.C. &sect; 512(i)(2).
          </p>
        </section>

        {/* 6. Good Faith */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">6. Good Faith and Misrepresentation</h2>
          <p>
            Please be advised that submitting a DMCA notice or counter-notification carries legal consequences. Before filing, you may wish to consult with an attorney to understand your rights and obligations. Knowingly submitting a false or fraudulent notice or counter-notification may result in liability under 17 U.S.C. &sect; 512(f), including damages and attorneys&apos; fees.
          </p>
        </section>

        {/* 7. Contact */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">7. Contact Information</h2>
          <p>
            For all DMCA-related inquiries, please contact:
          </p>
          <div className="mt-md p-lg bg-[#1A1A1A] rounded-[12px] border border-[#333333]">
            <p className="font-medium text-white">NightScroll DMCA Designated Agent</p>
            <p className="mt-1">Email: <span className="text-[#D946EF]">dmca@nightscroll.com</span></p>
          </div>
        </section>
      </div>
    </div>
  );
}
