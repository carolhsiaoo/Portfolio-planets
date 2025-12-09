export default function Contact() {
  const socialLinks = [
    { name: "X", url: "#" },
    { name: "INSTAGRAM", url: "#" },
    { name: "LINKEDIN", url: "#" },
    { name: "DRIBBBLE", url: "#" },
    { name: "GITHUB", url: "#" },
  ];

  return (
    <section id="contact" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-serif mb-10">Let's talk!</h2>

        <a
          href="mailto:hello@carolhsiao.com"
          className="text-lg font-normal hover:opacity-60 transition-opacity inline-block mb-10"
        >
          hello@carolhsiao.com
        </a>

        <div className="flex gap-8 text-xs font-medium tracking-wider">
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
