import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { getText } from "../translations";

const LANG_OPTIONS = [
  { code: "en", label: "EN", full: "English" },
  { code: "hi", label: "हि", full: "हिंदी" },
  { code: "gu", label: "ગુ", full: "ગુજરાતી" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang } = useLang();
  const T = (key) => getText(lang, key);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setLangOpen(false), [location]);

  const links = [
    { to: "/", label: T("nav_home") },
    { to: "/identify", label: T("nav_identify") },
    { to: "/explore", label: T("nav_explore") },
  ];

  const activeLang = LANG_OPTIONS.find(l => l.code === lang);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2rem",
      background: scrolled ? "rgba(8,15,9,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(37,74,43,0.5)" : "none",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "68px",
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--sage-dark), var(--gold-dim))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px",
        }}>🌿</div>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: "1.5rem",
          fontWeight: 600, color: "var(--gold-light)", letterSpacing: "0.02em",
        }}>Aaushade</span>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {links.map(({ to, label }) => (
          <Link key={to} to={to} style={{
            color: location.pathname === to ? "var(--gold)" : "var(--text2)",
            fontWeight: 500, fontSize: "0.88rem", letterSpacing: "0.04em",
            textTransform: "uppercase", transition: "color 0.2s",
            borderBottom: location.pathname === to ? "1px solid var(--gold)" : "none",
            paddingBottom: "2px",
          }}
            onMouseEnter={e => e.target.style.color = "var(--gold-light)"}
            onMouseLeave={e => e.target.style.color = location.pathname === to ? "var(--gold)" : "var(--text2)"}
          >{label}</Link>
        ))}

        {/* Language Switcher */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setLangOpen(!langOpen)} style={{
            background: "rgba(37,74,43,0.3)", border: "1px solid var(--border)",
            borderRadius: "100px", padding: "6px 14px",
            color: "var(--sage)", fontSize: "0.85rem", fontWeight: 600,
            display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--sage)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            🌐 {activeLang.label} <span style={{ fontSize: "0.65rem", opacity: 0.7 }}>▼</span>
          </button>

          {langOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", overflow: "hidden",
              boxShadow: "var(--shadow)", minWidth: "140px",
              animation: "fadeUp 0.15s ease",
            }}>
              {LANG_OPTIONS.map(option => (
                <button key={option.code} onClick={() => { setLang(option.code); setLangOpen(false); }} style={{
                  width: "100%", padding: "10px 16px", textAlign: "left",
                  background: lang === option.code ? "rgba(106,158,90,0.12)" : "transparent",
                  border: "none", borderBottom: "1px solid rgba(37,74,43,0.3)",
                  color: lang === option.code ? "var(--sage)" : "var(--text2)",
                  fontSize: "0.88rem", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "10px",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(106,158,90,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = lang === option.code ? "rgba(106,158,90,0.12)" : "transparent"}
                >
                  <span style={{ fontWeight: 700, minWidth: "22px", color: "var(--gold-dim)" }}>{option.label}</span>
                  <span>{option.full}</span>
                  {lang === option.code && <span style={{ marginLeft: "auto" }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link to="/identify" style={{
          background: "linear-gradient(135deg, var(--sage-dark), #2d5a20)",
          border: "1px solid var(--sage)", color: "var(--parchment)",
          padding: "8px 18px", borderRadius: "100px",
          fontSize: "0.82rem", fontWeight: 500, whiteSpace: "nowrap",
        }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 20px rgba(106,158,90,0.4)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
        >{T("nav_cta")}</Link>
      </div>
    </nav>
  );
}