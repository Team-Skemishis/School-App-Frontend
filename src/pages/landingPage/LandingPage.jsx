'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import logo from '../../assets/images/wink.gif'
import schoolBuilding from '../../assets/images/schooll.svg'
import mobile from '../../assets/images/downloadPhoneApp.png'
import responsiveImage from '../../assets/images/responsiveImage.png'
import contact from '../../assets/images/contactUs.png'
import contact2 from '../../assets/images/contactUss.svg'
import contact3 from '../../assets/images/contactUsss.svg'
import uenrLogo from '../../assets/images/schoolLogos/UENR-logo.png'
import ciscoLogo from '../../assets/images/schoolLogos/cisco.jpg'
import knustLogo from '../../assets/images/schoolLogos/knust.png'
import { ChevronLeft, ChevronRight, ArrowRight, CircleDollarSign, LayoutDashboard, MonitorSmartphone, CloudDownload, HeartHandshake, MessageCircle, ChartLine, ShieldCheck, Facebook, Twitter, Linkedin, Mail, Phone, Map } from 'lucide-react'


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
                    <nav className="hidden md:flex space-x-8 text-nowrap shrink-0">
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
                    <Link to="/register" className="bg-theme-color text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 text-nowrap">
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="hero h-screen  text-white">
                <div className='flex flex-col md:flex-row justify-end items-center gap-5 mt-24 sm:mt-16 md:mt-32 p-10'>
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
                        <img src={responsiveImage} alt="Responsive Design" className="w-4/5 sm:w-3/4 md:w-full" />
                    </div>
                    <div className="w-full md:w-1/2 container mx-auto flex flex-col items-center md:items-start text-center md:text-left">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold sm:mb-4 mb-2 font-arima">Empowering Schools with Simplified Management</h1>
                            <p className="text-base sm:text-lg md:text-xl max-w-3xl">
                                Your all-in-one platform to streamline school operations and foster communication across every level—Admin, Teacher, Student, and Parent.
                            </p>
                            <p className='text-base sm:text-lg md:text-xl mb-8 max-w-3xl mt-3 sm:mt-4 md:mt-5 lg:mt-6'>
                                And it&apos;s <span className='font-bold'>100%</span> free to use!
                            </p>
                        </div>
                        <div className="flex sm:space-x-4 space-x-2">
                            <Link to="/register" >
                                <span className="bg-white text-theme-color px-5 py-2 rounded-full text-base sm:text-lg md:text-xl font-semibold hover:bg-blue-100 text-nowrap">Get Started Today</span>
                            </Link>
                            <ScrollLink to="features" smooth={true} duration={1500} >
                                <span className="bg-transparent border-2 border-white text-white px-5 py-2 rounded-full text-base sm:text-lg md:text-xl font-semibold hover:bg-white hover:text-theme-color text-nowrap cursor-pointer">Learn More</span>
                            </ScrollLink>
                        </div>
                    </div>
                </div>

            </section>

            {/* Key Features Section */}
            <section id="features" className="sm:py-20 py-5 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-center sm:mb-12 mb-5 font-arima">Key Features</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-3 sm:p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                style={{ backgroundColor: feature.backgroundColor }}
                            >
                                <div className='flex md:gap-2 md:mb-2 items-center space-x-2'>
                                    <p className='text-theme-color' size={32}>{feature.icon}</p>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 text-theme-color self-end">{feature.title}</h3>
                                </div>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="sm:py-20 py-5 bg-white">
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
            <section id="testimonials" className="sm:pt-20 pt-5 bg-gray-100">
                <div className="container mx-auto px-4 pb-20 ">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 font-arima">Some words from our happy schools</h2>
                    <div className="relative max-w-3xl mx-auto px-12">
                        <span className='font-bold text-theme-color text-6xl absolute top-2 left-14 font-serif italic'>&quot;</span>
                        <div className="overflow-hidden border-[0.1px] border-theme-color rounded-tl-3xl rounded-br-3xl p-6">
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
                            <span className='font-bold text-theme-color text-6xl absolute bottom-2 right-14 font-serif italic'>&quot;</span>
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
                <div className="trusted-partners py-10 bg-white text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 font-arima">Trusted Partners</h2>
                    <div className="overflow-hidden relative">
                        <div className="flex space-x-8"> {/*animate-marquee */}
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
            <section id="contact" className="sm:py-20 py-5 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-5 font-arima">Contact Us</h2>
                    <div className="flex flex-col md:flex-row  justify-around gap-12 w-full">
                        <div className="w-full md:w-1/2">
                            <p className='text-start text-theme-color font-bold text-2xl mb-5'>Send us a message...</p>
                            <form action="" className=" rounded-lg space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-theme-color">First name *</label>
                                        <input type="text" placeholder='First Name' className="w-full p-2 rounded border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-theme-color">Last name *</label>
                                        <input type="text" placeholder='Last Name' className="w-full p-2 rounded border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-theme-color">Email *</label>
                                        <input type="email" placeholder='Email' className="w-full p-2 rounded border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-theme-color">Phone</label>
                                        <input type="text" placeholder='Phone' className="w-full p-2 rounded border border-gray-300" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-theme-color">Message *</label>
                                    <textarea name="" id="" cols="10" rows="2" placeholder='Message' className="w-full p-2 rounded border border-gray-300"></textarea>
                                </div>
                                <button type='submit' className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Send Message</button>
                            </form>
                        </div>
                        <img src={contact3} alt="contact image" className="hidden md:block md:w-[300px] md:h-[300px] mx-auto items-center justify-center self-center" />
                        <div className=" w-full md:w-1/2 flex flex-col space-y-4 mb-8">
                            <p className='text-start text-theme-color font-bold text-2xl mb-5'>Reach out to us...</p>
                            <div className="contact-item flex gap-4 items-center">
                                <div className='border-2 border-theme-color rounded-xl p-2'>
                                    <Phone className='text-theme-color' size={24} />
                                </div>
                                <div className="contact-text">
                                    <p className="text-theme-color">Phone</p>
                                    <a className="font-medium font-montserrat hover:underline" href="tel: +233555975976">
                                        +233 555 975 976
                                    </a>
                                </div>
                            </div>
                            <div className="contact-item flex gap-4 items-center">
                                <div className='border-2 border-theme-color rounded-xl p-2'>
                                    <Mail className='text-theme-color' size={24} />
                                </div>
                                <div className="contact-text">
                                    <p className="text-theme-color">Email</p>
                                    <a className="font-medium font-montserrat hover:underline" href="mailto:agyemangmichael555@gmail.com">
                                        agyemangmichael555@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="contact-item flex gap-4 items-start">
                                <div className='border-2 border-theme-color rounded-xl p-2'>
                                    <Map className='text-theme-color' size={24} />
                                </div>
                                <div className="contact-text">
                                    <p className="text-theme-color">Address</p>
                                    <a className="font-medium font-montserrat hover:underline" href="https://maps.app.goo.gl/euywUBrFsdxPfyqU9">
                                        Crown Prince Academy (Annex), <br />
                                        Lapax, Accra - Ghana
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile App Section */}
            <section className="py-10 bg-gray-100">
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
            <footer className="bg-blue-300 text-black py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <Link to="/" className="flex items-center space-x-2 mb-4">
                                <img src={logo} alt="EduBridge Logo" className="h-10 w-10" />
                                <span className="text-2xl font-bold text-theme-color font-righteousStatic">EduBridge</span>
                            </Link>
                            <p className="text-sm">
                                EduBridge is the world&apos;s best and #1 ranked free online school management software. Our school management software has more features than any school software in the market.
                            </p>
                            <div>
                                <img src={schoolBuilding} alt="EduBridge Logo" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-theme-color border-b-2 border-theme-color w-fit">Useful Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="hover:text-white hover:underline ">About Us</Link></li>
                                <li><Link to="/features" className="hover:text-white hover:underline ">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-white hover:underline ">Pricing</Link></li>
                                <li><Link to="/support" className="hover:text-white hover:underline ">Support</Link></li>
                                <li><Link to="/privacy" className="hover:text-white hover:underline ">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-white hover:underline ">Terms of Service</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-theme-color border-b-2 border-theme-color w-fit">Connect With Us</h3>
                            <div className="flex space-x-4 mb-4">
                                <Link to="/facebook" className="hover:text-white ">
                                    <Facebook className="w-6 h-6" />
                                </Link>
                                <Link to="/twitter" className="hover:text-white ">
                                    <Twitter className="w-6 h-6" />
                                </Link>
                                <Link to="/linkedin" className="hover:text-white ">
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