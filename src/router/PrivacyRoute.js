/* eslint-disable max-len, react/no-unescaped-entities */
import { PureComponent } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button, RichText } from "../components"
import {
  disableOptionalStorage,
  enableOptionalStorage,
} from "../redux/actions/storage"
import { getOptionalStorageDisabled } from "../redux/selectors/storage"
import { ANCHOR_COOKIE_POLICY } from "./routeConstants"
import { StyledRichTextContainer } from "../global/styles/Containers"

class PrivacyRoute extends PureComponent {
  getStorageConsentButton() {
    const {
      enableOptionalStorage,
      disableOptionalStorage,
      optionalStorageDisabled,
    } = this.props

    return optionalStorageDisabled ? (
      <p>
        <Button onClick={enableOptionalStorage} primary>
          Opt in
        </Button>{" "}
        to Convose non-essential storage.
      </p>
    ) : (
      <p>
        <Button onClick={disableOptionalStorage} primary>
          Opt out
        </Button>{" "}
        of Convose non-essential storage.
      </p>
    )
  }

  render() {
    return (
      <StyledRichTextContainer>
        <RichText>
          <section>
            <h1>Convose's Privacy Policy</h1>
            <p>
              This policy and any dispute or claim arising out of or in
              connection with it or its subject matter (including
              non-contractual disputes or claims) shall be governed by and
              construed in accordance with English law. In the event there is a
              discrepancy between this English language version and any
              translated copies of the Privacy Policy, the English version shall
              prevail.
            </p>
          </section>
          <section>
            <h2>What’s this all about then?</h2>
            <p>
              Hello (again, if you clicked through to here from our Terms and
              Conditions of Use). You should read this privacy policy because it
              will tell you exactly how your personal data is being looked after
              by Convose and that’s a pretty important thing for you to know.
              Here are the topics that we cover:
            </p>
            <ol>
              <li>What information we collect and how we collect it</li>
              <li>How we use the information and who we share it with</li>
              <li>How you can access and update such information</li>
              <li>How we protect the information we store about you</li>
            </ol>
          </section>
          <section>
            <h2>Who we are</h2>
            <p>
              Convose is operated by Convose UG (limited liability), a company
              registered in Germany at Lindauer allee 15, Berlin 13407 and
              company number HRB 200770.
            </p>
          </section>
          <section>
            <h2>The full legal bit</h2>
            <p>
              We know that other people’s use of your personal data is a big
              concern for social network users, so we at Convose have developed
              this privacy policy (the “Policy”) to let you know how we use
              personal information (‘personal data’ or ‘personal information’).
            </p>
            <p>
              Our Policy applies to your use of the Convose website at
              www.Convose.com (“Convose” or the “site” which includes the mobile
              apps). We suggest you read it in conjunction with our Terms and
              Conditions of Use (the “Terms”). When you access or use Convose,
              you agree to our Privacy Policy and you consent to our collection,
              storage, use and disclosure of your personal information as we’ve
              set out in this Policy.
            </p>
            <p>
              Convose reserves the right to change our Policy at any time and
              without notice, so be sure to check this Policy regularly to
              understand how we use your information.
            </p>
            <p>
              IF YOU DO NOT ACCEPT AND AGREE WITH OUR PRIVACY POLICY THEN YOU
              MUST NOT ACCESS OR USE THE SITE.
            </p>
          </section>
          <h2>1. Convose users and visitors to our site</h2>
          <section>
            <h3>
              What information does Convose collect if I decide to join the
              Convose social community?
            </h3>
            <p>
              Convose is a meeting place for adults, and we provide that service
              by operating a social network site offering users the opportunity
              to connect to our global community of users.
            </p>
            <p>
              To join the Convose network you will have to fill in your
              interests (these can include locations, languages, hobbies, etc,),
              after you signup, you also have the opportunity to provide other
              details about yourself such as a user name and a profile picture /
              avatar, all information you provide about yourself (other than the
              required two languages and two interests to start) is optional.
              These details are available to you at any time by accessing your
              “Profile” page and through the interests list and input field,
              which gives you the chance to correct or update your information
              at any time.
            </p>
            <p>
              Upon entering Convose, we will track your location (if you allow
              us to). We may also from time to time allow our employees to use
              the product for testing and user engagement purposes.
            </p>
            <p>
              For safety and security and to ensure you have the best possible
              user experience, we require users to verify their accounts
              (because we want to make sure you are not a robot!) and might ask
              for your phone number. Don’t worry! This is only to make sure you
              are real and breathing!
            </p>
          </section>
          <section>
            <h3>
              What information does Convose collect about me if I’m under 18?
            </h3>
            <p>
              You can only use Convose if you are aged 18 or over or the age of
              majority in the country in which you reside if that happens to be
              greater than 18. That means Convose does not knowingly collect any
              information about children, minors or anyone under the age of
              majority. Nor do we knowingly market to children, minors or anyone
              under the age of 18. If you are less than 18 years old, we request
              that you do not submit information to us. If we become aware that
              a child, minor or anyone under the age of 18 is using Convose and
              provided us with personal information, we will take steps to
              terminate that person’s registration and delete their Profile
              information from Convose. If we do delete a Profile because you
              violated our no children rules, we may retain your email and IP
              address to ensure that you do not try to get around our rules by
              creating a new Profile.
            </p>
          </section>
          <section>
            <h3>
              Does Convose collect my personal information if I am not a member
              and just visit the site?
            </h3>
            <p>
              Convose guests are required to enter two languages and two other
              interests, all other information is optional. If you do visit us
              without becoming a member, we will place session ID cookies on
              your computer. For more information about cookies generally, look
              at the answer to “How does Convose collect information about me?”
              below.
            </p>
          </section>
          <section>
            <h3>
              If I put additional information about me on the site, what does
              Convose do with it?
            </h3>
            <p>
              Convose is designed to make it easy for you to find people who
              bring value to your life and who’s life you bring value to too,
              all information will be used for this purpose. When using the App
              you should assume that any content you enter (including interests,
              username and avatar) will be publicly viewable and accessible,
              both by Users of the App and non-Users of the App. We recommend
              and encourage you (and all our members) to think carefully about
              the information you disclose about yourself. We also do not
              recommend that you put email addresses, URLs, instant messaging
              details, phone numbers, full names or addresses, credit card
              details, national identity numbers, drivers’ licence details and
              other sensitive information in your Profile which is open to abuse
              and misuse.
            </p>
            <p>
              Please be careful about posting sensitive details about yourself
              on you Profile such as your religious denomination and health
              details. While you may voluntarily provide this information to us
              when you create your Profile, including your sexual preferences
              and ethnic background, there is no requirement to do so. Please
              remember that photographs or any video clips that you upload or
              send on Convose may reveal these kinds of sensitive personal data.
              Where you do choose to enter/give us sensitive information about
              yourself, you are explicitly consenting to our processing your
              information and making this public to other users.
            </p>
            <p>
              When you enter in or send personal information information on
              Convose the amount of personal information you share is at your
              own risk. If you post anything that is inconsistent with our Terms
              and Conditions of Use, we reserve the right to terminate your
              account.
            </p>
          </section>
          <section>
            <h3>What does Convose collect about me if I use the mobile app?</h3>
            <p>
              Convose offers you the opportunity to stay in touch with the
              friends and contacts you’ve made and keep looking for new
              beneficial connections no matter where you are using your mobile
              phone.
            </p>
            <p>
              When you use your mobile, we will collect information about WiFi
              access points as well as other location information about your
              longitude and latitude. That information helps us identify your
              physical location so that it can be used to connect you with other
              Convose users who are more relevant to you.
            </p>
            <p>
              If you do not want your location to be known you can turn of
              location services by the following methods:
            </p>
            <ol>
              <li>Iphone app — settings, location services, off</li>
              <li>Android — profile, privacy, on</li>
            </ol>
          </section>
          <section>
            <h3>
              When I register using facebook or email can Convose collect or
              share information from or with these sources?
            </h3>
            <p>
              When signing up with Facebook we take the following information
              from your Facebook account:
            </p>
            <ol>
              <li>Email</li>
              <li>Location</li>
              <li>Facebook ID</li>
              <li>Facebook Link</li>
              <li>Gender</li>
              <li>Timezone</li>
            </ol>
            <p>
              We share no Convose entered information with Facebook (e.g., your
              interests or the information on people you are talking with).
            </p>
            <p>
              However, when you register with Facebook, you may also be giving
              Facebook personal information, so we recommend that you read their
              privacy policies as Convose does not control how they use their
              information.
            </p>
          </section>
          <section>
            <h3>
              Does Convose collect any other personal information about me?
            </h3>
            <p>
              If you contact our Customer Support team (by emailing:
              <a href="mailto:convoseteam@gmail.com">
                convoseteam@gmail.com
              </a>{" "}
              or through any feedback page we set up in the future), we will
              receive your email address, and may track your IP address as well
              as the information you send to us to help resolve your query. We
              will keep records of our communications with you, including any
              complaints that we receive from you about other users (and from
              other users about you).
            </p>
          </section>
          <section>
            <h3>Will Convose contact me?</h3>
            <p>
              By Signing up you automatically allow Convose to send you new
              emails telling you about new messages, chat requests or other
              purposes related to the use of the website to your email. Your
              email will not be visible or accessible by other users of Convose.
            </p>
          </section>
          <section>
            <h3>
              Does Convose use my personal information for any other purpose?
            </h3>
            <p>
              We may use material that you upload or enter on Convose in
              advertising and promotional materials. We believe these uses allow
              us to improve our site and better tailor your online experience to
              meet your needs.
            </p>
            <p>
              We use your personal information to resolve disputes, troubleshoot
              problems and enforce our Terms and Conditions of Use.
            </p>
          </section>
          <h2 id={ANCHOR_COOKIE_POLICY}>2. Convose Cookies Policy</h2>
          <section>
            <h3>What are 'cookies' and what 'cookies' does Convose use?</h3>
            <p>
              We collect information by placing cookies on your computer or
              mobile. A cookie is a piece of text stored on your computer or
              mobile by your web browser. They are basically a tool that stores
              information about website visits, recognises you and your
              preferences each time you visit Convose, and ensures site
              functionality and enables us to provide the services our members
              request.
            </p>
            <p>
              When you visit Convose as a guest, a session ID cookie is placed
              on your computer that only lasts while you’re visiting. We also
              place persistent cookies (also known as local storage devices) on
              members’ computers, so that Convose remembers them and makes their
              login experience faster and easier. We may use persistent tracking
              cookies, for security protection purposes, such as to prevent
              phishers, scammers, unauthorised login attempts, and to help you
              access your hacked account.
            </p>
            <p>
              You may set your browser and your mobile settings to block cookies
              and local storage devices, but if you do so, you may not be able
              to access the features that Convose offers.
            </p>
            <p>
              Convose uses cookies and local storage devices for a number of
              reasons, including to ensure the security of our site, to provide
              you with features you have requested and to analyse how members
              and visitors use Convose. Convose’s use of cookies and local
              storage devices basically falls into these categories:
            </p>
            <ul>
              <li>
                those that are strictly necessary to deliver the services and
                products you have requested.
              </li>
              <li>
                cookies related to the performance of Convose’s site, such as
                analytics that help us determine how our site is performing and
                ensuring a smooth and trouble free experience for our members
                and visitors
              </li>
              <li>
                cookies related to the functionality of Convose’s site, such as
                allowing you to chat, add photos and instant message Convose
                members
              </li>
              <li>
                third parties cookies that also relate to functionality and that
                you request via social plugins, links to other social networks
                or viewing of videos
              </li>
            </ul>
            <p>
              Convose’s uses cookies so that we know who you are, what interests
              you and so that you can do the things online that you want to do,
              like chat with new people, knowing that your data will be secure.
              Below is a list of the various cookie functions and why they’re
              used:
            </p>
            <p>
              <strong>Analytics and research:</strong> Convose uses Google
              Analytics and Amplitude to collect information about how visitors
              use the Convose platform. We use the information to compile
              reports and to help us improve the platform. The cookies collect
              information in an anonymous form, including the number of visitors
              to the platform, where visitors have come to the platform from and
              the sections of Convose they visited. For more information about
              Google’s privacy policy, please visit
              http://www.google.com/intl/en/policies/
            </p>
            <p>
              Convose also uses Facebook Pixel to collect information about how
              visitors use the Convose platform. We use the information to
              compile reports and to help us improve the platform. The cookies
              collect information in an anonymous form, including the number of
              visitors to the platform, where visitors have come to the platform
              from and the sections of the platform they visited. For more
              information about Facebook’s privacy policy, please visit
              https://www.facebook.com/policy.php
            </p>
            <p>
              <strong>Authentication:</strong> These cookies help us to identify
              our users so that when you’re logged in, you can enjoy Convose’s
              offerings, experiences and various features, such as uploading
              photographs, chatting and can localise your experience, such as
              when you’ve requested to view Convose’s site in your local
              language. These cookies also help to remember who you already
              talked with on Convose.
            </p>
            <p>
              <strong>Security and site integrity:</strong> We use cookies and
              other devices, such as CAPTCHAs, to help keep Convose and our
              members safe and secure. These cookies do things like protect
              Convose users from spam and fraud.
            </p>
            <p>
              We may use persistent cookies, which will help us to ensure we
              have identified the same device is logging into the correct
              account. These types of cookies also help with our anti-spam
              measures and may help us to prevent phishers, scammers,
              unauthorised login attempts to your account and accessing any
              hacked accounts.
            </p>
            <p>
              <strong>Site features and services:</strong> These cookies and
              local storage devices provide the functionality that our Convose
              members enjoy, such as uploading photographs, chatting, changing
              your account settings and your request to have Convose as your
              homepage or your search preference. We also use cookies to help
              provide experiences, such as links to other social media sites,
              social plugins and video content, including making it easier for
              you to share content between Convose with your other favourite
              social networks.
            </p>
            <p>
              In some cases, the site feature you choose may allow a third party
              to place cookies or local storage devices on your computer. The
              third party who places cookies on your device is responsible for
              how they process their data and Convose recommends that you read
              their privacy policies. Third parties who place cookies on your
              device when you use Convose include, and we have included a link
              to their privacy policies: Facebook:
              <a
                href="http://www.facebook.com/about/privacy/your-info-on-other#socialplugin"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://www.facebook.com/about/privacy/your-info-on-other#socialplugin
              </a>
            </p>
            <p>
              <strong>Performance:</strong> We need to use certain cookies and
              local storage devices to ensure our members have the best possible
              experience, such assisting with your navigation of our site,
              ensuring pages load up quickly and respond faster to your requests
              for Convose services.
            </p>
            <p>
              Our use of cookies and local share devices, including the specific
              cookie names, may change over time, but will generally fall into
              the above categories. Please visit this page regularly so that you
              are aware of any changes.
              <br />
              If you would like to know more about cookies, including flash
              cookies/local storage devices, the following websites provide
              useful information:
              <br />
              <a
                href="http://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.allaboutcookies.org
              </a>
              <br />
              <a
                href="http://www.youronlinechoices.eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.youronlinechoices.eu
              </a>
              <br />
              For a video about cookies visit{" "}
              <a
                href="http://www.google.co.uk/goodtoknow/data-on-the-web/cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.google.co.uk/goodtoknow/data-on-the-web/cookies
              </a>
            </p>
          </section>
          <section>
            <h3>How can I opt-out of non-essential Cookies/Storage?</h3>
            <p>
              To change your Convose non-essential Cookie opt-out preference,
              please click this button:
            </p>
            {this.getStorageConsentButton()}
          </section>
          <h2>3. Other Convose users</h2>
          <section>
            <h3>
              When I put information about myself on Convose, what do the other
              users see?
            </h3>
            <p>
              To ensure that Convose is able to connect you to as many relevant
              and beneficial people as possible all users are able to see any
              information you put in your profile and any interests you insert
              through the interest input field. Any information you choose to
              provide should reflect how much you want other Convose members to
              know about you.
            </p>
          </section>
          <section>
            <h3>
              What am I allowed to do with other user’s personal information?
            </h3>
            <p>
              If other Convose users are sharing personal information it is
              because they want to better connect with the people on Convose.
              You may not use other users' information for commercial purposes,
              to spam, to harass, or to make unlawful threats. Convose reserves
              the right to terminate the accounts of those who misuse other
              users' information or who otherwise violate the Terms and
              Conditions of Use.
            </p>
          </section>
          <section>
            <h3>
              What information does Convose collect about my friends and
              contacts if I connect with Facebook?
            </h3>
            <p>
              Convose will only collect information on your Facebook friends if
              you allow Convose to do so, this will make sure that they also get
              the benefits of meeting the diverse range of people on Convose. If
              you want to invite your facebook friends to use Convose you can do
              it through the pop ups that will occasionally pop up within the
              application after you signup. If any of the individuals you have
              invited do not register within a few days, Convose may
              occasionally send reminder emails on your behalf to those
              individuals. You can choose to invite all your friends or only a
              select few by simply unticking the names of those friends you do
              not wish to invite, but please remember you must not invite any
              children to join. You are responsible for ensuring that your
              friend has agreed to receiving a Convose invite.
            </p>
            <p>
              When you import your contacts, Convose does not sell these email
              addresses or mobile numbers or use them to send any other
              communication besides email invitations. The friend may contact
              Convose to request the removal of their information from our
              database by visiting Feedback page. Any such request will only
              apply to addresses or mobile numbers we have at the time of the
              request and not to any addresses that the member/user provides to
              us later.
            </p>
          </section>
          <h2>4. Third parties</h2>
          <section>
            <h3>Does Convose sell my information to other parties?</h3>
            <p>
              Not at all. We do not sell or rent out any personal information
              about you to any third party. Convose discloses aggregated
              non-personal data for marketing and promotional purposes. That
              means we do not disclose any information that could be used to
              identify you.
            </p>
          </section>
          <section>
            <h3>Does Convose disclose my information to other parties?</h3>
            <p>
              We may share aggregated information with other parties, including
              log data with third parties for industry analysis and demographic
              profiling and to deliver targeted advertising about other products
              and services.
            </p>
            <p>
              In particular, in relation to targeted advertising, we use
              third-party advertising companies to serve ads when you visit our
              Website. These companies may use information about your visits to
              this and other websites in order to provide advertisements about
              goods and services of interest to you.
            </p>
            <p>
              We may share your information with vendors, service providers, and
              other carefully selected third parties to improve our services to
              you, such as by facilitating payments. We ensure these parties
              must adhere to strict data protection and confidentiality
              provisions that are consistent with this Privacy Policy.
            </p>
            <p>
              Convose also wishes to maintain a healthy community, and we will
              cooperate with all law enforcement inquiries and with all third
              parties to enforce their intellectual property or other rights. We
              may also disclose your personal information to government or law
              enforcement agencies, or private parties, as required by law
              when/or, in our sole discretion, we believe that disclosure is
              necessary to protect our legal rights, or those of third parties
              and/or to comply with a judicial proceeding, court order, or legal
              process served on us.
            </p>
            <p>
              In the event that Convose or any of its affiliates undergoes a
              business transition or change of ownership, such as a merger,
              acquisition by another company, re-organisation, or sale of all or
              a portion of its assets, or in the event of insolvency or
              administration, we may be required to disclose your personal
              information.
            </p>
          </section>
          <h2>5. Data storage</h2>
          <section>
            <h3>Where is my personal information kept?</h3>
            <p>
              Convose is a global website. If you live in a country with data
              protection laws, the storage of your personal data may not provide
              you with the same protections as you enjoy in your country of
              residence. By submitting your personal information, applications
              provided by Convose, you agree to the transfer of your personal
              information to, and storage and processing of your personal
              information in, any such countries and destinations.
            </p>
          </section>
          <h2>6. Security</h2>
          <section>
            <h3>How does Convose protect my personal information?</h3>
            <p>
              Convose has implemented reasonable and appropriate security
              measures to protect and prevent the loss, misuse, and alteration
              of the information under our control, including your personal
              information. Convose uses reasonable security measures to
              safeguard the confidentiality of your personal information such as
              secured servers using firewalls. Our technical experts at Convose
              work hard to ensure your secure use of our site.
            </p>
            <p>
              While we take reasonable precautions against possible security
              breaches of our website, member database and records no website or
              Internet transmission is completely secure and we cannot guarantee
              that unauthorised access, hacking, data loss, or other breaches
              will never occur. We urge you to take steps to keep your personal
              information safe (including your password) and to log out of your
              account after use.
            </p>
            <p>
              We cannot guarantee the security of your personal data while it is
              being transmitted to our site and any transmission is at your own
              risk. Once we have received your information we have procedures
              and security features in place to try to prevent unauthorised
              access.
            </p>
          </section>
          <section>
            <h3>How do I help keep my information secure?</h3>
            <p>
              You may not disclose your password to any third parties or share
              it with any third parties. If you lose your password or give it
              out, your personal information may be compromised. If that
              happens, please report it to Support via Feedback page. You must
              change your password via your “Settings” page or reset it via the
              login button on the landing page immediately. Convose cannot be
              held responsible for your failure to keep your password secure and
              failure to do so may violate our Terms and Conditions of Use.
            </p>
          </section>
          <h2>7. Your rights</h2>
          <section>
            <h3>How do I change my information?</h3>
            <p>
              You can review and revise your profile information at any time
              after signing up and your interests list even before signing up.
              This information includes but is not limited to your:
            </p>
            <ul>
              <li>
                Interests (including locations, languages, hobbies, passions,
                skills, occupations, etc)
              </li>
              <li>Username</li>
              <li>Avatar</li>
              <li>Your password</li>
            </ul>
            <p>
              Please promptly update your information if it changes by
              signing-in to your account and following the screen prompts. We
              strongly urge you to periodically change your password to help
              reduce the risk of unauthorised access to your account
              information.
            </p>
            <p>
              Users in certain jurisdictions are, in accordance with applicable
              law, entitled to exercise a right of access to personal
              information about themselves by asking for a copy of the
              information we hold about them (for which, where allowed by law,
              we may charge a small fee). Please put any such request in writing
              to
              <a href="mailto:convoseteam@gmail.com">convoseteam@gmail.com</a>
            </p>
          </section>
          <section>
            <h3>Can I deactivate or delete my Profile?</h3>
            <p>
              Yes, if you would like to delete your profile from convose please
              email us at:
              <a href="mailto:convoseteam@gmail.com">convoseteam@gmail.com</a>
            </p>
            <p>
              This means that no user will be able to search for you on the
              website using any information about you and will not be able to
              see any information about you. Your information may still be
              visible from direct cached links.
            </p>
            <p>
              To prevent abuse and/or misuse of Convose by a user following
              deletion of information we may retain such information as we deem
              in our sole discretion may be necessary to ensure that user does
              not open a new account and profile in breach of our Terms and
              Conditions of Use and to ensure compliance with all laws and
              regulations.
            </p>
            <p>
              Warning: Even after you remove information from your profile or
              interests list or close chats, copies of that information may
              still be viewable and/or accessed on the Internet to the extent
              such information has been previously shared with others, or copied
              or stored by other users or to the extent such information has
              been shared with search engines. We cannot control this, nor do we
              accept any liability for this. If you have given third party
              applications or websites access to your personal information they
              may retain such information to the extent permitted under their
              terms of service or privacy policies.
            </p>
            <p>
              Removed and deleted information may persist in backup copies for
              up to 30 days to enable restoration, but will not be available to
              others in the meantime.
            </p>
          </section>
          <section>
            <h3>What happens if I do nothing?</h3>
            <p>
              If you have not signed in to Convose for three months, we may
              remove your Profile as part of our data cleansing process.
            </p>
            <p>
              Your Convose account is non-transferable and any rights to your
              profile or contents within your account will be cancelled upon
              your death.
            </p>
            <p>
              If you have questions about our Privacy Policy or how we collect
              and use information, drop us a line send us an email to:
              <a href="mailto:convoseteam@gmail.com">convoseteam@gmail.com</a>
            </p>
            <p>This Privacy Policy was last updated on 9th of July 2020.</p>
            <p style={{ textAlign: "right" }}>
              Convose attributes En Min (Akindo) Shen and Pablo Stanley with the
              artworks throughout the Convose platform. <br />
              Artworks from these artists have been slightly adjusted from how
              they were originally given.
            </p>
          </section>
        </RichText>
      </StyledRichTextContainer>
    )
  }
}

PrivacyRoute.propTypes = {
  enableOptionalStorage: PropTypes.func.isRequired,
  disableOptionalStorage: PropTypes.func.isRequired,
  optionalStorageDisabled: PropTypes.bool.isRequired,
}

const mapActionsToProps = {
  enableOptionalStorage,
  disableOptionalStorage,
}

const mapStateToProps = () => (state, props) => ({
  ...props,
  optionalStorageDisabled: getOptionalStorageDisabled(state),
})

export default connect(mapStateToProps, mapActionsToProps)(PrivacyRoute)
