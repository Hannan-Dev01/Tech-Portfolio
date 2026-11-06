"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type FormEvent, useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    title: "Codapet",
    tag: "Scheduling / Voice AI",
    summary: "A custom booking platform that replaces rigid third-party scheduling with calendar-aware, voice-enabled workflows.",
    details: ["Google + Apple Calendar synchronization", "Voice-led appointment booking", "n8n payment and email automations"],
  },
  {
    number: "02",
    title: "Cred",
    tag: "AI CRM / Intelligence",
    summary: "A purpose-built CRM that turns conversations and customer data into useful signals for sales teams.",
    details: ["Gong-integrated API workflows", "LLM-generated chart insights", "Semantic meeting transcript search"],
  },
  {
    number: "03",
    title: "Eroxr",
    tag: "Social / Live Media",
    summary: "A real-time social product combining community, live interaction, and secure monetization.",
    details: ["Audio, video, chat, and live streaming", "Pusher-powered realtime events", "Stripe subscriptions and tipping"],
  },
  {
    number: "04",
    title: "AfriCreative Jobs",
    tag: "Marketplace",
    summary: "A freelancing platform made for the African job market, connecting talent with meaningful opportunity.",
    details: ["Portfolio and application management", "Freelancer-recruiter chat", "End-to-end MERN implementation"],
  },
];

const skills = [
  ["Interface", "React", "Next.js", "TypeScript", "Tailwind CSS", "Redux / Zustand"],
  ["Systems", "Node.js", "Express", "GraphQL", "REST APIs", "PostgreSQL", "MongoDB"],
  ["Intelligence", "OpenAI integrations", "Voice agents", "n8n", "pgvector", "Elasticsearch"],
];

