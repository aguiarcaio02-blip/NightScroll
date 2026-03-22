'use client';

import { ArrowLeft } from 'lucide-react';

interface CompliancePageProps {
  onBack: () => void;
}

export default function CompliancePage({ onBack }: CompliancePageProps) {
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
          <h1 className="text-lg font-semibold">2257 Compliance</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-lg py-lg pb-[100px] max-w-[600px] mx-auto space-y-xl text-[14px] leading-[1.7] text-[#AAAAAA]">
        <div>
          <p className="text-[12px] text-[#666666]">Last Updated: March 2026</p>
          <p className="mt-md">
            This statement is made in compliance with 18 U.S.C. &sect; 2257 and 18 U.S.C. &sect; 2257A, and the regulations promulgated thereunder at 28 C.F.R. Part 75, regarding the record-keeping requirements for actual sexually explicit conduct and simulated sexually explicit content.
          </p>
        </div>

        {/* 1. Platform Classification */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">1. Platform Classification and Exemption</h2>
          <p>
            NightScroll (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates as an interactive computer service and user-generated content platform within the meaning of 47 U.S.C. &sect; 230 and 18 U.S.C. &sect; 2257A. The content available on the NightScroll platform (the &quot;Platform&quot;) is created and uploaded by individual users and third-party content creators, not by NightScroll.
          </p>
          <p className="mt-md">
            As the operator of a user-generated content platform, NightScroll is not the &quot;producer&quot; of the content hosted on the Platform within the meaning of 18 U.S.C. &sect; 2257. Accordingly, the primary record-keeping obligations under 18 U.S.C. &sect; 2257 fall upon the individual content creators who produce and upload content to the Platform. NightScroll qualifies for the exemption available to secondary producers and interactive computer services under 18 U.S.C. &sect; 2257A and the applicable regulations.
          </p>
        </section>

        {/* 2. Age Verification */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">2. Age Verification of Content Creators</h2>
          <p>
            Notwithstanding the foregoing exemption, NightScroll is committed to ensuring that all individuals depicted in sexually explicit content on the Platform are at least eighteen (18) years of age. To this end, we maintain a robust age and identity verification program for all content creators:
          </p>
          <ul className="list-disc pl-[20px] mt-md space-y-sm text-[#999999]">
            <li>All content creators must complete an identity verification process before they are permitted to upload content to the Platform.</li>
            <li>Verification requires submission of a valid, unexpired government-issued photo identification document (such as a passport, driver&apos;s license, or national identity card) that confirms the individual is at least eighteen (18) years of age.</li>
            <li>Live selfie verification is performed to confirm that the person submitting the identification is the same individual depicted in the identification document.</li>
            <li>Verification is conducted by NightScroll or through a qualified third-party identity verification service provider.</li>
            <li>Creators are required to reverify periodically and whenever their identification documents expire.</li>
          </ul>
          <p className="mt-md">
            No individual is permitted to appear in sexually explicit content on the Platform without having successfully completed the verification process. Accounts that attempt to upload sexually explicit content without completed verification will be immediately suspended.
          </p>
        </section>

        {/* 3. Records Custodian */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">3. Custodian of Records</h2>
          <p>
            Although NightScroll asserts its exemption under 18 U.S.C. &sect; 2257A as an interactive computer service hosting user-generated content, we voluntarily maintain records relating to the age and identity verification of content creators on the Platform.
          </p>
          <p className="mt-md">
            The Custodian of Records responsible for the maintenance of these records may be reached at:
          </p>
          <div className="mt-md p-lg bg-[#1A1A1A] rounded-[12px] border border-[#333333]">
            <p className="font-medium text-white">NightScroll Custodian of Records</p>
            <p className="mt-1">Email: <span className="text-[#D946EF]">compliance@nightscroll.com</span></p>
            <p className="mt-2 text-[11px] text-[#888888]">Records are maintained at the principal office of NightScroll and are available for inspection during normal business hours as required by applicable law.</p>
          </div>
        </section>

        {/* 4. Content Creator Obligations */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">4. Content Creator Obligations</h2>
          <p>
            All content creators who upload sexually explicit material to the Platform are independently responsible for maintaining their own records in compliance with 18 U.S.C. &sect; 2257. By uploading content to the Platform, each creator represents and warrants that:
          </p>
          <ul className="list-disc pl-[20px] mt-md space-y-sm text-[#999999]">
            <li>All individuals depicted in their content are at least eighteen (18) years of age at the time of creation.</li>
            <li>They have obtained and maintain all records required under 18 U.S.C. &sect; 2257, including proof of age for every individual appearing in sexually explicit content.</li>
            <li>They have obtained the informed, voluntary consent of all individuals depicted in the content for its creation and distribution on the Platform.</li>
            <li>The content does not depict any illegal activity, including but not limited to content involving minors, non-consensual acts, trafficking, or coercion.</li>
          </ul>
        </section>

        {/* 5. Commitment to Removing Illegal Content */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">5. Commitment to Removing Illegal Content</h2>
          <p>
            NightScroll maintains an absolute zero-tolerance policy with respect to child sexual abuse material (CSAM), content involving minors, and any other illegal content. We are committed to the immediate removal of such content from the Platform upon discovery or notification.
          </p>
          <p className="mt-md">
            We employ the following measures to detect and remove illegal content:
          </p>
          <ul className="list-disc pl-[20px] mt-md space-y-sm text-[#999999]">
            <li>Automated content moderation systems, including hash-matching technology (such as PhotoDNA and CSAI Match) to detect known CSAM.</li>
            <li>Manual content review by trained human moderators.</li>
            <li>User reporting mechanisms accessible on every piece of content on the Platform.</li>
            <li>Cooperation with law enforcement agencies, the National Center for Missing &amp; Exploited Children (NCMEC), the Internet Watch Foundation (IWF), and other relevant organizations.</li>
          </ul>
          <p className="mt-md">
            Any content identified as illegal will be removed immediately, the associated account will be permanently terminated, and the matter will be reported to the appropriate law enforcement authorities.
          </p>
        </section>

        {/* 6. Reporting */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">6. Reporting Suspected Illegal Content</h2>
          <p>
            If you encounter any content on the Platform that you believe involves minors, non-consensual activity, trafficking, or any other illegal material, please report it immediately using one of the following methods:
          </p>
          <ul className="list-disc pl-[20px] mt-md space-y-sm text-[#999999]">
            <li><span className="text-gray-300">In-App Reporting:</span> Use the report button available on every piece of content on the Platform. Select the appropriate category for your report.</li>
            <li><span className="text-gray-300">Email:</span> Send a detailed report to <span className="text-[#D946EF]">compliance@nightscroll.com</span> with the subject line &quot;Illegal Content Report.&quot; Include the URL of the content and a description of the violation.</li>
          </ul>
          <p className="mt-md">
            All reports are treated as urgent and will be reviewed by our Trust &amp; Safety team as expeditiously as possible. We also encourage you to report suspected child exploitation directly to:
          </p>
          <ul className="list-disc pl-[20px] mt-md space-y-sm text-[#999999]">
            <li>NCMEC CyberTipline: <span className="text-gray-300">www.missingkids.org/gethelpnow/cybertipline</span></li>
            <li>Your local law enforcement agency</li>
          </ul>
        </section>

        {/* 7. Contact */}
        <section>
          <h2 className="text-[#D946EF] text-[16px] font-bold mb-md">7. Contact Information</h2>
          <p>
            For questions regarding this compliance statement or our verification and record-keeping practices, please contact:
          </p>
          <div className="mt-md p-lg bg-[#1A1A1A] rounded-[12px] border border-[#333333]">
            <p className="font-medium text-white">NightScroll Compliance Department</p>
            <p className="mt-1">Email: <span className="text-[#D946EF]">compliance@nightscroll.com</span></p>
          </div>
        </section>
      </div>
    </div>
  );
}
