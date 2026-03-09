import React, { useState, useRef, useCallback } from "react";
import PlantResult from "../components/PlantResult";
import { useLang } from "../context/LanguageContext";
import { getText } from "../translations";

const SYSTEM_PROMPT = `You are an expert Ayurvedic botanist and physician with deep knowledge of traditional Indian medicinal plants. When given an image of a plant, identify it and return ONLY a valid JSON object (no markdown, no preamble) with this exact structure:

{
  "commonName": "English common name",
  "sanskritName": "Sanskrit name with Devanagari if possible",
  "hindiName": "Hindi name",
  "scientificName": "Latin binomial",
  "description": "2-3 sentence description of the plant and its significance in Ayurveda",
  "partUsed": "Which parts are used medicinally",
  "taste": "Ayurvedic rasa (taste)",
  "dosha": "Effect on doshas (Vata/Pitta/Kapha)",
  "benefits": ["benefit 1", "benefit 2", "benefit 3", "benefit 4", "benefit 5"],
  "uses": ["use 1", "use 2", "use 3", "use 4"],
  "pros": ["pro 1", "pro 2", "pro 3"],
  "cons": ["con/side effect 1", "con/side effect 2", "con/side effect 3"],
  "dosage": "Typical Ayurvedic dosage and preparation methods",
  "precautions": "Important safety warnings and contraindications",
  "interesting": "One fascinating historical or cultural fact about this plant in Ayurveda"
}

If the image does not contain a plant or you cannot identify it, return:
{"error": "Could not identify an Ayurvedic plant in this image. Please try a clearer photo of a plant."}`;

export default function Identify() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const apiKeyRef = useRef(null);
  const { lang } = useLang();
  const T = (key) => getText(lang, key);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const identifyPlant = async () => {
    const apiKey = apiKeyRef.current?.value?.trim();
    if (!apiKey) { setError("Please enter your Anthropic API key."); return; }
    if (!imageFile) { setError("Please upload an image first."); return; }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const base64 = await fileToBase64(imageFile);
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 1500,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: imageFile.type, data: base64 } },
              { type: "text", text: "Please identify this Ayurvedic plant and return the JSON." },
            ],
          }],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "API request failed");

      const text = data.content?.[0]?.text || "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (parsed.error) setError(parsed.error);
      else setResult(parsed);
    } catch (err) {
      setError(err instanceof SyntaxError ? "Could not parse plant data. Please try again." : err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter" style={{ paddingTop: "90px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ color: "var(--sage)", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            {T("identify_label")}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "var(--parchment)", fontWeight: 600, marginBottom: "0.5rem" }}>
            {T("identify_heading")}
          </h1>
          <p style={{ color: "var(--text2)", maxWidth: 480, margin: "0 auto", fontSize: "0.95rem" }}>
            {T("identify_sub")}
          </p>
        </div>

        {/* API Key */}
        <div style={{
          background: "rgba(37,74,43,0.2)", border: "1px solid var(--border)",
          borderRadius: "var(--radius)", padding: "1rem 1.25rem", marginBottom: "1.5rem",
          display: "flex", flexDirection: "column", gap: "6px",
        }}>
          <label style={{ fontSize: "0.78rem", color: "var(--sage)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {T("identify_apikey_label")}
          </label>
          <input ref={apiKeyRef} type="password" placeholder={T("identify_apikey_placeholder")} style={{
            background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "10px 14px", color: "var(--text)",
            fontSize: "0.9rem", width: "100%", outline: "none", fontFamily: "monospace",
          }}
            onFocus={e => e.target.style.borderColor = "var(--sage)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
          <p style={{ fontSize: "0.75rem", color: "var(--text3)" }}>
            {T("identify_apikey_hint")}{" "}
            <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: "var(--gold-dim)", textDecoration: "underline" }}>
              console.anthropic.com
            </a>
          </p>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !image && fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? "var(--sage)" : image ? "var(--gold-dim)" : "var(--border)"}`,
            borderRadius: "var(--radius-lg)", padding: image ? "1rem" : "3rem 2rem",
            textAlign: "center", transition: "all 0.3s",
            background: dragOver ? "rgba(106,158,90,0.06)" : "rgba(18,32,22,0.5)",
            cursor: image ? "default" : "pointer", marginBottom: "1.5rem", position: "relative",
          }}
        >
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => handleFile(e.target.files[0])} />

          {image ? (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img src={image} alt="Plant" style={{ maxHeight: 360, maxWidth: "100%", borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }} />
              <button onClick={e => { e.stopPropagation(); setImage(null); setImageFile(null); setResult(null); setError(null); }} style={{
                position: "absolute", top: "8px", right: "8px",
                background: "rgba(0,0,0,0.7)", border: "1px solid var(--border)",
                color: "var(--text)", borderRadius: "50%", width: "28px", height: "28px",
                fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.6 }}>🌿</div>
              <div style={{ color: "var(--text2)", marginBottom: "0.5rem", fontWeight: 500 }}>{T("identify_drop_title")}</div>
              <div style={{ color: "var(--text3)", fontSize: "0.85rem" }}>
                {T("identify_drop_sub")}
              </div>
            </>
          )}
        </div>

        {image && (
          <button onClick={identifyPlant} disabled={loading} style={{
            width: "100%", padding: "14px",
            background: loading ? "var(--surface2)" : "linear-gradient(135deg, #3d6b30, #2d5a20)",
            border: `1px solid ${loading ? "var(--border)" : "var(--sage)"}`,
            borderRadius: "var(--radius)", color: "var(--parchment)",
            fontSize: "1rem", fontWeight: 500, transition: "all 0.3s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            boxShadow: loading ? "none" : "0 4px 20px rgba(61,107,48,0.3)", marginBottom: "2rem",
          }}>
            {loading ? (
              <>
                <span style={{ display: "inline-block", width: "18px", height: "18px", border: "2px solid var(--sage)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                {T("identify_btn_loading")}
              </>
            ) : T("identify_btn")}
          </button>
        )}

        {error && (
          <div style={{
            background: "rgba(184,92,46,0.1)", border: "1px solid rgba(184,92,46,0.3)",
            borderRadius: "var(--radius)", padding: "1rem 1.25rem",
            color: "var(--terracotta)", fontSize: "0.9rem", marginBottom: "1.5rem",
          }}>⚠️ {error}</div>
        )}

        {result && <PlantResult data={result} />}
      </div>
    </div>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}