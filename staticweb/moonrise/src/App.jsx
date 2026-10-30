import { useEffect, useMemo, useState } from "react";
import { BRAND, SERVICES, STEPS, WHY } from "./data";
// import "./App.css";
import "./App.css";

const wa = (text) => `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
const mail = (subject, body) =>
  `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default function App() {
  const [open, setOpen] = useState(null); // service shown in the pop-up
  const [form, setForm] = useState({ name: "", message: "" });

  const stars = useMemo(
    () => Array.from({ length: 90 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 75,
      s: Math.random() * 2 + 1, d: Math.random() * 5,
    })), []);

  // The nav moon waxes from new to full as the page scrolls.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty("--p", max > 0 ? scrollY / max : 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // Reveal sections as they come into view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  const hello = `Hi ${BRAND.name}, I'm ${form.name || "a business owner"}. ${form.message}`;

  return (
    <>
      <div className="sky" aria-hidden="true">
        {stars.map((s) => (
          <i key={s.id} className="star"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
        ))}
      </div>

      <nav className="nav">
        <a href="#top" className="brand"><span className="phase" />{BRAND.name}</a>
        <div className="d-none d-md-flex gap-4">
          <a href="#about">About</a><a href="#services">Services</a>
          <a href="#process">How it works</a><a href="#contact">Contact</a>
        </div>
        <a className="btn btn-moon btn-sm" href={wa("Hi Moonrise, I'd like to know more.")} target="_blank" rel="noreferrer">
          WhatsApp us
        </a>
      </nav>

      <header id="top" className="hero">
        <div className="moon" aria-hidden="true"><b /><b /><b /></div>
        <div className="hills" aria-hidden="true" />
        <div className="container hero-text">
          <h1>Let your business rise.</h1>
          <p>
            Moonrise helps small businesses and startups get found, get chatted with and get chosen.
            Websites, Google profiles, WhatsApp and social media, with AI doing the repetitive work.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <a className="btn btn-moon btn-lg" href="#contact">Get a free quote</a>
            <a className="btn btn-ghost btn-lg" href="#services">See our services</a>
          </div>
        </div>
      </header>

      <section id="about" className="container section reveal">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h2>Who we are</h2>
            <p className="lead-soft">
              We are a small digital team that helps businesses of every size show up online and keep
              customers coming back.
            </p>
          </div>
          <div className="col-lg-6">
            <p>
              <strong>What we do:</strong> we build websites, set up and manage Google Business Profiles and
              WhatsApp Business accounts, run social media, and add AI chatbots that answer customers for you.
            </p>
            <p>
              <strong>How we help you grow:</strong> more people find you, they can message you in one tap, and
              every enquiry gets a quick reply. We stay on after launch with support plans so nothing gets stuck.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="container section">
        <h2 className="reveal">What we offer</h2>
        <p className="lead-soft reveal">For startups, local shops and larger companies. Tap a service for details.</p>
        <div className="row g-4 mt-1">
          {SERVICES.map((s, i) => (
            <div className="col-md-6 col-lg-4 reveal" key={s.title} style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
              <button className="card-s" onClick={() => setOpen(s)}>
                <span className="ico">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="container section">
        <h2 className="reveal">How it works</h2>
        <div className="row g-4 mt-1">
          {STEPS.map((s) => (
            <div className="col-md-6 col-lg-3 reveal" key={s.title}>
              <span className="phase big" style={{ "--p": s.p }} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2 className="reveal">Why Moonrise</h2>
        <div className="row g-4 mt-1">
          {WHY.map((w) => (
            <div className="col-md-6 reveal" key={w.title}>
              <div className="why"><h3>{w.title}</h3><p>{w.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="container section reveal">
        <div className="contact">
          <div className="row g-5">
            <div className="col-lg-5">
              <h2>Let's talk</h2>
              <p className="lead-soft">Tell us what you need. We usually reply the same day.</p>
              <p className="mb-1">📞 <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>{BRAND.phone}</a></p>
              <p>✉️ <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
            </div>
            <div className="col-lg-7">
              <label className="w-100 mb-3">Your name
                <input className="form-control" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="w-100 mb-3">How can we help?
                <textarea className="form-control" rows="4" value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </label>
              <div className="d-flex flex-wrap gap-3">
                <a className="btn btn-moon" href={wa(hello)} target="_blank" rel="noreferrer">Send on WhatsApp</a>
                <a className="btn btn-ghost" href={mail("Enquiry for Moonrise", hello)}>Send by email</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="foot">© {new Date().getFullYear()} {BRAND.name}. Growing businesses from first light.</footer>

      <a className="wa-float" href={wa("Hi Moonrise, I'd like to know more.")} target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp">💬</a>

      {open && (
        <div className="backdrop" onClick={() => setOpen(null)}>
          <div className="pop" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="x" onClick={() => setOpen(null)} aria-label="Close">×</button>
            <span className="ico">{open.icon}</span>
            <h3>{open.title}</h3>
            <p>{open.short}</p>
            <ul>{open.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <a className="btn btn-moon" target="_blank" rel="noreferrer"
              href={wa(`Hi Moonrise, I'm interested in: ${open.title}`)}>Ask about this on WhatsApp</a>
          </div>
        </div>
      )}
    </>
  );
}

