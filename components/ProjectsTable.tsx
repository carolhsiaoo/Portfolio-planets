export default function ProjectsTable() {
  const projects = [
    { name: "FireFree", type: "Development", role: "Product Design", year: "2025" },
    { name: "CoreHour", type: "Development", role: "Lead Design", year: "2025" },
    { name: "HandyTools", type: "Development", role: "Web & mobile", year: "2024" },
    { name: "Cleaning Service Platform", type: "Development", role: "UI/UX", year: "2023" },
    { name: "Yahoo App", type: "Development", role: "Interaction", year: "2022" },
  ];

  return (
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
  );
}
