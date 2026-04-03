import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import logo from "../assets/logo.png";

const TermsPage = () => {
  return (
    <div className='min-h-screen bg-obs-dark text-white selection:bg-obs-mint selection:text-obs-dark'>
      {/* Mini Header */}
      <nav className='border-b border-white/10 py-4'>
        <div className='max-w-4xl mx-auto px-6 flex justify-between items-center'>
          <Link to='/' className='flex items-center gap-2'>
            {/* <div className='bg-obs-mint p-1 rounded'>
              <ShieldCheck className='text-obs-dark w-5 h-5' />
            </div> */}
            <img src={logo} alt='ObserveX Logo' className='w-10 h-10' />
            <span className='font-bold tracking-tight'>ObserveX</span>
          </Link>
          <Link to='/signup' className='text-sm text-obs-mint hover:underline flex items-center gap-1'>
            <ArrowLeft size={14} /> Back to Sign up
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className='max-w-4xl mx-auto px-6 py-16'>
        <article className='prose prose-invert prose-mint max-w-none'>
          <h1 className='text-4xl font-extrabold mb-2'>Terms and Conditions</h1>
          <p className='text-white/50 mb-12'>Last updated: February 13, 2026</p>

          <section className='space-y-8 text-white/80 leading-relaxed'>
            <p>Please read these terms and conditions carefully before using Our Service.</p>

            <h2 className='text-2xl font-bold text-obs-mint mt-10 border-b border-white/10 pb-2'>
              Interpretation and Definitions
            </h2>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold text-white'>Interpretation</h3>
              <p>
                The words whose initial letters are capitalized have meanings defined under the following conditions.
                The following definitions shall have the same meaning regardless of whether they appear in singular or
                in plural.
              </p>

              <h3 className='text-xl font-semibold text-white'>Definitions</h3>
              <p>For the purposes of these Terms and Conditions:</p>
              <ul className='list-disc pl-6 space-y-4'>
                <li>
                  <strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control
                  with a party...
                </li>
                <li>
                  <strong>Country</strong> refers to: Bangladesh
                </li>
                <li>
                  <strong>Company</strong> (referred to as &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or
                  &quot;Our&quot;) refers to ObserveX.
                </li>
                <li>
                  <strong>Service</strong> refers to the Website.
                </li>
                <li>
                  <strong>Website</strong> refers to ObserveX, accessible from{" "}
                  <span className='text-obs-mint'>http://localhost:5173/</span>
                </li>
                <li>
                  <strong>You</strong> means the individual accessing or using the Service.
                </li>
              </ul>
            </div>

            <h2 className='text-2xl font-bold text-obs-mint mt-10 border-b border-white/10 pb-2'>Acknowledgment</h2>
            <p>
              These are the Terms and Conditions governing the use of this Service and the agreement between You and the
              Company. By accessing or using the Service You agree to be bound by these Terms and Conditions.
            </p>
            <p>
              You represent that you are over the age of 18. The Company does not permit those under 18 to use the
              Service.
            </p>

            <h2 className='text-2xl font-bold text-obs-mint mt-10 border-b border-white/10 pb-2'>Termination</h2>
            <p>
              We may terminate or suspend Your access immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if You breach these Terms and Conditions.
            </p>

            <h2 className='text-2xl font-bold text-obs-mint mt-10 border-b border-white/10 pb-2'>
              Limitation of Liability
            </h2>
            <p className='bg-white/5 p-6 rounded-lg border border-white/10 italic'>
              To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be
              liable for any special, incidental, indirect, or consequential damages whatsoever...
            </p>

            <h2 className='text-2xl font-bold text-obs-mint mt-10 border-b border-white/10 pb-2'>Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
            <ul className='list-none space-y-2'>
              <div className='bg-obs-mint/10 border border-obs-mint/20 p-4 rounded-lg inline-block'>
                <p className='text-obs-mint font-mono'>Phone: 01644411029</p>
              </div>
            </ul>
          </section>
        </article>
      </main>

      <footer className='max-w-4xl mx-auto px-6 py-12 border-t border-white/10 text-center text-white/40 text-sm'>
        &copy; 2026 ObserveX. All rights reserved.
      </footer>
    </div>
  );
};

export default TermsPage;