const rise = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };
const sectionReveal = { hidden: { opacity: 0, y: 38 }, visible: { opacity: 1, y: 0 } };

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    setMenuOpen(false);
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("sending");
    setFormMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      form.reset();
      setFormState("success");
      setFormMessage("Message sent. Abdul will be in touch shortly.");
    } catch (error) {
      setFormState("error");
      setFormMessage(error instanceof Error ? error.message : "Something went wrong. Please email Abdul directly.");
    }
  };

  return (
    <main>
      <nav className="nav wrap" aria-label="Primary navigation">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Back to top">AH<span>®</span></button>
        <div className="nav-links">
          <button onClick={() => scrollTo("work")}>Selected work</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        <AnimatePresence>
          {menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <button onClick={() => scrollTo("work")}>Selected work</button><button onClick={() => scrollTo("about")}>About</button><button onClick={() => scrollTo("contact")}>Contact</button>
          </motion.div>}
        </AnimatePresence>
      </nav>

      <section id="top" className="hero wrap">
        <motion.p className="eyebrow" initial="hidden" animate="visible" variants={rise} transition={{ duration: 0.5 }}>Lahore, Pakistan <i /> Available for thoughtful work</motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={rise} transition={{ duration: 0.7, delay: 0.08 }}>
          Engineering <em>useful</em><br />systems for a<br />moving world.
        </motion.h1>
        <motion.div className="hero-bottom" initial="hidden" animate="visible" variants={rise} transition={{ duration: 0.6, delay: 0.22 }}>
          <p>I’m Abdul Hannan — a full-stack engineer shaping web products and AI automation that make complicated work feel natural.</p>
          <button className="round-link" onClick={() => scrollTo("work")}>Explore<br />the work <Arrow /></button>
        </motion.div>
        <div className="orb orb-one" /><div className="orb orb-two" />
      </section>

      <motion.section id="work" className="work-section wrap" initial={reducedMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={sectionReveal} transition={{ duration: 0.65, ease: "easeOut" }}>
        <div className="section-kicker"><span>01 / Selected work</span><span>2023—now</span></div>
        <div className="project-grid">
          <div className="project-list" role="tablist" aria-label="Projects">
            {projects.map((project, index) => <button key={project.title} role="tab" aria-selected={activeProject === index} className={activeProject === index ? "active" : ""} onClick={() => setActiveProject(index)}><span>{project.number}</span>{project.title}<Arrow /></button>)}
          </div>
          <AnimatePresence mode="wait">
            <motion.article key={projects[activeProject].title} className="project-detail" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.35 }} role="tabpanel">
              <div className="project-orbit"><span>{projects[activeProject].number}</span></div>
              <p className="eyebrow">{projects[activeProject].tag}</p>
              <h2>{projects[activeProject].title}</h2>
              <p className="project-summary">{projects[activeProject].summary}</p>
              <ul>{projects[activeProject].details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </motion.article>
          </AnimatePresence>
        </div>
      </motion.section>

      <motion.section id="about" className="about wrap" initial={reducedMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={sectionReveal} transition={{ duration: 0.65, ease: "easeOut" }}>
        <div className="section-kicker"><span>02 / Practice</span><span>Full stack × AI</span></div>
        <div className="about-copy"><p className="display-copy">The best technology is <em>quietly capable.</em> It leaves people with more time, more clarity, and less friction.</p><p>Over three years, I’ve built end-to-end products across calendar infrastructure, CRM systems, real-time social experiences, and AI-powered search. I care about robust engineering, direct collaboration, and experiences that earn their place.</p></div>
        <div className="skill-columns">{skills.map(([label, ...items]) => <div key={label}><p>{label}</p>{items.map((item) => <span key={item}>{item}</span>)}</div>)}</div>
      </motion.section>

      <motion.section className="experience wrap" initial={reducedMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.16 }} variants={sectionReveal} transition={{ duration: 0.65, ease: "easeOut" }}>
        <div className="section-kicker"><span>03 / Experience</span><span>Building in public</span></div>
        <motion.article initial={reducedMotion ? false : { opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.45 }}><p>Oct 2024 — Present</p><div><h3>Software Engineer L3 <span>at Recurso Labs</span></h3><p>Developing custom scheduling, voice automation, CRM intelligence, and transcript-search systems that replace fragmented SaaS workflows.</p></div></motion.article>
        <motion.article initial={reducedMotion ? false : { opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.45, delay: 0.1 }}><p>Apr 2023 — Oct 2023</p><div><h3>MERN Stack Developer <span>at Hybsol Technologies</span></h3><p>Delivered social-product features spanning realtime communication, streaming, notifications, and payments.</p></div></motion.article>
      </motion.section>

      <motion.section id="contact" className="contact wrap" initial={reducedMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={sectionReveal} transition={{ duration: 0.65, ease: "easeOut" }}>
        <p className="eyebrow">04 / Let’s build something with signal</p>
        <h2>Have a complex<br />problem? <em>Good.</em></h2>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={sendMessage}>
            <label>Name<input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
            <label>Message<textarea name="message" required maxLength={4000} placeholder="Tell me about the problem you’re solving." rows={4} /></label>
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button className="send-button" disabled={formState === "sending"}>{formState === "sending" ? "Sending…" : "Send message"} <Arrow /></button>
            <p className={`form-status ${formState}`} aria-live="polite">{formMessage}</p>
          </form>
          <p className="contact-note">Or write directly at <a href="mailto:hananabdul659@gmail.com?subject=Let%27s%20work%20together">hananabdul659@gmail.com <Arrow /></a></p>
        </div>
        <footer><span>© {new Date().getFullYear()} Abdul Hannan</span><a href="https://www.linkedin.com/in/abdul-hannan093090223" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><span>Built with intention.</span></footer>
      </motion.section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Abdul Hannan", jobTitle: "Full-Stack & AI Automation Engineer", email: "mailto:hananabdul659@gmail.com", address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" }, sameAs: ["https://www.linkedin.com/in/abdul-hannan093090223"], knowsAbout: ["Next.js", "TypeScript", "Node.js", "AI Automation", "LLM Systems"] }) }} />
    </main>
  );
}
