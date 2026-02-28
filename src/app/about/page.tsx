import Image from "next/image";
import Portfolio from "@/assets/images/Portfolio.jpeg";
import ButtonBack from "@/components/common/ButtonBack";
const About = () => {
  return (
    <div className="bg-[#111] text-gray-200 min-h-screen py-10 px-4 animate__animated animate__fadeInUp">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
          <ButtonBack />

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-15 lg:mt-0">
          {/* Text */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>

            <h5 className="text-lg md:text-xl text-gray-400 mb-6">
              I'm Zeyad Hatem, a passionate Web Developer specialized in
              Computer Science.
            </h5>

            <p className="mb-4 leading-relaxed">
              Since beginning my journey in software development, I've been
              continuously learning and growing to build efficient,
              user-friendly web applications that make a difference. I enjoy
              working with modern web technologies like React, Laravel, and
              APIs.
            </p>

            <p className="leading-relaxed">
              I always aim to deliver scalable and performance-driven web
              solutions while focusing on clean code and elegant UI/UX.
            </p>

            <a
              href="https://zeyadhatem.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              GO Portfolio
            </a>
          </div>

          {/* Image */}
          <div>
            <Image
              src={Portfolio}
              alt="About"
              className="w-full rounded-2xl shadow-2xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
