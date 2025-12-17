import { memo } from 'react';
import Image from 'next/image';

const About = memo(function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center">
        {/* About heading with stars */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 flex items-center justify-center gap-4">
          <span className="text-3xl sm:text-4xl">✦</span>
          About
          <span className="text-3xl sm:text-4xl">✦</span>
        </h2>

        {/* Description text */}
        <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed mb-6 whitespace-nowrap">
          I build products that create true value for users.
        </p>
        <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed mb-12 whitespace-nowrap">
          I'm a designer and developer of Aburi Studio based in Calgary.
        </p>

        {/* Profile image - centered */}
        <div className="flex justify-center">
          <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gray-800 rounded-3xl overflow-hidden shadow-lg" style={{ border: '3px solid #D9D9D9' }}>
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
