import Header from "@/components/Header";

export default function Home() {
  const projects = [
    { name: "FireFree", type: "Development", role: "Product Design", year: "2025" },
    { name: "CoreHour", type: "Development", role: "Lead Design", year: "2025" },
    { name: "HandyTools", type: "Development", role: "Web & mobile", year: "2024" },
    { name: "Cleaning Service Platform", type: "Development", role: "UI/UX", year: "2023" },
    { name: "Yahoo App", type: "Development", role: "Interaction", year: "2022" },
  ];

  const socialLinks = [
    { name: "X", url: "#" },
    { name: "INSTAGRAM", url: "#" },
    { name: "LINKEDIN", url: "#" },
    { name: "DRIBBBLE", url: "#" },
    { name: "GITHUB", url: "#" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-serif mb-4 leading-tight">
            Carol Hsiao
          </h1>
          <p className="text-2xl md:text-3xl font-serif mb-2 leading-relaxed">
            Independent Front End
          </p>
          <p className="text-2xl md:text-3xl font-serif mb-6 flex items-center justify-center gap-3 leading-relaxed">
            <span className="text-2xl">◆</span>
            Developer
            <span className="text-2xl">◆</span>
          </p>
          <p className="text-xl md:text-2xl font-serif text-gray-600">
            Currently Building @FireFree
          </p>
        </div>
      </section>

      {/* Projects Table Section */}
      <section id="work" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-gray-300">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-8 py-5 text-xs font-medium text-gray-500 uppercase tracking-widest">
              <div>Project</div>
              <div>Type</div>
              <div>Role</div>
              <div>Year</div>
            </div>

            {/* Table Rows */}
            {projects.map((project, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-8 py-7 border-t border-gray-200 hover:bg-[#f5f3f0] transition-colors cursor-pointer"
              >
                <div className="font-normal text-[15px]">{project.name}</div>
                <div className="text-gray-600 text-[15px]">{project.type}</div>
                <div className="text-gray-600 text-[15px]">{project.role}</div>
                <div className="text-gray-600 text-[15px]">{project.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif mb-10">About</h2>
          <p className="text-base leading-relaxed mb-5">
            I'm a product designer and creative developer of Aburi Studio based in Calgary.
          </p>
          <p className="text-base leading-relaxed mb-12">
            I believe the best digital experiences are those that respect people's time and attention
            while bringing moments of unexpected delight.
          </p>

          <div className="inline-block">
            <div className="w-44 h-60 bg-gray-800 rounded-3xl overflow-hidden shadow-lg">
              {/* Placeholder for profile image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-400 text-xs">
                Profile Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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

      {/* Footer */}
      <footer className="py-10 px-8 mt-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs text-gray-500">
          <div>Made with real ❤️ by Carol Hsiao</div>
          <div>© 2025 All rights reserved</div>
        </div>
      </footer>
    </div>
  );
}
