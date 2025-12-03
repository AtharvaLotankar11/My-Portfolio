import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaAward } from 'react-icons/fa';

const Certifications = () => {
    const [hoveredCert, setHoveredCert] = useState(null);

    const categories = [
        {
            title: "Co-Curriculum Achievements",
            items: [
                { name: "Cloud Speech API in 3 Ways by Google Cloud Skills Boost", url: "https://www.credly.com/badges/06182327-3082-4b23-8227-edb6b3823394/public_url" },
                { name: "Prompt Design in Vertex AI by Google Cloud Skills Boost", url: "https://www.credly.com/badges/cf7b75bb-c953-4f62-a5b0-7cf662481876/public_url" },
                { name: "Set Up A Google Cloud Network by Google Cloud Skills Boost", url: "https://www.credly.com/badges/2d0609cd-1056-431f-8af6-b4708bfceda7/public_url" },
                { name: "AWS Academy Graduate in Cloud Foundations by Amazon Web Services (AWS)", url: "https://media.licdn.com/dms/image/v2/D4E2DAQGpT8mi8i_LXQ/profile-treasury-image-shrink_800_800/B4EZmKuQJxGoAY-/0/1758969006685?e=1765306800&v=beta&t=HDwOpvIb2j7mub5tgbXpaoBEhS8QLBoYHOSJbYGXKnU" },
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
                { name: "Bootcamp Certification in Intro to Raspberry Pi and Linux by ISA VESIT", url: "https://media.licdn.com/dms/image/v2/D4E2DAQHCeoTlCq9yXA/profile-treasury-image-shrink_800_800/B4EZoA0v.pIIAg-/0/1760950422630?e=1765306800&v=beta&t=wcqgnvjQqEtQGZF2k1J3FgGdgS803E5jN11y5F-CR3Y" },
            ]
        },
        {
            title: "Hackathon Certificates",
            items: [
                { name: "Hack-AI-Thon 3.0 Certificate of Achievement by AI Colegion VESIT", url: "https://drive.google.com/file/d/1-muADZcB8Ki56JBQDJNf3PVclV3-Rywy/view" },
            ]
        },
        {
            title: "Extra Curriculum Achievements",
            items: [
                { name: "Advanced Aircraft Design Workshop by Bharat Space Education Research Centre", url: "https://media.licdn.com/dms/image/v2/D4E2DAQG_YFrzcl9Krw/profile-treasury-image-shrink_800_800/B4EZldKOBxKcAY-/0/1758204587007?e=1765306800&v=beta&t=5WYoDgMFSE9muCORBD_1lnIEpeDhg4fMz3NLOw5oYD8" },
                { name: "Game of Shows - Certificate of Participation by VESLIT Council", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEA4SM5-FCSPg/profile-treasury-image-shrink_800_800/B4EZoA4HLzGUAc-/0/1760951303990?e=1765306800&v=beta&t=LBxKRgpnyIbFVgmJHwNl-SvOVPMTnV_DYdzElw6CmDs" },
                { name: "Maharashtra Youth For Climate Action Certifications by MYCA Foundation", url: "https://media.licdn.com/dms/image/sync/v2/D4E27AQG0rz56gbF55A/articleshare-shrink_800/B4EZlJePPJHIAI-/0/1757874294928?e=1765306800&v=beta&t=zJN1EgFmVaaiGmOT5LpnVfZGsVWX8V-bHvcISz58z9c" },
                { name: "Manorama Tell Me Why Quiz - Current Affairs of 2019 by Manorama Tell Me Why and BSE as Exchange Partner", url: "https://media.licdn.com/dms/image/v2/D4E2DAQE6P5eZ9bfP8g/profile-treasury-image-shrink_800_800/B4EZlCPKUYKYAY-/0/1757752898042?e=1765310400&v=beta&t=a0W3IZXd7cyBrvz6N8QYjVEKEpJejKZVBUfOZtACiCQ" },
                { name: "Akhil Bhartiya Gandharva Mahavidyalay Certification of Excellence in Harmonium by Akhil Bhartiya Gandharva Mahavidyalay Mandal", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEEIMn0H_wBmg/profile-treasury-image-shrink_800_800/B4EZlCOXHmIQAY-/0/1757752690605?e=1765310400&v=beta&t=CGtuJcA3t-s-ymYGUxoIZvNZv6xcv19Qr1fn2nCq6Bc" },
                { name: "Dr. Homi Bhabha Balvaidnyanik Competition by The Mumbai Science Teachers' Association", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEY-OQ-VB5utA/profile-treasury-image-shrink_800_800/B4EZlCMOgKKoAY-/0/1757752128119?e=1765310400&v=beta&t=TR_dYf6oAF0srwHmYjCKZ94HRo-GXDCv5ZTOz-YygEI" },
                { name: "IProto Robotics & Automation Program under IRoboKid", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEzubPpgxt0fA/profile-treasury-image-shrink_800_800/B4EZlIDdJkGwAY-/0/1757850495258?e=1765310400&v=beta&t=0u6KBNIOJlhFI_JMqVbIrNhunvbn6SR6jyZH3fQaLAM" },
                { name: "SilverZone Olympiad - English Language by SilverZone Foundation under Society of Science Education", url: "https://media.licdn.com/dms/image/v2/D4E2DAQFIJYPUHkuMvw/profile-treasury-image-shrink_800_800/B4EZlCJX3XIQAY-/0/1757751380947?e=1765310400&v=beta&t=PQFWVw04ru_9Gck8vX9sAtqGvHhFIzs2wnrjxoCRq2A" },
                { name: "SilverZone Olympiad - Science by SilverZone Foundation under Society of Science Education", url: "https://media.licdn.com/dms/image/v2/D4E2DAQHxX0l8GVqVQA/profile-treasury-image-shrink_800_800/B4EZlCJPGQHEAc-/0/1757751343411?e=1765310400&v=beta&t=KSA-J5MKKyCW_KNAHRUsK9vZdRUT7WCL_gX4_qSyUqc" },
                { name: "SilverZone Olympiad - Informatics by SilverZone Foundation under Society of Science Education", url: "https://media.licdn.com/dms/image/v2/D4E2DAQH_mwdUPx3TAA/profile-treasury-image-shrink_800_800/B4EZlCJJteIkAY-/0/1757751321223?e=1765310400&v=beta&t=2gQdXsp1j6Cpnn4780F5YE4jp08rwJbMynB7UZKPnto" },
                { name: "Helen O' Grady International's Course Completion in Speech & Drama", url: "https://media.licdn.com/dms/image/v2/D4E2DAQEc4sZT12HxZA/profile-treasury-image-shrink_800_800/B4EZlCLO8XIwAY-/0/1757751867647?e=1765310400&v=beta&t=VfFT5qYd61miP7RqDtNo2AMsfKoy9sV9UHdzksrSdtY" },
                { name: "Second Summer Coaching Camp in Badminton by Mulund Gymkhana", url: "https://media.licdn.com/dms/image/v2/D4E2DAQGWR6ddUpOJ9g/profile-treasury-image-shrink_800_800/B4EZlCKVcIGoAY-/0/1757751633977?e=1765310400&v=beta&t=ENQPOLPnwCoZ0i7MbvM5YGsHshgXqDmMeiiuxK9yiVc" },
                { name: "SpellBee Certificate of Merit International Level by SpellBee International", url: "https://media.licdn.com/dms/image/v2/D4E2DAQF5eTREnA6PvA/profile-treasury-image-shrink_800_800/B4EZlCE9nYHIAY-/0/1757750228230?e=1765310400&v=beta&t=IvFs2x1FggD4L5AnXDXqlm_UoPg1E4BLBsiBepRWtIA" },
                { name: "National Abacus & Mental Arithmetic and Mathematics Test", url: "https://media.licdn.com/dms/image/v2/D4E2DAQE92UW2rCsFHw/profile-treasury-image-shrink_800_800/B4EZlCEBEwGYAY-/0/1757749979652?e=1765310400&v=beta&t=ULcUHgTUqsHvVUrhnNxpYvTzXxEPGTcuw4CSQMz0uYM" },
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
                                    <motion.a
                                        key={idx}
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
