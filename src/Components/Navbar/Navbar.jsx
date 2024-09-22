import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Navbar.css';
// Import your SVG here
import HamburgerIcon from '../../assets/Sidemenu.svg'; // Adjust the path if necessary

function Navbar() {
    const [hasShadow, setHasShadow] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const logoRef = useRef(null);
    const linksRef = useRef([]);
    
    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        gsap.fromTo(logoRef.current, 
            { x: window.innerWidth, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
        );
        
        gsap.fromTo(
            linksRef.current, 
            { opacity: 0, y: -20 }, 
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                delay: 1.6,
                ease: 'power2.out'
            }
        );
    }, []);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-shadow duration-300 ${hasShadow ? 'shadow-lg' : ''} bg-white`}>
            <div className="container mx-auto flex justify-between items-center py-4 px-6 md:hidden">
            <img src='../src/assets/Code_Boost_Black Logo.svg' alt="Code Boost Logo" className="h-10" />
                <div className="relative">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {/* Use your imported SVG here */}
                        <img src={HamburgerIcon} alt="Menu" className="w-12 h-12" />
                    </button>
                </div>
            </div>
            {/* Side Menu */}
            <div className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center">
                    <button onClick={toggleMenu} className="self-end p-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <img src='../src/assets/Code_Boost_Black Logo.svg' alt="Code Boost Logo" className="h-20 mb-10" />
                    {['What we do', 'Why we do', 'How we do', 'Who are we', 'Contact Us'].map((text, index) => (
                        <a 
                            key={index} 
                            href="#" 
                            className="my-4 text-black hover:text-orange-500 transition-colors duration-300"
                            onClick={toggleMenu}
                        >
                            {text}
                        </a>
                    ))}
                </div>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex container mx-auto justify-between items-center py-4 px-6">
                <div ref={logoRef} className="flex-grow text-center">
                    <img src='../src/assets/Code_Boost_Black Logo.svg' alt="Code Boost Logo" className="h-10" />
                </div>
                <div>
                    <ul className="flex space-x-8 text-gray-700">
                        {['What we do', 'Why we do', 'How we do', 'Who are we', 'Contact Us'].map((text, index) => (
                            <li key={index} ref={el => linksRef.current[index] = el}>
                                <a href="#" className="hover:text-black cursor-pointer">{text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
