import basicData from "../../utility/basicDatas";

export const metadata = {
  title: 'Emma Fitness - Terms and Conditions',
  description:
    'Discover top-notch gym equipment at Emma Fitness in Sharjah. We specialize in trading high-quality fitness gear, providing a wide range of equipment to elevate your workout experience. Explore our selection and take a step closer to achieving your fitness goals with Emma Fitness today.',
};

function TermsConditions() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-secondary">
        Terms and Conditions
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Use of Our Website</h2>
        <ul className="space-y-2 pl-4 list-disc text-sm leading-relaxed">
          <li>
            <strong>Eligibility:</strong> You must be at least 18 years old or have parental consent to use our website.
          </li>
          <li>
            <strong>Account:</strong> To access certain features, you may need to create an account. Ensure your account information is accurate and up-to-date.
          </li>
          <li>
            <strong>User Responsibilities:</strong> You are responsible for maintaining the confidentiality of your account information and agree to notify us of any unauthorized use.
          </li>
        </ul>
      </section>

      {/* You can add more sections like Privacy Policy, Product Usage, etc. */}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
        <p className="text-sm leading-relaxed">
          These Terms and Conditions are governed by the laws of <strong>United Arab Emirates (UAE)</strong>, without regard to its conflict of law provisions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Changes to Terms and Conditions</h2>
        <p className="text-sm leading-relaxed">
          We reserve the right to update these Terms and Conditions at any time. Any changes will be effective upon posting the revised terms on our website.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p className="text-sm leading-relaxed">
          If you have any questions or concerns regarding our Terms and Conditions, please contact us at{' '}
          <a
            href={basicData.email.slug}
            className="text-secondary underline hover:text-primary"
          >
            {basicData.email.label}
          </a>.
        </p>
      </section>
    </div>
  );
}

export default TermsConditions;
