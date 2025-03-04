/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

// core components

function SectionDownload() {
  return (
    <>
      <div className="section">
        <Container className="text-center">
          <Row className="text-center upgrade-pro">
            <Col className="ml-auto mr-auto" md="8">
              <h2 className="title">Connect with us!</h2>
              <p className="description">
              Follow us on social media for the latest news and updates!
              </p>
            </Col>
            <Col className="ml-auto mr-auto" sm="5">
            </Col>
          </Row>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>Thank you for supporting us!</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="twitter-sharrre btn-round"
                color="twitter-bg"
                href="https://www.instagram.com/explore/locations/398906457174313/pembroke-farmers-market/?locale=us&hl=am-et"
                id="tooltip3373767"
                target="_blank"
              >
                <i className="fa fa-instagram" /> Instagram
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip3373767">
                Instagram!
              </UncontrolledTooltip>
              <Button
                className="facebook-sharrre btn-round ml-2"
                color="facebook-bg"
                href="https://www.facebook.com/groups/39052179608"
                target="_blank"
                id="tooltip68961360"
                
              >
                <i className="fa fa-facebook-square" /> Facebook
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip68961360">
                Share!
              </UncontrolledTooltip>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionDownload;
