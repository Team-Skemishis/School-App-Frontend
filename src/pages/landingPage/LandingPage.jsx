'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import logo from '../../assets/images/wink.gif'
import mobile from '../../assets/images/downloadPhoneApp.png'
import responsiveImage from '../../assets/images/responsiveImage.png'
import uenrLogo from '../../assets/images/schoolLogos/UENR-logo.png'
import ciscoLogo from '../../assets/images/schoolLogos/cisco.jpg'
import knustLogo from '../../assets/images/schoolLogos/knust.png'
import { ChevronLeft, ChevronRight, ArrowRight, CircleDollarSign, LayoutDashboard, MonitorSmartphone, CloudDownload, HeartHandshake, MessageCircle, ChartLine, ShieldCheck, Facebook, Twitter, Linkedin } from 'lucide-react'


export default function LandingPage() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    const testimonials = [
        {
            quote: "EduBridge has transformed how we manage our school. Communication is faster, and everything is organized.",
            author: "Principal, Oakridge Academy"
        },
        {
            quote: "The intuitive interface and comprehensive features have made our administrative tasks so much easier.",
            author: "Vice Principal, Sunnydale High"
        },
        {
            quote: "Parents love the real-time updates on their children's progress. It's improved our school-home communication significantly.",
            author: "Teacher, Greenwood Elementary"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    })

    const features = [
        {
            icon: <CircleDollarSign size={48} />,
            title: "Absolutely Free",
            description: "EduBridge is an absolutely 100% free school management software for a lifetime with no limitations. No need to buy anything. Just Sign Up!",
            backgroundColor: "#f0f8ff"
        },
        {
            icon: <LayoutDashboard size={48} />,
            title: "Intuitive Dashboards",
            description: "Role-based dashboards tailored for Admins, Teachers, Students, and Parents.",
            backgroundColor: "#faebd7"
        },
        {
            icon: <MonitorSmartphone size={48} />,
            title: "Responsive Web Design",
            description: "You can use our free school management software on any device, like Mobile, Tablet, Laptop, or desktop due to its responsive design.",
            backgroundColor: "#d4f4fc"
        },
        {
            icon: <CloudDownload size={48} />,
            title: "Cloud Based Software",
            description: "EduBridge is free school software that is always online, you can access it from anywhere, anytime. We will take care of your data and backups.",
            backgroundColor: "#efd2fa"
        },
        {
            icon: <HeartHandshake size={48} />,
            title: "Regular Updates & Support",
            description: "We add new and awesome features regularly to make our school administrative software unmatchable. Free online 24/7 support for users.",
            backgroundColor: "#d2dcfa"
        },
        {
            icon: <MessageCircle size={48} />,
            title: "Real-time Communication",
            description: "Seamlessly connect teachers, students, and parents with built-in messaging and notification system.",
            backgroundColor: "#f5f5dc"
        },
        {
            icon: <ChartLine size={48} />,
            title: "Performance & Attendance Tracking",
            description: "Track attendance, view grades, and generate comprehensive reports easily with our intuitive use of infographics and animations for explaining reports and results.",
            backgroundColor: "#ffe4e1"
        },
        {
            icon: <ShieldCheck size={48} />,
            title: "Fast, Secure & Easy",
            description: "We use advanced tools and technologies to build up this free school software. It is super fast, secure, reliable, and easy to use and manage.",
            backgroundColor: "#f0fff0"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-blue-300 shadow-md z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="EduBridge Logo" className="h-10 w-10" />
                        <span className="text-2xl font-bold text-theme-color font-righteousStatic">EduBridge</span>
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <ScrollLink to="home" smooth={true} duration={1500} className="text-theme-color text-xl cursor-pointer hover:text-white transition duration-200 hover:underline">
                            Home
                        </ScrollLink>
                        <ScrollLink to="features" smooth={true} duration={1500} className="text-theme-color text-xl cursor-pointer hover:text-white transition duration-200 hover:underline">
                            Features
                        </ScrollLink>
                        <ScrollLink to="how-it-works" smooth={true} duration={1500} className="text-theme-color text-xl cursor-pointer hover:text-white transition duration-200 hover:underline">
                            How it Works
                        </ScrollLink>
                        <ScrollLink to="testimonials" smooth={true} duration={1500} className="text-theme-color text-xl cursor-pointer hover:text-white transition duration-200 hover:underline">
                            Testimonials
                        </ScrollLink>
                        <ScrollLink to="contact" smooth={true} duration={1500} className="text-theme-color text-xl cursor-pointer hover:text-white transition duration-200 hover:underline">
                            Contact
                        </ScrollLink>
                    </nav>
                    <Link to="/register" className="bg-theme-color text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="hero h-screen flex flex-wrap justify-center  items-center pb-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <div className="w-1/2 flex justify-end items-center s">
                    <img src={responsiveImage} alt="Responsive Design" className="max-w-md" />
                </div>
                <div className="container mx-auto px-4 flex flex-col items-start text-left w-1/2">
                    <h1 className="text-2xl md:text-5xl font-bold mb-8 font-arima">Empowering Schools with Simplified Management</h1>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl">
                        Your all-in-one platform to streamline school operations and foster communication across every level—Admin, Teacher, Student, and Parent. <br /><br /> And it&apos;s <span className='font-bold'>100%</span> free to use!
                    </p>
                    <div className="flex space-x-4">
                        <Link to="/register" className="bg-white text-theme-color px-5 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
                            Get Started Today
                        </Link>
                        <ScrollLink to="features" smooth={true} duration={1500} className="bg-transparent border-2 border-white text-white px-5 py-2 rounded-full text-lg font-semibold hover:bg-white hover:text-theme-color transition duration-300">
                            Learn More
                        </ScrollLink>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section id="features" className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-arima">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                style={{ backgroundColor: feature.backgroundColor }}
                            >
                                <div className='flex md:gap-2 md:mb-2 items-center space-x-2'>
                                    <p className='text-theme-color' size={32}>{feature.icon}</p>
                                    <h3 className="text-2xl font-semibold mb-3 text-theme-color self-end">{feature.title}</h3>
                                </div>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 font-arima">How It Works</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
                        <div className="flex flex-col items-center text-center max-w-xs">
                            <div className="bg-blue-100 text-theme-color rounded-full p-4 mb-4">
                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Step 1</h3>
                            <p className="text-gray-600">Sign up your school.</p>
                        </div>
                        <ArrowRight className="hidden md:block text-theme-color" size={32} />
                        <div className="flex flex-col items-center text-center max-w-xs">
                            <div className="bg-blue-100 text-theme-color rounded-full p-4 mb-4">
                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Step 2</h3>
                            <p className="text-gray-600">Customize your school&apos;s profile and invite teachers, students, and parents.</p>
                        </div>
                        <ArrowRight className="hidden md:block text-theme-color" size={32} />
                        <div className="flex flex-col items-center text-center max-w-xs">
                            <div className="bg-blue-100 text-theme-color rounded-full p-4 mb-4">
                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Step 3</h3>
                            <p className="text-gray-600">Manage classes, attendance, grades, and communication from a unified platform.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 ">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 font-arima">Some words from our happy schools</h2>
                    <div className="relative max-w-3xl mx-auto border-[0.1px] border-theme-color py-12 rounded-tl-3xl rounded-br-3xl">
                        <span className='font-bold text-theme-color text-6xl absolute top-5 left-2 font-serif italic'>&quot;</span>
                        <div className="overflow-hidden">
                            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="w-full flex-shrink-0 px-4 ">
                                        <blockquote className="text-center">
                                            <p className="text-xl italic mb-4 relative">{testimonial.quote}&quot;</p>
                                            <cite className="text-gray-600 not-italic">— {testimonial.author}</cite>
                                        </blockquote>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                        >
                            <ChevronLeft className="text-theme-color" size={24} />
                        </button>
                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                        >
                            <ChevronRight className="text-theme-color" size={24} />
                        </button>
                    </div>
                </div>
                <div className="trusted-partners py-16 bg-white text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 font-arima">Trusted Partners</h2>
                    <div className="overflow-hidden relative">
                        <div className="flex animate-marquee space-x-8">
                            <img src={uenrLogo} alt="UENR Logo" className="logo-prop" />
                            <img src={ciscoLogo} alt="Cisco Logo" className="logo-prop" />
                            <img src={knustLogo} alt="KNUST Logo" className="logo-prop" />
                            {/*<img src="./images/linkedin-learning.webp" alt="LinkedIn Learning Logo" className="logo-prop" />
                            <img src="./images/microsoft.jpg" alt="Microsoft Logo" className="logo-prop" />
                            <img src="./images/kweku-tech2.jpg" alt="Kweku Tech Logo" className="logo-prop" />
                            <img src="./images/UENR-logo.png" alt="UENR Logo" className="logo-prop" />
                            <img src="./images/adobe2.jpg" alt="Adobe Logo" className="logo-prop" /> */}
                            {/* Repeat logos for continuous effect */}
                            {/* <img src="./images/ibm-logo.svg" alt="IBM Logo" className="logo-prop" />
                            <img src="./images/cisco.jpg" alt="Cisco Logo" className="logo-prop" />
                            <img src="./images/knust.png" alt="KNUST Logo" className="logo-prop" />
                            <img src="./images/linkedin-learning.webp" alt="LinkedIn Learning Logo" className="logo-prop" />
                            <img src="./images/microsoft.jpg" alt="Microsoft Logo" className="logo-prop" />
                            <img src="./images/kweku-tech2.jpg" alt="Kweku Tech Logo" className="logo-prop" />
                            <img src="./images/UENR-logo.png" alt="UENR Logo" className="logo-prop" />
                            <img src="./images/adobe2.jpg" alt="Adobe Logo" className="logo-prop" /> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 font-arima">Contact Us</h2>
                    <div className="max-w-lg mx-auto">
                        <p className="text-center mb-8">
                            Have questions or need assistance? Our support team is here to help!
                        </p>
                        <div className="flex justify-center space-x-4 mb-8">
                            <a href="mailto:support@edubridge.com" className="text-theme-color hover:text-blue-800">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/edubridge" target="_blank" rel="noopener noreferrer" className="text-theme-color hover:text-blue-800">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/edubridge" target="_blank" rel="noopener noreferrer" className="text-theme-color hover:text-blue-800">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438  9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile App Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                        <div className="">
                            <img src={mobile} alt="EduBridge Mobile App" className="mx-auto md:mx-0 max-w-xs" />
                        </div>
                        <div className="md:w-1/2 text-start">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Free Download</h2>
                            <p className="text-xl mb-6">
                                Download our mobile app for a more interactive experience, wherever you are, whenever you want, however please you!
                            </p>
                            <div className="flex space-x-4">
                                <Link to="#" className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition duration-300">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.08-.46-2.07-.48-3.2 0-1.42.63-2.17.53-3.08-.36-6.25-6.33-3.7-15.73 3.7-15.38 1.8.07 3.07 1.03 4.01 1.08 1.51.08 2.4-.83 4.03-.95 1.69-.12 3.21.74 4.21 1.97-3.67 2.07-3.1 6.24.47 7.53-.85 1.99-2.07 3.96-3.78 5.76M13 5.9c-.04-2.78 2.24-4.84 4.9-4.9.26 2.58-2.26 5.04-4.9 4.9z" />
                                    </svg>
                                    <span>App Store</span>
                                </Link>
                                <Link to="#" className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition duration-300">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                    </svg>
                                    <span>Google Play</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <Link to="/" className="flex items-center space-x-2 mb-4">
                                <img src={logo} alt="EduBridge Logo" className="h-10 w-10" />
                                <span className="text-2xl font-bold font-righteousStatic">EduBridge</span>
                            </Link>
                            <p className="text-sm">
                                EduBridge is the world&apos;s best and #1 ranked free online school management software. Our school management software has more features than any school software in the market.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="hover:text-blue-400 transition duration-300">About Us</Link></li>
                                <li><Link to="/features" className="hover:text-blue-400 transition duration-300">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-blue-400 transition duration-300">Pricing</Link></li>
                                <li><Link to="/support" className="hover:text-blue-400 transition duration-300">Support</Link></li>
                                <li><Link to="/privacy" className="hover:text-blue-400 transition duration-300">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-blue-400 transition duration-300">Terms of Service</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                            <div className="flex space-x-4 mb-4">
                                <Link to="/facebook" className="hover:text-blue-400 transition duration-300">
                                    <Facebook className="w-6 h-6" />
                                </Link>
                                <Link to="/twitter" className="hover:text-blue-400 transition duration-300">
                                    <Twitter className="w-6 h-6" />
                                </Link>
                                <Link to="/linkedin" className="hover:text-blue-400 transition duration-300">
                                    <Linkedin className="w-6 h-6" />
                                </Link>
                            </div>
                            <p className="text-sm">&copy; {new Date().getFullYear()} EduBridge. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}