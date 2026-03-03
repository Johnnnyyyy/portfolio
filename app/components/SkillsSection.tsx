import { SKILLS } from "../components/skills";

export default function SkillsSection() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <ul className="flex flex-wrap gap-3">
        {SKILLS.map((skill) => (
          <li
            key={skill}
            className="bg-zinc-800 text-zinc-200 px-3 py-1 rounded-full text-sm shadow hover:bg-accent hover:text-white transition-colors duration-200"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
