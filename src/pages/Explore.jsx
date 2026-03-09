import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { getText } from "../translations";

const PLANTS = [
  { name: "Ashwagandha", sanskrit: "अश्वगंधा", scientific: "Withania somnifera", category: "Adaptogen", emoji: "🌱", descKey: "plant_ashwagandha_desc", benefits: ["Reduces cortisol & stress", "Boosts testosterone", "Improves sleep quality", "Enhances stamina"], dosha: "Vata, Kapha balancing", color: "#4a7c59" },
  { name: "Tulsi", sanskrit: "तुलसी", scientific: "Ocimum tenuiflorum", category: "Immunity", emoji: "🌿", descKey: "plant_tulsi_desc", benefits: ["Boosts immunity", "Reduces inflammation", "Relieves respiratory issues", "Anti-bacterial"], dosha: "Vata, Kapha balancing", color: "#3d6b30" },
  { name: "Brahmi", sanskrit: "ब्राह्मी", scientific: "Bacopa monnieri", category: "Brain Health", emoji: "🌾", descKey: "plant_brahmi_desc", benefits: ["Enhances memory", "Reduces anxiety", "Improves focus", "Neuroprotective"], dosha: "Vata, Pitta balancing", color: "#4a6b3a" },
  { name: "Neem", sanskrit: "नीम", scientific: "Azadirachta indica", category: "Purification", emoji: "🍃", descKey: "plant_neem_desc", benefits: ["Purifies blood", "Treats skin disorders", "Anti-fungal", "Dental health"], dosha: "Pitta, Kapha balancing", color: "#2d5a20" },
  { name: "Turmeric", sanskrit: "हल्दी", scientific: "Curcuma longa", category: "Anti-inflammatory", emoji: "🌼", descKey: "plant_turmeric_desc", benefits: ["Powerful anti-inflammatory", "Antioxidant rich", "Joint health", "Digestive support"], dosha: "Vata, Kapha balancing", color: "#8a6a1a" },
  { name: "Shatavari", sanskrit: "शतावरी", scientific: "Asparagus racemosus", category: "Rejuvenation", emoji: "🌸", descKey: "plant_shatavari_desc", benefits: ["Hormonal balance", "Fertility support", "Digestive health", "Immune modulation"], dosha: "Vata, Pitta balancing", color: "#6b4a5a" },
  { name: "Triphala", sanskrit: "त्रिफला", scientific: "Blend of 3 fruits", category: "Digestive", emoji: "🫐", descKey: "plant_triphala_desc", benefits: ["Digestive tonic", "Gentle detoxifier", "Eye health", "Antioxidant"], dosha: "Tridoshic", color: "#5a4a2a" },
  { name: "Giloy", sanskrit: "गिलोय", scientific: "Tinospora cordifolia", category: "Immunity", emoji: "🍀", descKey: "plant_giloy_desc", benefits: ["Boosts immunity", "Anti-fever", "Liver protective", "Anti-arthritic"], dosha: "Tridoshic", color: "#3a5a3a" },
  { name: "Amla", sanskrit: "आँवला", scientific: "Phyllanthus emblica", category: "Rejuvenation", emoji: "🫒", descKey: "plant_amla_desc", benefits: ["Richest natural Vitamin C", "Hair & skin health", "Liver support", "Anti-aging"], dosha: "Tridoshic", color: "#4a7a2a" },
];

