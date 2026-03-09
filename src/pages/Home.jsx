import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { getText } from "../translations";

const FEATURED_PLANTS = [
  { emoji: "🌱", name: "Ashwagandha", sanskrit: "अश्वगंधा", descKey: "plant_ashwagandha_desc", color: "#4a7c59" },
  { emoji: "🌿", name: "Tulsi", sanskrit: "तुलसी", descKey: "plant_tulsi_desc", color: "#3d6b30" },
  { emoji: "🌾", name: "Brahmi", sanskrit: "ब्राह्मी", descKey: "plant_brahmi_desc", color: "#4a6b3a" },
  { emoji: "🍃", name: "Neem", sanskrit: "नीम", descKey: "plant_neem_desc", color: "#2d5a20" },
  { emoji: "🌸", name: "Shatavari", sanskrit: "शतावरी", descKey: "plant_shatavari_desc", color: "#6b4a5a" },
  { emoji: "🌼", name: "Turmeric", sanskrit: "हल्दी", descKey: "plant_turmeric_desc", color: "#8a6a1a" },
];

export default function Home() {
  const heroRef = useRef(null);
  const { lang } = useLang();
  const T = (key) => getText(lang, key);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      el.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "6rem 2rem 4rem",
        position: "relative", overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, #1a3d1e 0%, var(--bg) 70%)",
      }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(106,158,90,0.08) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", top: "20%", right: "15%", pointerEvents: "none", animation: "float 6s ease-in-out infinite" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(37,74,43,0.4)", border: "1px solid rgba(106,158,90,0.4)",
          borderRadius: "100px", padding: "6px 16px", marginBottom: "2rem",
          fontSize: "0.8rem", color: "var(--sage)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500,
        }}>
          <span style={{ animation: "pulse-gold 2s infinite" }}>●</span>
          {T("hero_badge")}
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 600, lineHeight: 1.05, marginBottom: "0.5rem", color: "var(--parchment)" }}>
          {T("hero_heading1")}
        </h1>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: "1.5rem",
          background: "linear-gradient(135deg, var(--gold-light), var(--sage), var(--gold))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          {T("hero_heading2")}
        </h1>

        <p style={{ maxWidth: 560, margin: "0 auto 3rem", color: "var(--text2)", fontSize: "1.1rem", lineHeight: 1.75, fontWeight: 300 }}>
          {T("hero_sub")}
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/identify" style={{
            background: "linear-gradient(135deg, #3d6b30, #2d5a20)", border: "1px solid var(--sage)",
            color: "var(--parchment)", padding: "14px 32px", borderRadius: "100px", fontSize: "1rem", fontWeight: 500,
            transition: "all 0.3s", boxShadow: "0 4px 30px rgba(61,107,48,0.4)",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(61,107,48,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 30px rgba(61,107,48,0.4)"; }}
          >{T("hero_btn_identify")}</Link>

          <Link to="/explore" style={{
            background: "transparent", border: "1px solid var(--border)",
            color: "var(--text)", padding: "14px 32px", borderRadius: "100px", fontSize: "1rem", fontWeight: 400, transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-dim)"; e.currentTarget.style.color = "var(--gold-light)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
          >{T("hero_btn_explore")}</Link>
        </div>

        <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            [T("hero_stat1_num"), T("hero_stat1_label")],
            [T("hero_stat2_num"), T("hero_stat2_label")],
            [T("hero_stat3_num"), T("hero_stat3_label")],
          ].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--gold)", fontWeight: 600 }}>{num}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Plants */}
      <section style={{ padding: "5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "var(--sage)", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{T("featured_label")}</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--parchment)", fontWeight: 600 }}>{T("featured_heading")}</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {FEATURED_PLANTS.map((plant) => {
            const rgb = hexToRgb(plant.color);
            return (
              <Link to="/identify" key={plant.name} style={{
                background: `linear-gradient(135deg, rgba(${rgb}, 0.12), rgba(${rgb}, 0.05))`,
                border: `1px solid rgba(${rgb}, 0.25)`,
                borderRadius: "var(--radius-lg)", padding: "1.5rem",
                transition: "all 0.3s", display: "block",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(${rgb}, 0.2)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{plant.emoji}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--parchment)", fontWeight: 600, marginBottom: "2px" }}>{plant.name}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--gold-dim)", marginBottom: "0.75rem", fontStyle: "italic" }}>{plant.sanskrit}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.5 }}>{T(plant.descKey)}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 2rem", textAlign: "center", background: "linear-gradient(180deg, transparent, rgba(26,61,30,0.2), transparent)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--parchment)", marginBottom: "1rem" }}>
          {T("cta_heading")}
        </h2>
        <p style={{ color: "var(--text2)", marginBottom: "2rem", maxWidth: 440, margin: "0 auto 2rem" }}>{T("cta_sub")}</p>
        <Link to="/identify" style={{
          background: "linear-gradient(135deg, var(--gold-dim), #6a4a1a)", border: "1px solid var(--gold)",
          color: "var(--parchment)", padding: "14px 36px", borderRadius: "100px", fontSize: "1rem", fontWeight: 500,
          display: "inline-block", transition: "all 0.3s", boxShadow: "0 4px 30px rgba(201,168,76,0.25)",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(201,168,76,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 30px rgba(201,168,76,0.25)"; }}
        >{T("cta_btn")}</Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: "2rem", textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text3)", fontSize: "0.85rem" }}>
        <span style={{ fontFamily: "var(--font-display)", color: "var(--gold-dim)", fontSize: "1.1rem" }}>Aaushade</span>
        {" "}· {T("footer_tagline")}
      </footer>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}