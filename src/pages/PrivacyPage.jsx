import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, Eye, Database } from "lucide-react";
import logo from "../assets/logo.png";

const PrivacyPage = () => {
  return (
    <div className='min-h-screen bg-obs-dark text-white selection:bg-obs-mint selection:text-obs-dark'>
      {/* Navigation */}
      <nav className='border-b border-white/10 py-4 sticky top-0 bg-obs-dark/80 backdrop-blur-md z-50'>
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

      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-6 py-16'>
        <header className='mb-12'>
          <h1 className='text-4xl font-extrabold mb-4'>Privacy Policy</h1>
          <p className='text-white/50'>Last updated: February 13, 2026</p>
        </header>

        <section className='space-y-12 text-white/80 leading-relaxed'>
          <div className='p-6 bg-white/5 rounded-2xl border border-white/10 flex gap-4 items-start'>
            <Lock className='text-obs-mint shrink-0' size={24} />
            <p>
              Your privacy is important to us. This policy explains how ObserveX collects, uses, and protects your
              personal information when you use our assessment platform.
            </p>
          </div>

          {/* Section 1 */}
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <Database className='text-obs-mint' size={20} />
              <h2 className='text-2xl font-bold text-white'>1. Information We Collect</h2>
            </div>
            <p>When you register for an account, we collect the following information:</p>
            <ul className='list-disc pl-6 space-y-2 text-white/70'>
              <li>
                <strong>Account Data:</strong> Email address and password.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, and time spent on our assessment modules.
              </li>
              <li>
                <strong>Assessment Data:</strong> Responses to tests, time-per-question, and proctoring logs (if
                enabled).
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <Eye className='text-obs-mint' size={20} />
              <h2 className='text-2xl font-bold text-white'>2. How We Use Your Information</h2>
            </div>
            <p>ObserveX uses the collected data for various purposes:</p>
            <ul className='list-disc pl-6 space-y-2 text-white/70'>
              <li>To provide and maintain our Service.</li>
              <li>To notify you about changes to our software.</li>
              <li>To monitor the integrity of online assessments and prevent cheating.</li>
              <li>To provide customer support and technical assistance.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-white border-b border-white/10 pb-2'>3. Data Security</h2>
            <p>
              The security of your data is a top priority. We use industry-standard encryption (SSL/TLS) to protect your
              information during transmission. However, no method of transmission over the Internet is 100% secure, and
              we cannot guarantee absolute security.
            </p>
          </div>

          {/* Section 4 */}
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-white border-b border-white/10 pb-2'>4. Your Rights</h2>
            <p>
              You have the right to access, update, or delete the information we have on you. If you wish to exercise
              these rights, please contact us using the details below.
            </p>
          </div>

          {/* Contact Section */}
          <div className='mt-16 pt-8 border-t border-white/10'>
            <h2 className='text-2xl font-bold text-obs-mint mb-4'>Contact Us</h2>
            <p className='mb-4'>
              If you have any questions about this Privacy Policy, you can reach our data protection team:
            </p>
            <div className='bg-obs-mint/10 border border-obs-mint/20 p-4 rounded-lg inline-block'>
              <p className='text-obs-mint font-mono'>Phone: 01644411029</p>
            </div>
          </div>
        </section>
      </main>

      <footer className='max-w-4xl mx-auto px-6 py-12 text-center text-white/30 text-sm'>
        &copy; 2026 ObserveX. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPage;
