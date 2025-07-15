import React from 'react'; // 6.9k (gzipped: 2.7k)
import '../styles/home.css'
import { Container, Row , Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import experienceImg from '../assets/images/experience.png';

import Subtitle from '../shared/Subtitle';

import SearchBar from '../shared/SearchBar'; // 1.5k (gzipped: 0.6k)
import ServiceList from '../services/ServiceList'; // 2.3k (gzipped: 0.9k)
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonial from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';

const Home = () => {
    return <>
    {/*====== Hero Section Start ====== */}
    <section>
        <Container>
            <Row>
                <Col lg='6' md='6'>
                    <div className="hero__content">
                        <div className="hero__subtitle d-flex align-items-center">
                            <Subtitle subtitle ='Know Before You Go' />
                            <img src= {worldImg} alt="" />
                        </div>
                        <h1>Traveling opens the door to creating
                            <span className="highlight"> memories</span>
                        </h1>
                            <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Ullam ipsum nobis asperiores soluta voluptas quas voluptates.
                                Molestiae tempora dignissimos, animi praesentium molestias perferendis porro expedita delectus.
                                Soluta natus porro.
                            </p>
                        
                    </div>
                </Col>

                <Col lg='6'>
                <div className="hero__img-box">
                    <img src={heroImg} alt="" />
                </div>
                </Col>

                <Col lg='6'>
                <div className="hero__img-box mt-4">
                    <video src={heroVideo} alt="" controls />
                </div>
                </Col>
                
                <Col lg='6'>
                <div className="hero__img-box mt-5">
                    <img src={heroImg02} alt="" />
                </div>
                </Col>

                <SearchBar />
            </Row>
        </Container>
    </section>
    {/*====== Hero Section End ====== */}
    
    {/*====== Services Section Start ====== */}
    <section>
        <Container>
            <Row>
                <Col lg='3' className='text-center'>
                    <h5 className='services__subtitle'>What we serve</h5>
                    <h2 className='services__subtitle'>We Offer Our Best Services</h2>
                </Col>

                <ServiceList />
            </Row>
        </Container>
    </section>

    {/*====== Feature tour section start ====== */}
    <section className="featured-tours-section">
        <Container>
            <Row>
                <Col lg='12' className='mb-5'>
                    <div className="featured-tours-header text-center">
                        <Subtitle subtitle='Explore' />
                        <h2 className='featured__tour-title'>Our Featured Tours</h2>
                        <p className="featured__tour-subtitle">
                            Discover amazing destinations handpicked by our travel experts
                        </p>
                    </div>
                </Col>

                <FeaturedTourList />

            </Row>
        </Container>
    </section>
    {/*====== Feature tour section end ====== */}

    {/*====== experience Section Start ====== */}
    <section>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className='experience__content'>
                    <Subtitle subtitle='Experience' />
                    <h2 >With Our All experience <br /> we will serve you </h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    <br />
                    Quas aliquam, hic tempora inventore suscipit unde.
                    </p>
                    </div>

                    <div className="counter__wrapper d-flex align-items-center gap-5">
                    <div className="counter__box">
                        <span>12k+</span>
                        <h6>Successful Trip</h6>
                    </div>

                    <div className="counter__box">
                        <span>2k+</span>
                        <h6>Regular clients</h6>
                    </div>

                    <div className="counter__box">
                        <span>15</span>
                        <h6>Years experience</h6>
                    </div>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="experience__img">
                        <img src={experienceImg} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
    {/*====== experience Section end ====== */}

    {/* ========== gallery section start ========== */}
    <section>
    <Container>
        <Row>
            <Col lg="12">
                <Subtitle subtitle={"Gallery"} />
                    <h2 className="gallery__title">
                    Visit our customers tour gallery
                    </h2>
            </Col>
            <Col lg="12">
                <MasonryImagesGallery />
        
            </Col>
        </Row>
        </Container>
    </section>
{/* ========== gallery section end ========== */}

{/* ========== testimonial section start ========== */}
    <section>
    <Container>
            <Row>
                <Col lg='12'>
                <Subtitle subtitle={'Fans Love'} />
                    <h2 className="testimonial__title">What our fans say about us</h2>
                </Col>
                <Col lg='12'>
                    <Testimonial />
                </Col>
            </Row>
        </Container>
    </section>
{/* ========== testimonial section end ========== */}

{/* ========== newsletter section start ========== */}
    <Newsletter />

    </>
}
export default Home;