import basicData from "../../utility/basicDatas"

export const metadata = {
    title: 'Emma Fitness - Terms and Conditions',
    description: 'Discover top-notch gym equipment at Emma Fitness in Sharjah. We specialize in trading high-quality fitness gear, providing a wide range of equipment to elevate your workout experience. Explore our selection and take a step closer to achieving your fitness goals with Emma Fitness today.',
}

function TermsConditions() {
    return (
        <div>
   
  
        <h1>Terms and Conditions</h1>
  
        <section>
          <h2>1. Use of Our Website</h2>
          <p>
            1.1 <strong>Eligibility:</strong> You must be at least 18 years old or have parental consent to use our website.
          </p>
          <p>
            1.2 <strong>Account:</strong> To access certain features, you may need to create an account. Ensure your account information is accurate and up-to-date.
          </p>
          <p>
            1.3 <strong>User Responsibilities:</strong> You are responsible for maintaining the confidentiality of your account information and agree to notify us of any unauthorized use.
          </p>
        </section>
  
        {/* Include other sections as needed */}
  
        <section>
          <h2>7. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of [Your Country/State], without regard to its conflict of law provisions.
          </p>
        </section>
  
        <section>
          <h2>8. Changes to Terms and Conditions</h2>
          <p>
            We reserve the right to update these Terms and Conditions. Any changes will be effective upon posting the revised terms on our website.
          </p>
        </section>
  
        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our Terms and Conditions, please contact us at{' '}
            <a href={basicData.email.slug}>{basicData.email.label}</a>.
          </p>
        </section>
      </div>
    )
}

export default TermsConditions