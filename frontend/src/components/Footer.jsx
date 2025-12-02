import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
    const socialLinks = [
        {
            icon: <FaInstagram size={24} />,
            url: "https://www.instagram.com/atharva_lotankar11?utm_source=qr&igsh=cWZyd2RyZjRlYWE5",
            color: "hover:text-pink-500"
        },
        {
            icon: <FaLinkedin size={24} />,
            url: "https://www.linkedin.com/in/atharva-lotankar-51824537b",
            color: "hover:text-blue-500"
        },
        {
            icon: <FaGithub size={24} />,
            url: "https://www.github.com/AtharvaLotankar11",
            color: "hover:text-gray-400"
        }
    ];

    return (
        <footer className="bg-secondary border-t border-white/10 py-8 mt-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-gray-400 text-sm font-light tracking-wide">
                        &copy; {new Date().getFullYear()} Atharva Lotankar
                    </p>
                </div>

                <div className="flex space-x-6">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-300 transition-colors duration-300 ${social.color}`}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
