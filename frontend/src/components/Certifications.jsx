import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaChevronDown } from 'react-icons/fa';

const Certifications = () => {
    const [hoveredCert, setHoveredCert] = useState(null);
    const [expandedDropdowns, setExpandedDropdowns] = useState({});

    const toggleDropdown = (key) => {
        setExpandedDropdowns(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const categories = [
        {
            title: "Co-Curriculum Achievements",
            items: [
                { name: "Master Ethereum & Solidity Programming From Scratch by Udemy", url: "https://www.udemy.com/certificate/UC-c95806c1-aa87-43c3-a293-ad39bfc1c9cb/" },
                { 
                    name: "Oracle Academy & VESIT's Award of Achievement in Dual Course Program", 
                    hasDropdown: true,
                    dropdownItems: [
                        { name: "Java Programming", url: "https://drive.google.com/file/d/1dn8sUsdh25GrnURrGe_yPOW1uJeDglEY/view?usp=drive_link" },
                        { name: "Database Programming with SQL", url: "https://drive.google.com/file/d/1Y7k-inpiZFXRY82L9xVtg7Gxw2-aCs_i/view?usp=drive_link" }
                    ]
                },
                { name: "Kerala Blockchain Academy's Certificate of Completion in Blockchain Foundation Programs", url: "https://verify.kba.ai/view/IIITMK-KBA-BFP-OL-45490" },
                { name: "Cisco Network Academy's Course of Completion in Introduction to Data Science", url: "https://drive.google.com/file/d/1sxzXBtJW_bLsKl49LtPLWDJc2WTzpZv0/view?usp=drive_link" },
                { 
                    name: "Google Cloud Skills Boost Badges", 
                    hasDropdown: true,
                    dropdownItems: [
                        { name: "Cloud Speech API in 3 Ways", url: "https://www.credly.com/badges/06182327-3082-4b23-8227-edb6b3823394/public_url" },
                        { name: "Prompt Design in Vertex AI", url: "https://www.credly.com/badges/cf7b75bb-c953-4f62-a5b0-7cf662481876/public_url" },
                        { name: "Set up a google cloud network", url: "https://www.credly.com/badges/2d0609cd-1056-431f-8af6-b4708bfceda7/public_url" }
                    ]
                },
                { name: "AWS Academy Graduate in Cloud Foundations by Amazon Web Services (AWS)", url: "https://drive.google.com/file/d/1ChS3ITWU6tdWz9xH01BLvHFxRY1b2aVD/view?usp=drive_link" },
                { 
                    name: "NVIDIA's Certificate of Competency", 
                    hasDropdown: true,
                    dropdownItems: [
                        { name: "Fundamentals of Deep Learning", url: "https://learn.nvidia.com/certificates?id=is21AOsNQJqx-T1NnsczMQ#" },
                        { name: "Applications of AI for Anomaly Detection", url: "https://learn.nvidia.com/certificates?id=ll-DmDRGRCO-LVUMUYpasA" }
                    ]
                },
                { name: "Certificate of Participation in AppSprint Workshop by ISA VESIT", url: "https://drive.google.com/file/d/1SPW5jG1m2PPcnp0oJ6Ya2SUwzlgG7inT/view" },
                { name: "Data Warehouse Concepts, Design, and Data Integration by University of Colorado", url: "https://www.coursera.org/account/accomplishments/verify/V3W7V399KY7K" },
                { name: "Blockchain Basics - Certificate of Completion by Great Learning", url: "https://www.mygreatlearning.com/certificate/DPWRRJJH" },
                { name: "Introduction to Cybersecurity Essentials by IBM", url: "https://www.coursera.org/account/accomplishments/verify/2UAQCKUTUSXY" },
                { name: "AI Agentic Design Patterns with AutoGen by DeepLearning.AI", url: "https://learn.deeplearning.ai/accomplishments/672d7fdf-454c-490f-87f6-71e96ac9e1dd?usp=sharing" },
                { name: "Supervised Machine Learning: Regression and Classification by Stanford University", url: "https://www.coursera.org/account/accomplishments/verify/DVDKP2VFTKVK" },
                { name: "The Complete Flutter Dev Bootcamp with Dart Certificate by Udemy", url: "https://www.udemy.com/certificate/UC-1ae0c945-a0d8-4b0c-9338-06f211bfec2a/" },
                { name: "Udemy's 100 Days of Code: The Complete Python Pro Bootcamp Certificate by Udemy", url: "https://www.udemy.com/certificate/UC-517e5de0-e6bc-4f92-82e0-22322f45df56/" },
                { name: "Bootcamp Certification in Intro to Raspberry Pi and Linux by ISA VESIT", url: "https://drive.google.com/file/d/1-49tSFn5knydETNt3FzTtRJt1uxBMw1q/view?usp=drive_link" },
            ]
        },
        {
            title: "Hackathon Certificates",
            items: [
                { name: "Certificate of Appreciation, InnovGenius - Finalist in TCET, Mumbai", url: "https://drive.google.com/file/d/1fVqQKzsAiDXNM7PisEg1T9htsvvrkdxT/view?usp=drive_link" },
                { name: "Certificate of Participation, KJSSE's AgriTech 2026 Hackathon - Finalist, 24 Hour National Hackathon", url: "https://drive.google.com/file/d/1ph-jG15H0cDBu2chgXmo6g3b0LWVhEpx/view?usp=drive_link" },
                { name: "Certificate of Merit, Quasar 4.0 – Top 28 National Selection, PVPPCOE", url: "https://drive.google.com/file/d/1zzkSbHNAWYOaMId-I6Nt0WAtRC1D4o3J/view?usp=sharing" },
                { name: "Certificate of Participation – Finalist, Odoo X SPIT 25 Hackathon, FEC Club SPIT", url: "https://drive.google.com/file/d/1QXmzU03Jr9VZEIK4ClSgsMw4KvcwwlO2/view?usp=sharing" },
                { name: "Certificate of Achievement, Hack-AI-Thon 3.0 Hackathon – AI Colegion VESIT", url: "https://drive.google.com/file/d/1-muADZcB8Ki56JBQDJNf3PVclV3-Rywy/view" },
                { name: "Certificate of Participation, Ves-Hack-It Hackathon – Unstop", url: "https://unstop.com/certificate-preview/8641c967-7775-4a6c-b02e-e18a84b55452" },
            ]
        },
        {
            title: "Extra Curriculum Achievements",
            items: [
                { name: "Advanced Aircraft Design Workshop by Bharat Space Education Research Centre", url: "https://drive.google.com/file/d/1BkgHljW-MhDvtq-7sLL1RrL3G-TXt5y6/view?usp=drive_link" },
                { name: "Games of Shows – Certificate of Participation by VESLIT Council", url: "https://drive.google.com/file/d/1mNv3ubFKAidBkVgAxXe4eTbU3AkpxiPJ/view?usp=drive_link" },
                { 
                    name: "Maharashtra Youth For Climate Action Certifications by MYCA Foundation", 
                    hasDropdown: true,
                    dropdownItems: [
                        { name: "Living with Climate Change & Water Management", url: "https://www.mahayouthnet.in/share-certificate?serialno=ZWGQUMAK" },
                        { name: "Bio-cultural Diversity Conservation and Climate Action", url: "https://www.mahayouthnet.in/share-certificate?serialno=VUYPQFKT" },
                        { name: "Energy Management and Climate Action", url: "https://www.mahayouthnet.in/share-certificate?serialno=GF3G4I8R" },
                        { name: "Waste Management and Climate Action", url: "https://www.mahayouthnet.in/share-certificate?serialno=R9YZH8DH" }
                    ]
                },
                { name: "Manorama Tell Me Why Quiz in Current Affairs with association in BSE 2019", url: "https://drive.google.com/file/d/1P5-_X4Om6-YtNf3oKvog--fq2vXqKKp6/view?usp=drive_link" },
                { name: "Akhil Bhartiya Gandharva Mahavidyalay Certification of Excellence in Harmonium", url: "https://drive.google.com/file/d/152gMDRiRKc4yBUNi2PX_-ZLrg3_lfYaT/view?usp=drive_link" },
                { name: "Dr. Homi Bhabha Balvaidnyanik Competition 6th Grade Certification by The Mumbai Science Teachers' Association", url: "https://drive.google.com/file/d/1CktK5yyhsb5S8X25AXsdl56477U51Tq6/view?usp=drive_link" },
                { 
                    name: "IProto Robotics & Automation Program Under IRoboKid", 
                    hasDropdown: true,
                    dropdownItems: [
                        { name: "IProto Level 2", url: "https://drive.google.com/file/d/1v7FpGXNKhg3quZYVZMjVXZkOfJHG2C52/view?usp=drive_link" },
                        { name: "IProto Level 1", url: "https://drive.google.com/file/d/1Sb2muUH2qquLfh3cqp8qwSsd0CuLpgKg/view?usp=drive_link" }
                    ]
                },
                { 
                    name: "SilverZone Olympiad Certifications by SilverZone Foundation Under Society of Science Education", 
                    hasDropdown: true,
                    dropdownItems: [
                        { name: "English Language", url: "https://drive.google.com/file/d/11uKUrqRdehWbCy1sn0atMW1iV2xu1PLa/view?usp=drive_link" },
                        { name: "Science", url: "https://drive.google.com/file/d/1i4pK4pb82d8KlhJBAx3TxL_cm9IUA5-o/view?usp=drive_link" },
                        { name: "Informatics", url: "https://drive.google.com/file/d/1izlEibtOH7nTv04p9V2o4bM4Kv4Or9al/view?usp=drive_link" },
                        { name: "Mathematics", url: "https://drive.google.com/file/d/1KYRXdI9gh6Fd7r74fmx1zU5N6uu-Hm35/view?usp=drive_link" },
                        { name: "General Knowledge", url: "https://drive.google.com/file/d/1sZlQUbqK7Eod_6yxsK1t3tp81OcI5uyn/view?usp=drive_link" }
                    ]
                },
                { name: "Helen O' Grady International's Course Completion in Speech & Drama", url: "https://drive.google.com/file/d/1cswXswYmQx5FnFzyY4Y2HUUzzPTZ7ckl/view?usp=drive_link" },
                { name: "Second Summer Coaching Camp in Badminton by Mulund Gymkhana", url: "https://drive.google.com/file/d/1ireoPGcjnH1Lg-j-jG8OZiZQ_5ODkRlH/view?usp=drive_link" },
                { name: "SpellBee Certificate of Merit International Level issued by Spell Bee International ~ Language for Life", url: "https://drive.google.com/file/d/1LF7kl5HWB5ZjYuHL3BB2Y6fvBndw28ew/view?usp=drive_link" },
                { name: "National Abacus & Mental Arithmetic and Mathematics Test issued by The National Abacus & Mental Arithmetic and Mathematics Test Committee", url: "https://drive.google.com/file/d/1Jh9dgB449_m8f2VE_p1iTnuZFGiDVDqL/view?usp=drive_link" },
            ]
        }
    ];

    return (
        <section id="certifications" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[20%] right-[5%] sm:right-[15%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-[30%] left-[5%] sm:left-[10%] w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-earth/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-accent font-display tracking-widest uppercase drop-shadow-[0_0_10px_rgba(152,174,179,0.3)]"
                >
                    Certifications
                </motion.h2>

                <div className="space-y-8 sm:space-y-10 md:space-y-12">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <motion.h3
                                className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-5 md:mb-6 text-white border-l-4 border-accent pl-3 sm:pl-4"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 + 0.1 }}
                            >
                                {category.title}
                            </motion.h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {category.items.map((item, idx) => (
                                    <div key={idx} className="relative">
                                        {item.hasDropdown ? (
                                            <div className="space-y-2">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 15 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        delay: idx * 0.05,
                                                        duration: 0.4,
                                                        ease: "easeOut"
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onMouseEnter={() => setHoveredCert(`${index}-${idx}`)}
                                                    onMouseLeave={() => setHoveredCert(null)}
                                                    onClick={() => toggleDropdown(`${index}-${idx}`)}
                                                    className="glass-effect p-3 sm:p-4 rounded-lg border border-white/10 flex items-center justify-between gap-2.5 sm:gap-3 hover:border-accent/30 transition-all duration-300 group relative overflow-hidden cursor-pointer"
                                                >
                                                    {/* Shimmer overlay */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                        <div className="absolute inset-0 animate-shimmer"></div>
                                                    </div>

                                                    {/* Glow effect */}
                                                    {hoveredCert === `${index}-${idx}` && (
                                                        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-earth/5 animate-pulse-glow rounded-lg"></div>
                                                    )}

                                                    <div className="flex items-center gap-2.5 sm:gap-3 relative z-10">
                                                        <motion.div
                                                            animate={{
                                                                rotate: hoveredCert === `${index}-${idx}` ? 360 : 0
                                                            }}
                                                            transition={{ duration: 0.6 }}
                                                        >
                                                            <FaAward className="text-accent flex-shrink-0 animate-glow-pulse text-base sm:text-lg" />
                                                        </motion.div>
                                                        <span className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors line-clamp-2">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                    <motion.div
                                                        animate={{
                                                            rotate: expandedDropdowns[`${index}-${idx}`] ? 180 : 0
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                        className="relative z-10"
                                                    >
                                                        <FaChevronDown className="text-accent text-xs" />
                                                    </motion.div>
                                                </motion.div>
                                                
                                                {/* Dropdown Items */}
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        height: expandedDropdowns[`${index}-${idx}`] ? "auto" : 0,
                                                        opacity: expandedDropdowns[`${index}-${idx}`] ? 1 : 0
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="space-y-1 ml-4 border-l-2 border-accent/30 pl-3">
                                                        {item.dropdownItems.map((dropdownItem, dropIdx) => (
                                                            <motion.a
                                                                key={dropIdx}
                                                                href={dropdownItem.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ 
                                                                    opacity: expandedDropdowns[`${index}-${idx}`] ? 1 : 0,
                                                                    x: expandedDropdowns[`${index}-${idx}`] ? 0 : -10
                                                                }}
                                                                transition={{ delay: dropIdx * 0.1 }}
                                                                whileHover={{ scale: 1.02, x: 5 }}
                                                                className="block glass-effect p-2 rounded border border-white/5 hover:border-accent/20 transition-all duration-200 group"
                                                            >
                                                                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                                                                    {dropdownItem.name}
                                                                </span>
                                                            </motion.a>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </div>
                                        ) : (
                                            <motion.a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 15 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    delay: idx * 0.05,
                                                    duration: 0.4,
                                                    ease: "easeOut"
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.98 }}
                                                onMouseEnter={() => setHoveredCert(`${index}-${idx}`)}
                                                onMouseLeave={() => setHoveredCert(null)}
                                                className="glass-effect p-3 sm:p-4 rounded-lg border border-white/10 flex items-center gap-2.5 sm:gap-3 hover:border-accent/30 transition-all duration-300 group relative overflow-hidden"
                                            >
                                                {/* Shimmer overlay */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    <div className="absolute inset-0 animate-shimmer"></div>
                                                </div>

                                                {/* Glow effect */}
                                                {hoveredCert === `${index}-${idx}` && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-earth/5 animate-pulse-glow rounded-lg"></div>
                                                )}

                                                <motion.div
                                                    className="relative z-10"
                                                    animate={{
                                                        rotate: hoveredCert === `${index}-${idx}` ? 360 : 0
                                                    }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <FaAward className="text-accent flex-shrink-0 animate-glow-pulse text-base sm:text-lg" />
                                                </motion.div>
                                                <span className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors line-clamp-2 relative z-10">
                                                    {item.name}
                                                </span>
                                            </motion.a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