const CATEGORIES = ["All", "Adaptogen", "Immunity", "Brain Health", "Purification", "Anti-inflammatory", "Rejuvenation", "Digestive"];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const { lang } = useLang();
  const T = (key) => getText(lang, key);

  const filtered = PLANTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sanskrit.includes(search) || T(p.descKey).toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="page-enter" style={{ paddingTop: "90px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ color: "var(--sage)", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{T("explore_label")}</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "var(--parchment)", fontWeight: 600, marginBottom: "0.75rem" }}>{T("explore_heading")}</h1>
          <p style={{ color: "var(--text2)", maxWidth: 480, margin: "0 auto", fontSize: "0.95rem" }}>{T("explore_sub")}</p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: 480, margin: "0 auto 1.5rem" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={T("explore_search_placeholder")} style={{
            width: "100%", padding: "12px 14px 12px 40px",
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "100px", color: "var(--text)", fontSize: "0.9rem", outline: "none",
          }}
            onFocus={e => e.target.style.borderColor = "var(--sage)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "6px 16px", borderRadius: "100px", fontSize: "0.82rem",
              border: `1px solid ${activeCategory === cat ? "var(--sage)" : "var(--border)"}`,
              background: activeCategory === cat ? "rgba(106,158,90,0.15)" : "transparent",
              color: activeCategory === cat ? "var(--sage)" : "var(--text3)",
              transition: "all 0.2s", cursor: "pointer",
            }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {filtered.map((plant) => {
            const rgb = hexToRgb(plant.color);
            const isExpanded = expanded === plant.name;
            return (
              <div key={plant.name} style={{
                background: `linear-gradient(135deg, rgba(${rgb}, 0.1), rgba(${rgb}, 0.04))`,
                border: `1px solid rgba(${rgb}, ${isExpanded ? "0.4" : "0.2"})`,
                borderRadius: "var(--radius-lg)", padding: "1.5rem",
                transition: "all 0.3s", cursor: "pointer",
                boxShadow: isExpanded ? `0 8px 30px rgba(${rgb}, 0.2)` : "none",
              }}
                onClick={() => setExpanded(isExpanded ? null : plant.name)}
                onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.borderColor = `rgba(${rgb}, 0.4)`; }}
                onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.borderColor = `rgba(${rgb}, 0.2)`; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.8rem" }}>{plant.emoji}</span>
                  <span style={{
                    fontSize: "0.72rem", color: plant.color,
                    background: `rgba(${rgb}, 0.15)`, border: `1px solid rgba(${rgb}, 0.3)`,
                    padding: "3px 10px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>{plant.category}</span>
                </div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--parchment)", fontWeight: 600, marginBottom: "2px" }}>{plant.name}</h3>
                <div style={{ fontSize: "0.85rem", color: "var(--gold-dim)", marginBottom: "0.2rem", fontStyle: "italic" }}>{plant.sanskrit}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginBottom: "0.75rem", fontStyle: "italic" }}>{plant.scientific}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6, marginBottom: "0.75rem" }}>{T(plant.descKey)}</p>

                {isExpanded && (
                  <div style={{ borderTop: `1px solid rgba(${rgb}, 0.2)`, paddingTop: "1rem", animation: "fadeUp 0.3s ease" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text3)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {T("explore_key_benefits")}
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "5px", marginBottom: "1rem" }}>
                      {plant.benefits.map((b, i) => (
                        <li key={i} style={{ fontSize: "0.85rem", color: "var(--text2)", display: "flex", gap: "8px" }}>
                          <span style={{ color: plant.color }}>✓</span> {b}
                        </li>
                      ))}
                    </ul>
                    <div style={{ fontSize: "0.78rem", color: "var(--text3)" }}>
                      {T("explore_dosha")}: <span style={{ color: "var(--sage)" }}>{plant.dosha}</span>
                    </div>
                  </div>
                )}

                <div style={{ fontSize: "0.78rem", color: "var(--text3)", textAlign: "right", marginTop: "0.5rem" }}>
                  {isExpanded ? T("explore_less") : T("explore_more")}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text3)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌿</div>
            <p>{T("explore_no_results")}</p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "4rem", padding: "2.5rem", background: "rgba(26,61,30,0.2)", border: "1px dashed var(--border)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ color: "var(--text2)", marginBottom: "1rem", fontSize: "0.95rem" }}>{T("explore_cta_text")}</p>
          <Link to="/identify" style={{
            background: "linear-gradient(135deg, #3d6b30, #2d5a20)", border: "1px solid var(--sage)",
            color: "var(--parchment)", padding: "12px 28px", borderRadius: "100px", fontSize: "0.95rem", fontWeight: 500,
          }}>{T("explore_cta_btn")}</Link>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}