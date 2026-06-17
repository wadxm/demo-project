import React, { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Github,
  Mail,
  MapPin,
  Moon,
  Send,
  Sparkles,
  Sun,
} from "lucide-react";
import heroImage from "./assets/hero-workspace.png";
import { isValidContactPayload, normalizeContactPayload } from "./utils/contact.js";
import { profile, projects, skills } from "./data/profile.js";

const filters = ["All", "Product", "Brand", "Prototype"];

function normalizeFilterValue(value) {
  return value.trim().toLowerCase();
}

export function App() {
  const [theme, setTheme] = useState("light");
  const [activeFilter, setActiveFilter] = useState("All");
  const [contactState, setContactState] = useState("idle");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    const selectedCategory = normalizeFilterValue(activeFilter);

    return projects.filter(
      (project) => normalizeFilterValue(project.category) === selectedCategory,
    );
  }, [activeFilter]);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.body.dataset.theme = nextTheme;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = normalizeContactPayload(new FormData(event.currentTarget));

    if (!isValidContactPayload(payload)) {
      setContactState("error");
      return;
    }

    setContactState("sent");
    event.currentTarget.reset();
  }

  return (
    <main>
      <header className="site-header" aria-label="Primary">
        <a className="brand-mark" href="#top" aria-label="Demo homepage">
          DX
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      <section className="hero-section" id="top">
        <img src={heroImage} alt="" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">
            <Sparkles size={16} />
            Independent portfolio demo
          </p>
          <h1>{profile.name}</h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#work">
              View work
              <ArrowUpRight size={18} />
            </a>
            <a className="secondary-action" href="/resume-demo.pdf">
              Resume
            </a>
          </div>
        </div>
        <aside className="hero-card" aria-label="Profile facts">
          <p>{profile.role}</p>
          <span>
            <MapPin size={15} />
            {profile.location}
          </span>
        </aside>
      </section>

      <section className="stats-band" aria-label="Highlights">
        {profile.stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="section-grid" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>Compact case studies with measurable outcomes.</h2>
        </div>
        <div className="work-panel">
          <div className="filter-row" aria-label="Project filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={filter === activeFilter ? "filter is-active" : "filter"}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <div>
                  <span>{project.category}</span>
                  <strong>{project.year}</strong>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <small>{project.impact}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-band" id="process">
        <div>
          <p className="eyebrow">Process</p>
          <h2>From fuzzy idea to shipped behavior.</h2>
        </div>
        <ol className="process-list">
          <li>
            <BriefcaseBusiness size={19} />
            <span>Frame the product bet and success signal.</span>
          </li>
          <li>
            <Check size={19} />
            <span>Prototype the core interaction before expanding scope.</span>
          </li>
          <li>
            <Sparkles size={19} />
            <span>Polish the moment that users repeat every day.</span>
          </li>
        </ol>
      </section>

      <section className="skills-section" aria-label="Capabilities">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Start a Conversation</p>
          <h2>Have a product story that needs shape?</h2>
          <p>
            Send a short note and this demo form will validate the fields locally.
          </p>
          <a href={`mailto:${profile.email}`}>
            <Mail size={17} />
            {profile.email}
          </a>
          <a href="https://github.com/wadxm/demo-project" target="_blank" rel="noreferrer">
            <Github size={17} />
            GitHub repository
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" autoComplete="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input name="email" autoComplete="email" placeholder="you@example.com" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" placeholder="What are you working on?" />
          </label>
          <button type="submit">
            Send note
            <Send size={17} />
          </button>
          {contactState === "sent" && (
            <p className="form-status success">Thanks, your demo message passed validation.</p>
          )}
          {contactState === "error" && (
            <p className="form-status error">Please add your name, email, and a short message.</p>
          )}
        </form>
      </section>
    </main>
  );
}
