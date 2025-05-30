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
      <section className="our-privacy py-10 mt15">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="main-title">
                  <h2>Privacy Policy</h2>
                <p className="text"></p>
              </div>
            </div>
          </div>
          <div
            className="container pb100 pt  mt-5 pl-4 pr-4 pb-2 mb-0 border border-gray border-top-0 border-bottom-0 bg-light"
            style={{ marginTop: "-50px", paddingTop: 40 }}
          >
            <main> 
              <p>
                Speakmydialect is committed to providing quality services to you
                and this policy outlines our ongoing obligations to you in
                respect of how we manage your Personal Information.
              </p>

              <p>
                A copy of the Australian Privacy Principles may be obtained from
                the website of The Office of the Australian Information
                Commissioner at{" "}
                <a
                  href="https://www.oaic.gov.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.oaic.gov.au/
                </a>
                .
              </p>

              <h4>What is Personal Information and why do we collect it?</h4>
              <p>
                Personal Information is information or an opinion that
                identifies an individual. Speakmydialect will collect
                information from you when you register on our site or fill out a
                form. When registering on our site, as appropriate, you may be
                asked to enter your name, e-mail address, mailing address, phone
                number, images and other personal information.
              </p>

              <p>
                We collect your Personal Information for the primary purpose of
                providing our services to you, providing information to our
                clients and marketing. We may also use your Personal Information
                for secondary purposes closely related to the primary purpose,
                in circumstances where you would reasonably expect such use or
                disclosure. You may unsubscribe from our mailing/marketing lists
                at any time by contacting us in writing.
              </p>

              <p>
                When we collect Personal Information we will, where appropriate
                and where possible, explain to you why we are collecting the
                information and how we plan to use it.
              </p>

              <h4>Third Parties</h4>
              <p>
                Where reasonable and practicable to do so, we will collect your
                Personal Information only from you. However, in some
                circumstances we may be provided with information by third
                parties. In such a case we will take reasonable steps to ensure
                that you are made aware of the information provided to us by the
                third party.
              </p>

              <h4>Disclosure of Personal Information</h4>
              <p>
                We do not sell, trade, or otherwise transfer to outside parties
                your personally identifiable information. This does not include
                trusted third parties who assist us in operating our website,
                conducting our business, or servicing you, so long as those
                parties agree to keep this information confidential.
              </p>

              <p>
                Your Personal Information may be disclosed in a number of
                circumstances including the following:
              </p>
              <ul>
                <li>
                  Third parties where you consent to the use or disclosure; and
                </li>
                <li>Where required or authorised by law.</li>
              </ul>

              <h4>Security of Personal Information</h4>
              <p>
                Your Personal Information is stored in a manner that reasonably
                protects it from misuse and loss and from unauthorised access,
                modification or disclosure.
              </p>
              <p>
                When your Personal Information is no longer needed for the
                purpose for which it was obtained, we will take reasonable steps
                to destroy or permanently de-identify your Personal Information.
              </p>

              <h4>Access to your Personal Information</h4>
              <p>
                You may access the Personal Information we hold about you and to
                update and/or correct it, subject to certain exceptions. If you
                wish to access your Personal Information, please contact us in
                writing.
              </p>
              <p>
                In order to protect your Personal Information we may require
                identification from you before releasing the requested
                information.
              </p>

              <h4>Maintaining the Quality of your Personal Information</h4>
              <p>
                It is important to us that your Personal Information is up to
                date. We will take reasonable steps to make sure that your
                Personal Information is accurate, complete and up-to-date. If
                you find that the information we have is not up to date or is
                inaccurate, please advise us as soon as practicable so we can
                update our records and ensure we can continue to provide quality
                services to you.
              </p>

              <h4>Policy Updates</h4>
              <p>
                This Policy may change from time to time and is available on our
                website.
              </p>

              <h4>Privacy Policy Complaints and Enquiries</h4>
              <p>
                If you have any queries or complaints about our Privacy Policy
                please contact us at{" "}
                <a href="mailto:speakmydialect@gmail.com">
                  speakmydialect@gmail.com
                </a>
                .
              </p>
            </main>
          </div>

          {/* container */}
        </div>
      </section>
    </>
  );
}
