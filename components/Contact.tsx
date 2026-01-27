import { memo } from 'react';

const Contact = memo(function Contact() {
  const socialLinks = [
    { name: "X", url: "https://x.com/CarolXiaoo" },
    { name: "INSTAGRAM", url: "https://www.instagram.com/itscarolstudio/?next=/" },
    { name: "THREADS", url: "https://www.threads.net/@itscarolstudio" },
    { name: "LINKEDIN", url: "https://www.linkedin.com/in/carol-hsiao-5779a1158/" },
    { name: "DRIBBBLE", url: "https://dribbble.com/carolhsiao" },
    { name: "GITHUB", url: "https://github.com/carolhsiaoo?tab=overview&from=2025-12-01&to=2025-12-05" },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl font-medium mb-6 sm:mb-8 md:mb-10">Let's talk!</h2>

        <a
          href="mailto:carolhsiaostudio@gmail.com"
          className="text-base sm:text-lg font-cinzel hover:opacity-60 transition-opacity inline-block mb-6 sm:mb-8 md:mb-10"
        >
          carolhsiaostudio@gmail.com
        </a>

        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm lg:text-base tracking-wider">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="hover:opacity-60 transition-opacity"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Contact;
