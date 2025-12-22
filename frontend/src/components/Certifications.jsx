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
                { name: "Kerala Blockchain Academy's Certificate of Completion in Blockchain Foundation Programs", url: "https://media.licdn.com/dms/document/media/v2/D4D2DAQH_1O0Pv-kYzw/profile-treasury-document-pdf-analyzed/B4DZsKHkooLEBE-/0/1765401359192?e=1766620800&v=beta&t=q3rmmnsxVMpvqcYrdDEmqIhOOFlnRzISOQt__8WgBqc" },
                { name: "Cloud Speech API in 3 Ways by Google Cloud Skills Boost", url: "https://www.credly.com/badges/06182327-3082-4b23-8227-edb6b3823394/public_url" },
                { name: "Prompt Design in Vertex AI by Google Cloud Skills Boost", url: "https://www.credly.com/badges/cf7b75bb-c953-4f62-a5b0-7cf662481876/public_url" },
                { name: "Set Up A Google Cloud Network by Google Cloud Skills Boost", url: "https://www.credly.com/badges/2d0609cd-1056-431f-8af6-b4708bfceda7/public_url" },
                { name: "AWS Academy Graduate in Cloud Foundations by Amazon Web Services (AWS)", url: "https://media.licdn.com/dms/image/v2/D4E2DAQGpT8mi8i_LXQ/profile-treasury-image-shrink_800_800/B4EZmKuQJxGoAY-/0/1758969006685?e=1766336400&v=beta&t=Zebfyn4Empefiy89X_jvNTZ4ynuAli4bL_egUZG-v68" },
                { name: "Applications of AI for Anomaly Detection by NVIDIA", url: "https://learn.nvidia.com/certificates?id=ll-DmDRGRCO-LVUMUYpasA" },
                { name: "Fundamentals of Deep Learning by NVIDIA", url: "https://learn.nvidia.com/certificates?id=is21AOsNQJqx-T1NnsczMQ#" },
                { name: "Certificate of Participation in AppSprint Workshop by ISA VESIT", url: "https://drive.google.com/file/d/1SPW5jG1m2PPcnp0oJ6Ya2SUwzlgG7inT/view" },
                { name: "Data Warehouse Concepts, Design, and Data Integration by University of Colorado", url: "https://www.coursera.org/account/accomplishments/verify/V3W7V399KY7K" },
                { name: "Blockchain Basics - Certificate of Completion by Great Learning", url: "https://www.mygreatlearning.com/certificate/DPWRRJJH" },
                { name: "Introduction to Cybersecurity Essentials by IBM", url: "https://www.coursera.org/account/accomplishments/verify/2UAQCKUTUSXY" },
                { name: "AI Agentic Design Patterns with AutoGen by DeepLearning.AI", url: "https://learn.deeplearning.ai/accomplishments/672d7fdf-454c-490f-87f6-71e96ac9e1dd?usp=sharing" },
                { name: "Supervised Machine Learning: Regression and Classification by Stanford University", url: "https://www.coursera.org/account/accomplishments/verify/DVDKP2VFTKVK" },
                { name: "The Complete Flutter Dev Bootcamp with Dart Certificate by Udemy", url: "https://www.udemy.com/certificate/UC-1ae0c945-a0d8-4b0c-9338-06f211bfec2a/" },
                { name: "Udemy's 100 Days of Code: The Complete Python Pro Bootcamp Certificate by Udemy", url: "https://www.udemy.com/certificate/UC-517e5de0-e6bc-4f92-82e0-22322f45df56/" },
                { name: "Bootcamp Certification in Intro to Raspberry Pi and Linux by ISA VESIT", url: "https://media.licdn.com/dms/image/v2/D4E2DAQHCeoTlCq9yXA/profile-treasury-image-shrink_800_800/B4EZoA0v.pIIAg-/0/1760950422630?e=1766336400&v=beta&t=9XPQYE7JeLqY_TzJxbowEgVgFTJmFK8OuKrgtk8Z6_Y" },
            ]
        },
        {
            title: "Hackathon Certificates",
            items: [
                { name: "Odoo X SPIT 25' Certificate of Participation by FEC Club SPIT", url: "https://media.licdn.com/dms/image/v2/D562DAQHt8VwVf4-KTg/profile-treasury-image-shrink_800_800/B56ZtFcCnQLEAY-/0/1766396541571?e=1767006000&v=beta&t=DG-MWKsZd11v51ZxxI-Z5p2X-MFNi9B6AXGWbMUoXs8" },
                { name: "Hackathon AI-Thon 3.0 Certificate of Achievement by AI Colegion VESIT", url: "https://drive.google.com/file/d/1-muADZcB8Ki56JBQDJNf3PVclV3-Rywy/view" },
                { name: "Ves-Hack-It Hackathon Certificate of Participation by Unstop", url: "https://unstop.com/certificate-preview/8641c967-7775-4a6c-b02e-e18a84b55452" },
            ]
        },
        {
            title: "Extra Curriculum Achievements",
            items: [
                { name: "Advanced Aircraft Design Workshop by Bharat Space Education Research Centre", url: "https://media.licdn.com/dms/image/v2/D4E2DAQG_YFrzcl9Krw/profile-treasury-image-shrink_800_800/B4EZldKOBxKcAY-/0/1758204587007?e=1766336400&v=beta&t=nrdQYkE2_yN3Gl3awJVnvjV30J63vQoBF7BeTZ3i9ss" },
                { name: "Games of Shows – Certificate of Participation by VESLIT Council", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEA4SM5-FCSPg/profile-treasury-image-shrink_800_800/B4EZoA4HLzGUAc-/0/1760951303990?e=1766336400&v=beta&t=I6uo1Myxw7VdfceG29DhMpnbp3x2rzWyU0bwXAwV21g" },
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
                { name: "Manorama Tell Me Why Quiz in Current Affairs with association in BSE 2019", url: "https://media.licdn.com/dms/image/v2/D4E2DAQE6P5eZ9bfP8g/profile-treasury-image-shrink_800_800/B4EZlCPKUYKYAY-/0/1757752898042?e=1766336400&v=beta&t=w6UFLRfTSqJdlQT-bUpH46n4lauzSCtXeVJh8UzymaM" },
                { name: "Akhil Bhartiya Gandharva Mahavidyalay Certification of Excellence in Harmonium", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEEIMn0H_wBmg/profile-treasury-image-shrink_800_800/B4EZlCOXHmIQAY-/0/1757752690605?e=1766336400&v=beta&t=ICy2ibllKrOnP8taZPmAZ66siNUn70oAO3Ki7MMaJfI" },
                { name: "Dr. Homi Bhabha Balvaidnyanik Competition 6th Grade Certification by The Mumbai Science Teachers' Association", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEY-OQ-VB5utA/profile-treasury-image-shrink_1280_1280/B4EZlCMOgKKoAQ-/0/1757752128119?e=1766336400&v=beta&t=pWetXLDZUGsJ94zYCNSbf6zfmT_lqPAEtDI_gDRXZF0" },
                { 
                    name: "IProto Robotics & Automation Program Under IRoboKid", 
                    hasDropdown: true,
                    dropdownItems: [
                        { name: "IProto Level 2", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEzubPpgxt0fA/profile-treasury-image-shrink_800_800/B4EZlIDdJkGwAY-/0/1757850495258?e=1766336400&v=beta&t=g5AXtwKgoNrET-5PadkBIjplnhyNt5Fa9Xvky3m9JfU" },
                        { name: "IProto Level 1", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEX89n8IlrjIg/profile-treasury-image-shrink_800_800/B4EZlIDZ3qIMAY-/0/1757850480229?e=1766336400&v=beta&t=tvK1fHoR8hYDEsgJMOpEjHgPMprWgWWIDk3f6UO_rdA" }
                    ]
                },
                { 
                    name: "SilverZone Olympiad Certifications by SilverZone Foundation Under Society of Science Education", 
                    hasDropdown: true,
                    dropdownItems: [
                        { name: "English Language", url: "https://media.licdn.com/dms/image/v2/D4E2DAQFIJYPUHkuMvw/profile-treasury-image-shrink_8192_8192/B4EZlCJX3XIQAg-/0/1757751380991?e=1766336400&v=beta&t=6MZvSLpaoyZLuLbO7m004DDwfPKhfIiDWvPBzv6OyPs" },
                        { name: "Science", url: "https://media.licdn.com/dms/image/v2/D4E2DAQHxX0l8GVqVQA/profile-treasury-image-shrink_1280_1280/B4EZlCJPGQHEAU-/0/1757751343424?e=1766336400&v=beta&t=e6IHJldoW3qjCcGz4ekCBGSVYWvIKgH4PaoHU4SfG9o" },
                        { name: "Informatics", url: "https://media.licdn.com/dms/image/v2/D4E2DAQH_mwdUPx3TAA/profile-treasury-image-shrink_1920_1920/B4EZlCJJteIkAc-/0/1757751321144?e=1766336400&v=beta&t=NXM9t8DDHfSfZrt2BZpVPfZjH34RhdQmXdpK0LZn4RQ" },
                        { name: "Mathematics", url: "https://media.licdn.com/dms/image/v2/D4E2DAQHndWwr890U1A/profile-treasury-image-shrink_8192_8192/B4EZlCJExjKsAg-/0/1757751300978?e=1766336400&v=beta&t=Bc0BEqP6CjSb5YZmNbV4iRFy69nEFg6r8hIK4enOvw8" },
                        { name: "General Knowledge", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEEu7AtumLasQ/profile-treasury-image-shrink_8192_8192/B4EZlCI1.0GUAg-/0/1757751240097?e=1766336400&v=beta&t=_e1szUkgp5OHc6d5HGrJMOu6-3DemtAxeQC_28-5vb4" }
                    ]
                },
                { name: "Helen O' Grady International's Course Completion in Speech & Drama", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEc4sZT12HxZA/profile-treasury-image-shrink_800_800/B4EZlCLO8XIwAY-/0/1757751867647?e=1766336400&v=beta&t=WdpoC4fDYUAHAu5jyloUITvCnjMkLI_ZsT7Tf6YOv4k" },
                { name: "Second Summer Coaching Camp in Badminton by Mulund Gymkhana", url: "https://media.licdn.com/dms/image/v2/D4E2DAQGWR6ddUpOJ9g/profile-treasury-image-shrink_800_800/B4EZlCKVcIGoAY-/0/1757751633977?e=1766336400&v=beta&t=n9bRHUvbtwlgEIldpnQel4ja_AYkM2dwnu_g1eBhEtY" },
                { name: "SpellBee Certificate of Merit International Level issued by Spell Bee International ~ Language for Life", url: "https://media.licdn.com/dms/image/v2/D4E2DAQF5eTREnA6PvA/profile-treasury-image-shrink_1280_1280/B4EZlCE9nYHIAQ-/0/1757750228613?e=1766336400&v=beta&t=7DSOfzf0pUZHociIpdID-fp_hfLaW8UuO5U2nvxi4HE" },
                { name: "National Abacus & Mental Arithmetic and Mathematics Test issued by The National Abacus & Mental Arithmetic and Mathematics Test Committee", url: "https://media.licdn.com/dms/image/v2/D4E2DAQE92UW2rCsFHw/profile-treasury-image-shrink_800_800/B4EZlCEBEwGYAY-/0/1757749979652?e=1766336400&v=beta&t=gAiw_bRJFr_rI2OIdaFyskM2_unOrxB45vRT-QgbI2E" },
            ]
        }
    ];

    return (
        <section id="certifications" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[20%] right-[5%] sm:right-[15%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-[30%] left-[5%] sm:left-[10%] w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500 neon-text"
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
                                                        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/10 to-pink-500/10 animate-pulse-glow rounded-lg"></div>
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
                                                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/10 to-pink-500/10 animate-pulse-glow rounded-lg"></div>
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
