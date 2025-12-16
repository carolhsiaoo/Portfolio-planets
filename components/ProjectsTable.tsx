import { memo } from 'react';

const ProjectsTable = memo(function ProjectsTable() {
  const projects = [
    { name: "FireFree", type: "Web", role: "Designer & developer", year: "2025" },
    { name: "CoreHour", type: "Web", role: "Designer & developer", year: "2025" },
    { name: "HandyTools", type: "ARVR", role: "Designer & developer", year: "2024" },
    { name: "Cleaning Service Platform", type: "Web", role: "UI/UX Designer", year: "2023" },
    { name: "Yahoo App", type: "Mobile App", role: "UX Researcher", year: "2022" },
  ];

  return (
    <section id="work" className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div>
          {/* Table Header - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:grid grid-cols-4 gap-8 lg:gap-16 py-4 md:py-5 text-xs font-medium text-gray-500 uppercase tracking-widest">
            <div>Project</div>
            <div>Type</div>
            <div>Role</div>
            <div>Year</div>
          </div>

          {/* Table Rows - Cards on mobile, table on tablet+ */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="border-t border-gray-200 hover:bg-[#f5f3f0] transition-colors cursor-pointer"
            >
              {/* Mobile Card Layout */}
              <div className="md:hidden py-5 sm:py-6">
                <div className="font-medium text-base sm:text-lg mb-3">{project.name}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span>{project.type}</span>
                  <span className="text-gray-300">|</span>
                  <span>{project.role}</span>
                  <span className="text-gray-300">|</span>
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Tablet+ Table Layout */}
              <div className="hidden md:grid grid-cols-4 gap-8 lg:gap-16 py-5 md:py-7">
                <div className="font-normal text-sm md:text-base text-left">{project.name}</div>
                <div className="text-sm md:text-base">{project.type}</div>
                <div className="text-sm md:text-base">{project.role}</div>
                <div className="text-sm md:text-base">{project.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ProjectsTable;
