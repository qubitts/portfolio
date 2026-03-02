import React from "react";
import {
  personalInfo,
  summary,
  experience,
  skills,
  education,
  certifications,
  achievements,
} from "@/data/resume";

export type CommandName =
  | "help"
  | "about"
  | "experience"
  | "skills"
  | "education"
  | "certifications"
  | "achievements"
  | "contact"
  | "socials"
  | "resume"
  | "game"
  | "portfolio"
  | "clear";

export interface CommandDef {
  description: string;
  output: () => React.ReactNode;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="text-mint text-glow text-lg font-bold mb-3 mt-1">
    {children}
  </div>
);

const Divider = () => (
  <div className="text-slate-dark my-2 select-none">
    {"─".repeat(60)}
  </div>
);

export const commandMap: Record<string, CommandDef> = {
  help: {
    description: "Show available commands",
    output: () => {
      const allCommands = [
        ...Object.entries(commandMap)
          .filter(([name]) => name !== "portfolio")
          .map(([name, cmd]) => ({ name, desc: cmd.description })),
        { name: "portfolio", desc: "Show full portfolio" },
      ];
      const maxLen = Math.max(...allCommands.map((c) => c.name.length));
      return (
        <div>
          <SectionTitle>Available Commands</SectionTitle>
          <div className="space-y-1">
            {allCommands.map((cmd) => (
              <div key={cmd.name} className="whitespace-pre">
                <span className="text-mint">
                  {cmd.name.padEnd(maxLen + 4)}
                </span>
                <span className="text-slate">{cmd.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },

  about: {
    description: "About me",
    output: () => (
      <div className="space-y-3">
        <SectionTitle>About Me</SectionTitle>
        <div className="text-gold text-glow-gold font-semibold">
          {personalInfo.name} — {personalInfo.role} @ {personalInfo.company}
        </div>
        <div className="text-slate text-sm">{personalInfo.location}</div>
        <Divider />
        {summary.split("\n\n").map((para, i) => (
          <p key={i} className="text-slate-light leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    ),
  },

  experience: {
    description: "Work experience",
    output: () => (
      <div className="space-y-6">
        <SectionTitle>Work Experience</SectionTitle>
        {experience.map((job, i) => (
          <div key={i} className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <div>
                <span className="text-gold text-glow-gold font-semibold">
                  {job.role}
                </span>
                <span className="text-slate"> @ </span>
                <span className="text-mint">{job.company}</span>
              </div>
              <span className="text-slate text-sm shrink-0">{job.period}</span>
            </div>
            <div className="text-slate text-sm">{job.location}</div>
            <ul className="space-y-1 ml-4">
              {job.highlights.map((h, j) => (
                <li key={j} className="text-slate-light text-sm">
                  <span className="text-mint mr-2">▸</span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="text-sm">
              <span className="text-slate">Tech: </span>
              <span className="text-mint/70">{job.tech}</span>
            </div>
            {i < experience.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    ),
  },

  skills: {
    description: "Technical skills",
    output: () => {
      const categories: { label: string; key: keyof typeof skills }[] = [
        { label: "Languages", key: "languages" },
        { label: "Frameworks", key: "frameworks" },
        { label: "Databases", key: "databases" },
        { label: "AI / ML", key: "ai_ml" },
        { label: "Cloud & DevOps", key: "cloud_devops" },
        { label: "Tools", key: "tools" },
      ];
      return (
        <div className="space-y-4">
          <SectionTitle>Technical Skills</SectionTitle>
          {categories.map((cat) => (
            <div key={cat.key}>
              <div className="text-gold text-sm font-semibold mb-1">
                {cat.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills[cat.key].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-sm text-mint border border-mint/20 rounded bg-mint/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    },
  },

  education: {
    description: "Education",
    output: () => (
      <div className="space-y-2">
        <SectionTitle>Education</SectionTitle>
        <div className="text-gold text-glow-gold font-semibold">
          {education.institution}
        </div>
        <div className="text-slate-light">{education.degree}</div>
        <div className="flex flex-col sm:flex-row sm:gap-6 gap-1 text-sm mt-1">
          <span className="text-mint">GPA: {education.gpa}</span>
          <span className="text-slate-light">{education.period}</span>
          <span className="text-slate-light">{education.location}</span>
        </div>
      </div>
    ),
  },

  certifications: {
    description: "Certifications & courses",
    output: () => (
      <div className="space-y-4">
        <SectionTitle>Certifications & Courses</SectionTitle>
        {certifications.map((cert, i) => (
          <div key={i} className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
              <span className="text-gold text-glow-gold font-semibold">
                {cert.name}
              </span>
              {cert.year && (
                <span className="text-slate text-sm">({cert.year})</span>
              )}
            </div>
            <div className="text-mint text-sm">Platform: {cert.platform}</div>
            <p className="text-slate-light text-sm leading-relaxed">
              {cert.description}
            </p>
            {i < certifications.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    ),
  },

  achievements: {
    description: "Achievements",
    output: () => (
      <div className="space-y-3">
        <SectionTitle>Achievements</SectionTitle>
        {achievements.map((ach, i) => (
          <div key={i} className="space-y-1">
            <div className="text-gold text-glow-gold font-semibold">
              {ach.title}
            </div>
            <p className="text-slate-light text-sm">{ach.description}</p>
            {ach.link && (
              <a
                href={ach.link}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-link text-sm"
              >
                {ach.link}
              </a>
            )}
          </div>
        ))}
      </div>
    ),
  },

  contact: {
    description: "Contact information",
    output: () => (
      <div className="space-y-2">
        <SectionTitle>Contact</SectionTitle>
        <div className="space-y-1">
          <div>
            <span className="text-slate w-20 inline-block">Email</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="terminal-link"
            >
              {personalInfo.email}
            </a>
          </div>
          <div>
            <span className="text-slate w-20 inline-block">Phone</span>
            <span className="text-slate-light">{personalInfo.phone}</span>
          </div>
        </div>
      </div>
    ),
  },

  socials: {
    description: "Social links",
    output: () => (
      <div className="space-y-2">
        <SectionTitle>Socials</SectionTitle>
        <div className="flex flex-col gap-1">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link"
          >
            ▸ LinkedIn — {personalInfo.linkedin}
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link"
          >
            ▸ GitHub — {personalInfo.github}
          </a>
          <a
            href={personalInfo.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link"
          >
            ▸ Twitter/X — {personalInfo.twitter}
          </a>
          <a
            href={personalInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link"
          >
            ▸ Instagram — {personalInfo.instagram}
          </a>
        </div>
      </div>
    ),
  },

  resume: {
    description: "Download resume",
    output: () => (
      <div className="space-y-2">
        <SectionTitle>Resume</SectionTitle>
        <a
          href="/PiyushResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-link"
        >
          ▸ Click here to view/download resume (PDF)
        </a>
      </div>
    ),
  },

  game: {
    description: "Play the dino game",
    output: () => null, // Handled specially in Terminal component
  },

  clear: {
    description: "Clear terminal",
    output: () => null,
  },

  portfolio: {
    description: "Show full portfolio",
    output: () => null, // Handled specially in Terminal component
  },
};

export const commandNames = Object.keys(commandMap) as CommandName[];

export const visibleCommands = commandNames.filter(
  (c) => c !== "clear" && c !== "portfolio"
);
