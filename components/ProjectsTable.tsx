import { memo } from 'react';
import Image from 'next/image';

const ProjectsTable = memo(function ProjectsTable() {
  const projects = [
    {
      name: "FireFree",
      type: "Web & Mobile App",
      role: "Designer/Developer",
      year: "2025 ~ now",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop",
      video: "/firefree-demo.mp4", // Add your video file to the public folder
    },
    {
      name: "DailyPay",
      type: "Mobile App",
      role: "Designer/Developer",
      year: "2026",
      image: "/dailypay-img.png",
    },
    {
      name: "CoreHour",
      type: "Web",
      role: "Designer/Developer",
      year: "2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      video: "/corehour-demo.gif",
    },
    {
      name: "HandyTools",
      type: "ARVR",
      role: "Designer/Developer",
      year: "2024",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&h=700&fit=crop",
      video: "/handytools-demo.mp4",
    },
    {
      name: "Cleaning Service Platform",
      type: "Web",
      role: "UI/UX Designer",
      year: "2023",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section id="work" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Projects heading with stars */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-medium mb-16 flex items-center justify-center gap-4">
          <span className="text-3xl sm:text-4xl">✦</span>
          Projects
          <span className="text-3xl sm:text-4xl">✦</span>
        </h2>

        {/* Asymmetrical Exhibition Grid - matching Frame 13 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 lg:grid-flow-dense">
          {projects.map((project, index) => {
            // Define exact layout from Frame 13
            const gridLayout = {
              0: { span: "lg:col-span-12", aspect: "aspect-[5/2]" }, // FireFree - full width, taller
              1: { span: "lg:col-span-4", aspect: "aspect-[4/5]" }, // Yahoo App - same height as CoreHour
              2: { span: "lg:col-span-8", aspect: "aspect-[8/5]" }, // CoreHour - taller rectangle
              3: { span: "lg:col-span-8", aspect: "aspect-[8/5]" }, // HandyTools - same height as Cleaning Service
              4: { span: "lg:col-span-4", aspect: "aspect-[4/5]" }, // Cleaning Service - vertical
            };

            const layout = gridLayout[index as keyof typeof gridLayout];

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${layout.span} ${layout.aspect}`}
              >
                {/* Media Container with text overlay */}
                <div className={`relative w-full h-full overflow-hidden bg-gray-200`}>
                  {project.video ? (
                    project.video.endsWith('.gif') ? (
                      <Image
                        src={project.video}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={project.image}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Text overlay at bottom-left */}
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="text-sm font-inter mb-2 opacity-90">{project.year}</div>
                    <h3 className="text-2xl font-inter font-medium mb-1">{project.name}</h3>
                    <div className="text-sm font-inter opacity-90">{project.type}</div>
                    <div className="text-sm font-inter opacity-90">{project.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default ProjectsTable;
