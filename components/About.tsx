export default function About() {
  return (
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
  );
}
