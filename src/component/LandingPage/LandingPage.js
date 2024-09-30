import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles
import NaviBar from '../NaviBar';
import Section1_Image from '../../Asset/Image/section1.png';
import Lottie from 'react-lottie'; 
import animationData from '../../Asset/svg/Animation3.json';
import aboutAnimationData from '../../Asset/svg/Animation2.json';
import AssortmentSection from './AssortmentSection';
import AboutUsSection from './AboutUsSection';
import Breadcrumb from '../Breadcrumb';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [currentAnimationData, setCurrentAnimationData] = useState(animationData);
  const [showAboutAnimation, setShowAboutAnimation] = useState(false);
  const navigate = useNavigate();
  
  const aboutSectionRef = useRef(null);  // Ref for About section
  const assortmentSectionRef = useRef(null);  // Ref for Assortment section
  const aboutUsSectionRef = useRef(null);  // New ref for About Us section

  useEffect(() => {
    AOS.init();  // Initialize AOS
    AOS.refresh();  // Refresh AOS animations on load

    gsap.fromTo(
      ".image-parallax",
      { x: 0, y: 0 },
      {
        x: "-25vw",
        y: "80vh",
        ease: "none",
        scrollTrigger: {
          trigger: ".main-section",
          start: "top top",
          endTrigger: ".about-section",
          end: "top top",
          scrub: true,
          onLeave: () => setCurrentAnimationData(aboutAnimationData),
        },
      }
    );

    const aboutSectionTrigger = ScrollTrigger.create({
      trigger: ".about-section",
      start: "top center",
      onEnter: () => {
        setShowAboutAnimation(true);
        setCurrentAnimationData(aboutAnimationData);
      },
      onLeaveBack: () => {
        setShowAboutAnimation(false);
        setCurrentAnimationData(animationData);
      },
    });

    return () => {
      aboutSectionTrigger.kill();
    };
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: currentAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const aboutOptions = {
    loop: false,
    autoplay: true,
    animationData: aboutAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Scroll functions for About, Assortment, and About Us sections
  const scrollToAbout = () => {
    aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAssortment = () => {
    assortmentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAboutUs = () => {
    aboutUsSectionRef.current.scrollIntoView({ behavior: 'smooth' });  // Scroll to About Us section
  };

  return (
    <div className="w-full h-full">
      <section id="main"  className="main-section w-full h-screen bg-secondary text-primary px-4 sm:px-4 md:px-8 lg:px-7 xl:px-8 flex flex-col">
        <NaviBar 
          onAboutClick={scrollToAbout} 
          onAssortmentClick={scrollToAssortment} 
          onAddUsClick={scrollToAboutUs} // Pass scroll function for Add Us
        />
        <Breadcrumb /> 
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row w-full h-full mt-4">
          <div className="w-full sm:w-full md:w-1/2 h-full flex flex-col justify-between py-14 sm:py-14 md:py-20 lg:py-28">
            <h2 
              className="text-2xl sm:text-2xl lg:text-4xl font-bold mb-4 space-y-6"
              data-aos="fade-right"  // Added AOS animation
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              A little bit of items, <br/>
              will tell a story
            </h2>

            <p 
              className="text-sm sm:text-md lg:text-xl space-y-6 mb-6"
              data-aos="fade-right"  // Added AOS animation
            >
              Discover a delightful selection of freshly baked goods, <br/>
              crafted to bring joy to every bite.
            </p>

            <button 
              className="bg-primary text-white py-2 xl:w-40 lg:w-36 md:w-32 sm:w-28 rounded-full mb-8 text-sm sm:text-base lg:text-lg space-y-6"
              onClick={() => navigate('/Home')}
              data-aos="fade-down"  // Added AOS animation
            >
              Shop Now
            </button>

            <div className="flex space-x-6"  data-aos="fade-right" >
              <div className="bg-white rounded-full p-3 flex justify-center items-center ">
                <WhatsAppIcon style={{ color: 'primary', fontSize: '24px' }} />
              </div>
              <div className="bg-white rounded-full p-3 flex justify-center items-center">
                <InstagramIcon style={{ color: 'primary', fontSize: '24px' }} />
              </div>
              <div className="bg-white rounded-full p-3 flex justify-center items-center">
                <CallIcon style={{ color: 'primary', fontSize: '24px' }} />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-full md:w-1/2 h-full relative flex items-center justify-center" >
            <div className="absolute inset-0 z-0 " 
            data-aos="fade-left" >
              <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
            </div>
            <img
              src={Section1_Image}
              alt="Section1_Image"
              className="image-parallax w-[40%] sm:w-[40%] md:w-[50%] lg:max-w-[500px] h-auto object-cover z-10" 
            />
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" ref={aboutSectionRef} className="about-section w-full h-screen bg-third flex text-black relative">
        <div className="z-0 text-center px-4 sm:px-8 text-primary mt-10 lg:px-16"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500">
          <h2 className="text-xl sm:text-xl lg:text-3xl font-bold mb-4">
            About our food
          </h2>
          <p className="text-sm sm:text-sm lg:text-lg leading-relaxed">
            Indulge in our freshly baked delights, crafted with love and the finest ingredients. Every treat from our bakery promises a sweet moment of happiness.
          </p>
        </div>
        {showAboutAnimation && (
          <div className="absolute inset-0 flex items-center justify-center mt-4 z-0">
            <Lottie options={aboutOptions} height={"70%"} width={"70%"} />
          </div>
        )}
      </section>

      {/* Assortment Section */}
      <section id="assortment" ref={assortmentSectionRef} className="assortment-section w-full h-screen bg-secondary text-white">
        <AssortmentSection />
      </section>

      {/* About Us Section */}
      <section id="aboutUs" ref={aboutUsSectionRef} className="about-us-section w-full h-[60%] bg-white text-black">
        <AboutUsSection />
      </section>
    </div>
  );
};

export default LandingPage;
