import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NaviBar from '../NaviBar';
import Section1_Image from '../../Asset/Image/section1.png';
import Lottie from 'react-lottie'; 
import animationData from '../../Asset/svg/Animation3.json';
import aboutAnimationData from '../../Asset/svg/Animation2.json';
import AssortmentSection from './AssortmentSection';
import AboutUsSection from './AboutUsSection';
import Breadcrumb from '../Breadcrumb';
import { useNavigate } from 'react-router-dom';

// Import social media icons from Material UI
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [showAboutAnimation, setShowAboutAnimation] = useState(false);
  const navigate = useNavigate(); // Use the navigate hook from React Router

  useEffect(() => {
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
          end: "bottom top",
          scrub: true,
        },
      }
    );

    const updateAnimationVisibility = () => {
      const aboutSection = document.querySelector('.about-section');
      const rect = aboutSection.getBoundingClientRect();
      setShowAboutAnimation(rect.top < window.innerHeight && rect.bottom > 0);
    };

    window.addEventListener('scroll', updateAnimationVisibility);
    updateAnimationVisibility();

    return () => window.removeEventListener('scroll', updateAnimationVisibility);
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
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

  return (
    <div className="w-full h-full">
      <section className="main-section w-full h-screen bg-secondary text-primary px-4 sm:px-4 md:px-8 lg:px-7 xl:px-8 flex flex-col">
        <NaviBar />
        <Breadcrumb /> 
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row w-full h-full mt-4">
          <div className="w-full sm:w-full md:w-1/2 h-full flex flex-col justify-between py-14 sm:py-14 md:py-20 lg:py-28">
            <h2 className="text-2xl sm:text-2xl lg:text-4xl font-bold mb-4 space-y-6">
              A little bit of items, <br/>
              will tell a story
            </h2>
            <p className="text-sm sm:text-md lg:text-xl space-y-6 mb-6">
              Discover a delightful selection of freshly baked goods, <br/>
              crafted to bring joy to every bite.
            </p>
            
            {/* Updated Shop Now Button */}
            <button 
              className="bg-primary text-white py-2 xl:w-40 lg:w-36 md:w-32 sm:w-28 rounded-full mb-8 text-sm sm:text-base lg:text-lg space-y-6"
              onClick={() => navigate('/Home')}  // Navigate to the Home page
            >
              Shop Now
            </button>

            <div className="flex space-x-6">
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

          <div className="w-full sm:w-full md:w-1/2 h-full relative flex items-center justify-center ">
            <div className="absolute inset-0 z-0 ">
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

      <section className="about-section w-full h-screen bg-third flex  text-black relative">
        <div className="z-10 mt-2 text-center px-4 sm:px-8 text-primary lg:px-16">
          <h2 className="text-xl sm:text-xl lg:text-3xl font-bold mb-4">About our food</h2>
          <p className="text-sm sm:text-sm lg:text-lg leading-relaxed">
            Indulge in our freshly baked delights, crafted with love and the finest ingredients. Every treat from our bakery promises a sweet moment of happiness.
          </p>
        </div>
        {showAboutAnimation && (
          <div className="absolute inset-0  flex items-center justify-center z-0">
            <Lottie options={aboutOptions} height={"70%"} width={"70%"} />
          </div>
        )}
      </section>

      <AssortmentSection />
      <AboutUsSection />
    </div>
  );
};

export default LandingPage;
