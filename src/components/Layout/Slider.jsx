import React, { useState, useEffect } from 'react';

function Slider(props) {
    const [current, setCurrent] = useState(0);

    const slides = [
        {
            title: "Free E-Commerce Template",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "images/home/girl1.jpg",
        },
        {
            title: "100% Responsive Design",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "images/home/girl2.jpg",
        },
        {
            title: "Free Ecommerce Template",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "images/home/girl3.jpg",
        },
    ];

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);
    const next = () => setCurrent(prev => (prev + 1) % slides.length);

    return (
        <section id="slider">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12" style={{ position: 'relative', overflow: 'hidden' }}>

                        {/* Slides */}
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className="row align-items-center"
                                style={{ display: index === current ? 'flex' : 'none' }}
                            >
                                <div className="col-sm-6">
                                    <h1><span>E</span>-SHOPPER</h1>
                                    <h2>{slide.title}</h2>
                                    <p>{slide.description}</p>
                                    <button type="button" className="btn btn-default get">
                                        Get it now
                                    </button>
                                </div>
                                <div className="col-sm-6 text-center">
                                    <img src={slide.image} className="girl img-responsive" alt={slide.title} />
                                    <img src="images/home/pricing.png" className="pricing" alt="pricing" />
                                </div>
                            </div>
                        ))}

                        {/* Arrows */}
                        <button onClick={prev} style={arrowStyle('left')}>&#10094;</button>
                        <button onClick={next} style={arrowStyle('right')}>&#10095;</button>

                        {/* Dots */}
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            {slides.map((_, index) => (
                                <span
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    style={{
                                        display: 'inline-block',
                                        width: 10, height: 10,
                                        borderRadius: '50%',
                                        margin: '0 5px',
                                        cursor: 'pointer',
                                        background: index === current ? '#333' : '#bbb',
                                    }}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

const arrowStyle = (side) => ({
    position: 'absolute',
    top: '50%',
    [side]: 10,
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.4)',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    zIndex: 10,
    borderRadius: 4,
});

export default Slider;