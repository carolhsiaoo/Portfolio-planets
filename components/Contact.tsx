export default function Contact() {
  const socialLinks = [
    { name: "X", url: "#" },
    { name: "INSTAGRAM", url: "#" },
    { name: "LINKEDIN", url: "#" },
    { name: "DRIBBBLE", url: "#" },
    { name: "GITHUB", url: "#" },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-serif mb-6 sm:mb-8 md:mb-10">Let's talk!</h2>

        <a
          href="mailto:hello@carolhsiao.com"
          className="text-base sm:text-lg font-normal hover:opacity-60 transition-opacity inline-block mb-6 sm:mb-8 md:mb-10"
        >
          hello@carolhsiao.com
        </a>

        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-[10px] sm:text-xs font-medium tracking-wider">
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
}
