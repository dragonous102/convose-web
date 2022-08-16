/* eslint-disable max-len, react/no-unescaped-entities */
import { PureComponent } from "react"
import { RichText } from "../components"
import { StyledRichTextContainer } from "../global/styles/Containers"

class ImprintRoute extends PureComponent {
  render() {
    return (
      <StyledRichTextContainer>
        <RichText>
          <h1>Imprint</h1>
          <section>
            <h2>Legal Disclosure</h2>
            <p>
              Information in accordance with Section 5 TMG
              <br />
              Convose
              <br />
              Lindauer Allee 15
              <br />
              c / o Buranov
              <br />
              13407 Berlin
              <br />
            </p>
          </section>
          <section>
            <h2>Represented by</h2>
            <p>Joshua St John Whitaker</p>
          </section>
          <section>
            <h2>Contact Information</h2>
            <p>
              Telephone: <a href="tel:+4915753753467">+4915753753467</a>
              <br />
              E-mail: <a href="mailto:Josh@convose.com">Josh@convose.com</a>
              <br />
              Internet address:{" "}
              <a href="http://wwww.convose.com">www.convose.com</a>
              <br />
            </p>
          </section>
          <section>
            <h2>Register entry</h2>
            <p>
              Entry in: Germany
              <br />
              Commercial Register Number: HRB 200770 B
              <br />
              Register Court: Amtsgericht Charlottenburg
              <br />
            </p>
          </section>
          <section>
            <h2>Capital</h2>
            <p>Initial or original capital: 1 €</p>
          </section>
          <section>
            <h2>Disclaimer</h2>
            <h3>Accountability for content</h3>
            <p>
              The contents of our pages have been created with utmost care.
              However, we can not guarantee the contents' accuracy, completeness
              or topicality. According to statutory provisions, we are
              responsible for our own content on these web pages. In this
              matter, please note that the information given to third parties or
              investigative circumstances is pointing to illegal activity.
              Unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
            </p>
            <h3>Accountability for links</h3>
            <p>
              Responsibility for the content of external links (to web pages of
              third parties). No violations were evident at the time of linking.
              Should any legal infringement become known to us, we will remove
              the relevant link immediately.
            </p>
          </section>
          <section>
            <h2>Copyright</h2>
            <p>
              Our web pages and their contents are subject to German copyright
              law. Unless expressly permitted by law, any form of utilizing,
              reproducing or processing works subject to copyright protection on
              our web pages requires the prior consent of the respective owner
              of the rights. Individual reproductions of a work are only allowed
              for private use. The materials from these pages are copyrighted
              and any unauthorized use may violate copyright laws.
            </p>
          </section>
        </RichText>
      </StyledRichTextContainer>
    )
  }
}

export default ImprintRoute
