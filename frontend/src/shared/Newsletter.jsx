import React from "react";
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
const Newsletter = () => {
    return (
        <section className="newsletter">
        <Container>
            <Row>
            <Col lg="6">
                <div className="newsletter__content">
                <h2>Subscribe now to get useful traveling information.</h2>

                <div className="newsletter__input">
                    <input type="email" placeholder="Enter your email" />
                    <button className="btn newsletter__btn">Subscribe</button>
                </div>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati adipisci sunt in, provident facere ipsam.
                    </p>
                </div>
            </Col>

            <Col lg="6">
                <div className="newsletter__img">
                    <img src={maleTourist} alt="Newsletter Tourist" />
                </div>
            </Col>
            </Row>
        </Container>
        </section>
    );
    };

export default Newsletter;
