export default function SkillTags({ skills }) {

  return (

    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700">

      <h2 className="text-2xl font-bold mb-6">

        Extracted Skills

      </h2>

      <div className="flex flex-wrap gap-3">

        {skills.map((skill) => (

          <span
            key={skill}
            className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full"
          >
            {skill}
          </span>

        ))}

      </div>

    </div>

  );

}