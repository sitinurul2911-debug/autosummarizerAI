import Section from "../components/Section";
import Heading from "../components/Heading";
import { useState } from "react";
import { dev1, dev2, dev3, dev4, dev5, dev6 } from "../assets";

const developers = [
    {
        id: 1,
        name: "Ilona Kalista",
        role: "Lead AI Engineer",
        image: dev1, 
        bio: "Expert in artificial intelligence and machine learning. Passionate about creating innovative AI solutions that solve real-world problems.",
    },
    {
        id: 2,
        name: "Lidya Auliyana",
        role: "Full Stack Developer",
        image: dev2, 
        bio: "Expert in building scalable web applications with modern technologies. Passionate about creating intuitive user experiences and clean, maintainable code.",
    },
    {
        id: 3,
        name: "Muhammad Reza",
        role: "Machine Learning Specialist",
        image: dev3, 
        bio: "Specializes in deep learning and neural networks. Experienced in developing cutting-edge ML models for various applications.",
    },
    {
        id: 4,
        name: "Muhammad Luhur",
        role: "Frontend Developer",
        image: dev4, 
        bio: "Creates beautiful and intuitive user interfaces. Focuses on user-centered design and modern design principles.",
    },
    {
        id: 5,
        name: "Najma Aisyah",
        role: "Backend Developer",
        image: dev5, 
        bio: "Expert in server-side development and database architecture. Builds robust and scalable backend systems.",
    },
    {
        id: 6,
        name: "Siti Nurul",
        role: "DevOps Engineer",
        image: dev6, 
        bio: "Specializes in automation and cloud infrastructure. Ensures smooth deployment and operations of applications.",
    },
];

const AboutUs = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerView = 3; 

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex + 1 >= developers.length - cardsPerView + 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? developers.length - cardsPerView : prevIndex - 1
        );
    };

    return (
        <Section id="about">
            <div className="container relative z-2">
                <Heading 
                    className="md:max-w-md lg:max-w-2xl" 
                    title="About Us" 
                    text="Behind Makan Bang AI"
                />

                <div className="relative mt-16 px-16">
                    {/* Slider Container */}
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-out gap-6"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
                            }}
                        >
                            {developers.map((dev) => (
                                <div
                                    key={dev.id}
                                    className="min-w-[calc(33.333%-1rem)] group"
                                    style={{ perspective: "1000px" }}
                                >
                                    <div className="relative w-full h-[500px] transition-transform duration-700 preserve-3d group-hover:[transform:rotateY(180deg)]">
                                        {/* Front Side - Photo */}
                                        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-n-6 bg-n-7">
                                            <img
                                                src={dev.image}
                                                alt={dev.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-n-8 via-n-8/80 to-transparent p-6">
                                                <h3 className="h5 text-white mb-1">{dev.name}</h3>
                                                <p className="body-2 text-color-1 font-semibold">{dev.role}</p>
                                            </div>
                                        </div>

                                        {/* Back Side - Info */}
                                        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-n-6 p-8 flex flex-col justify-center">
                                            <h3 className="h5 text-white mb-2">{dev.name}</h3>
                                            <p className="text-color-1 font-semibold mb-6 text-lg">{dev.role}</p>
                                            <p className="body-2 text-n-3 leading-relaxed">{dev.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {developers.length > cardsPerView && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-n-7 border border-n-6 flex items-center justify-center hover:bg-n-6 transition-colors z-10 disabled:opacity-30"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-n-7 border border-n-6 flex items-center justify-center hover:bg-n-6 transition-colors z-10 disabled:opacity-30"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: developers.length - cardsPerView + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                currentIndex === idx
                                    ? "bg-color-1 w-8"
                                    : "bg-n-6"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};


export default AboutUs;
