import { memo } from 'react';
import Image from 'next/image';

const About = memo(function About() {
  return (
    <section id="about" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl mb-10">About</h2>
        <p className="text-base leading-relaxed mb-5">
          I'm a product designer and creative developer of Aburi Studio based in Calgary.
        </p>
        <p className="text-base leading-relaxed mb-12">
          I believe the best digital experiences are those that respect people's time and attention
          while bringing moments of unexpected delight.
        </p>

        <div className="inline-block">
          <div className="w-60 h-60 bg-gray-800 rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/carol-image.png"
              alt="Profile"
              width={240}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
