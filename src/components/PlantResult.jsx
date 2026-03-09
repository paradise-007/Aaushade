import React from "react";
import { useLang } from "../context/LanguageContext";
import { getText } from "../translations";

export default function PlantResult({ data }) {
  const { lang } = useLang();
  const T = (key) => getText(lang, key);

  if (!data) return null;

  const {
    commonName, sanskritName, hindiName, scientificName,
    description, partUsed, taste, dosha,
    benefits = [], uses = [], pros = [], cons = [],
    dosage, precautions, interesting
  } = data;

  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, rgba(26,61,30,0.6), rgba(18,32,22,0.8))",
        border: "1px solid var(--border)", borderRadius: "var(--radius-lg)",
        padding: "2rem", marginBottom: "1.5rem",
        borderLeft: "3px solid var(--gold)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
              color: "var(--parchment)", fontWeight: 700, lineHeight: 1.1, marginBottom: "0.25rem",
            }}>{commonName || "Unknown Plant"}</h2>
            {sanskritName && <div style={{ fontSize: "1.1rem", color: "var(--gold)", fontStyle: "italic", marginBottom: "0.2rem" }}>{sanskritName}</div>}
            {hindiName && <div style={{ fontSize: "0.9rem", color: "var(--text2)" }}>{hindiName}</div>}
            {scientificName && <div style={{ fontSize: "0.85rem", color: "var(--text3)", fontStyle: "italic", marginTop: "0.2rem" }}>{scientificName}</div>}
          </div>
          <div style={{
            background: "rgba(106,158,90,0.15)", border: "1px solid rgba(106,158,90,0.3)",
            borderRadius: "var(--radius)", padding: "0.75rem 1.25rem", textAlign: "center", minWidth: "120px",
          }}>
            <div style={{ fontSize: "0.7rem", color: "var(--sage)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{T("result_ayurvedic")}</div>
            <div style={{ fontSize: "1.5rem" }}>🌿</div>
          </div>
        </div>

        {description && (
          <p style={{ color: "var(--text2)", lineHeight: 1.75, marginTop: "1.25rem", fontSize: "0.95rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
            {description}
          </p>
        )}

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
          {dosha && <Tag label={T("result_dosha")} value={dosha} color="var(--sage)" />}
          {taste && <Tag label={T("result_taste")} value={taste} color="var(--gold)" />}
          {partUsed && <Tag label={T("result_part")} value={partUsed} color="var(--terracotta)" />}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <Section title={T("result_benefits")} items={benefits} accent="var(--gold)" bg="rgba(201,168,76,0.06)" noData={T("result_no_data")} />
        <Section title={T("result_uses")} items={uses} accent="var(--sage)" bg="rgba(106,158,90,0.06)" noData={T("result_no_data")} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <Section title={T("result_pros")} items={pros} accent="#5aab60" bg="rgba(90,171,96,0.06)" noData={T("result_no_data")} />
        <Section title={T("result_cons")} items={cons} accent="var(--terracotta)" bg="rgba(184,92,46,0.06)" noData={T("result_no_data")} />
      </div>

      {(dosage || precautions) && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
          {dosage && <InfoBox title={T("result_dosage")} content={dosage} accent="var(--sage)" />}
          {precautions && <InfoBox title={T("result_precautions")} content={precautions} accent="var(--terracotta)" />}
        </div>
      )}

      {interesting && (
        <div style={{
          background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(106,158,90,0.05))",
          border: "1px solid rgba(201,168,76,0.2)", borderRadius: "var(--radius-lg)", padding: "1.5rem",
        }}>
          <div style={{ fontSize: "0.75rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
            {T("result_did_you_know")}
          </div>
          <p style={{ color: "var(--text2)", lineHeight: 1.7, fontStyle: "italic", fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
            "{interesting}"
          </p>
        </div>
      )}

      <p style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: "1.5rem", textAlign: "center" }}>
        {T("result_disclaimer")}
      </p>
    </div>
  );
}

function Tag({ label, value, color }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33`,
      borderRadius: "100px", padding: "4px 12px", display: "inline-flex", gap: "6px", alignItems: "center",
    }}>
      <span style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}:</span>
      <span style={{ fontSize: "0.82rem", color }}>{value}</span>
    </div>
  );
}

function Section({ title, items, accent, bg, noData }) {
  return (
    <div style={{ background: bg, border: `1px solid ${accent}22`, borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: accent, marginBottom: "1rem" }}>{title}</h3>
      {items.length === 0 ? (
        <p style={{ color: "var(--text3)", fontSize: "0.85rem" }}>{noData}</p>
      ) : (
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", color: "var(--text2)", fontSize: "0.9rem", lineHeight: 1.5 }}>
              <span style={{ color: accent, marginTop: "3px", flexShrink: 0 }}>›</span>{item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function InfoBox({ title, content, accent }) {
  return (
    <div style={{
      background: `rgba(${accent === "var(--terracotta)" ? "184,92,46" : "106,158,90"},0.06)`,
      border: `1px solid ${accent}33`, borderRadius: "var(--radius-lg)", padding: "1.5rem",
    }}>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: accent, marginBottom: "0.75rem" }}>{title}</h3>
      <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: 1.65 }}>{content}</p>
    </div>
  );
}