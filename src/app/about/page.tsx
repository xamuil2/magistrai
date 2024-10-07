export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-dark-blue">
      <div className="flex flex-col items-center w-full">
        <div className="text-white text-5xl font-anek-latin mt-32" style={{ textShadow: '3px 3px 0 black' }}>
          about MagistrAI
        </div>
        <div className="text-white text-2xl italic font-anek-latin mt-4">
          ~ educare, non revelare ~
        </div>
      </div>
      <div className="mt-16 px-12 py-6 w-3/4 max-w-6xl text-2xl text-left text-white bg-transparent focus:outline-none tracking-wider leading-loose border-2 border-gray-500 mb-16" style={{ textShadow: '1px 1px 0 black' }}>
        <p>
          A good magistra does not reveal; she guides. But without an exceptional magistra to explain a passage, students rarely achieve a deep understanding of a Latin text on their own. Auxiliary dictionaries aid but don’t help students piece prose together. Additionally, online tools and textbook translations provide no explanation and insight on actual grammatical reasoning. Students don’t learn how to read or “think” like a latinist when simply given the answer... 
        </p>
        <p className="mt-6">
          MagistrAI aims to enhance students’ proficiency of Latin prose through grammatical annotations and visual cues. By highlighting and detailing the precise relationships and functions of words like any magistra would, magistrAI enables students to discover how the prose is formed. After this crucial step of reasoning and composition, students can then synthesize their own vocabulary and knowledge of grammar constructions to form memorable and heartfelt translations. If the student needs more support, magistrAI also provides dictionary definitions and example translations. Over time, magistrAI fosters students to rip apart and understand the real “thinking” behind Latin prose.
        </p>
      </div>
    </main>
  );
}