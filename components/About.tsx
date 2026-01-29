import { memo } from 'react';
import Image from 'next/image';

const About = memo(function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center">
        {/* About heading with stars */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-medium mb-8 sm:mb-10 md:mb-12 flex items-center justify-center gap-4">
          <span className="text-3xl sm:text-4xl">✦</span>
          About
          <span className="text-3xl sm:text-4xl">✦</span>
        </h2>

        {/* Description text */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter font-normal leading-relaxed mb-4 sm:mb-5 md:mb-6 max-w-full sm:max-w-2xl md:max-w-3xl px-2">
          I build products that create true value for users.
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter font-normal leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-full sm:max-w-2xl md:max-w-3xl px-2">
          I'm a product engineer at Aburi Studio based in Calgary.
        </p>

        {/* Profile image - centered */}
        <div className="flex justify-center">
          <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gray-800 rounded-[3rem] overflow-hidden shadow-lg">
            <Image
              src="/carol-image.png"
              alt="Profile"
              width={384}
              height={384}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
