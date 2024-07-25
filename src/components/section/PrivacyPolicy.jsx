import { useState } from "react";

const tab = [
  "Account & Payments",
  "Manage Orders",
  "Returns & Refunds",
  "COVID-19",
  "Other",
];

export default function PrivacyPolicy() {
  const [currentTab, setCurrentTab] = useState("Other");

  return (
    <>
      <section className="our-privacy py-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="main-title">
                <h2>Privacy Policy</h2>
                <p className="text"></p>
              </div>
            </div>
          </div>
          <div className="container pb100 pt80 mt-10 pl-4 pr-4 pb-4 mb-0 border border-gray border-top-0 border-bottom-0 bg-light" style={{marginTop: '-50px', paddingTop: 40}}>
  <h4>Your Privacy Rights - Last Updated: January 01, 2022</h4>
  <p>
    SpeakMyDialect respects the privacy of our users and has developed this Privacy Policy to demonstrate its commitment to protecting your privacy. This Privacy Policy is intended to describe for you, as an individual who is a user of www.speakmydialect.com.au (and all websites and URL's controlled or operated by SpeakMyDialect, Inc. which link to this policy, unless otherwise specified) or our services, or otherwise provide us with information through various means the information we collect, how that information may be used, with whom it may be shared, and your choices about such uses and disclosures.
  </p>
  <p>We encourage you to read this Privacy Policy carefully when using our website or services or transacting business with us. By using our website, you are accepting the practices described in this Privacy Policy. SpeakMyDialect is a part of the IAC/InterActiveCorp family of businesses (www.iac.com), which includes Ask.com, Match.com, UrbanSpoon, and many others.</p>
  <p>If you have any questions about our privacy practices, please refer to the end of this Privacy Policy for information on how to contact us.</p>
</div>

          {/* container */}

        </div>
      </section>
    </>
  );
}
