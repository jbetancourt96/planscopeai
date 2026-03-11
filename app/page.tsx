"use client";

import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const trades = [
  "Framing / Drywall",
  "Millwork",
  "Flooring",
  "Painting",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Fire Protection",
  "Roofing",
  "Waterproofing",
  "Demolition",
  "Site / Civil",
  "Low Voltage",
];

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [userType, setUserType] = useState<"gc" | "subcontractor">("gc");
  const [analysisType, setAnalysisType] = useState<"full" | "trade">("full");
  const [selectedTrade, setSelectedTrade] = useState<string>(trades[0]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  const analysisSummary = useMemo(() => {
    if (analysisType === "full") {
      return userType === "gc"
        ? "Full project analysis for General Contractor"
        : "Full project analysis for Subcontractor";
    }

    return `${selectedTrade} analysis for ${
      userType === "gc" ? "General Contractor" : "Subcontractor"
    }`;
  }, [analysisType, selectedTrade, userType]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        background: "#f7f7f7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "760px",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          PlanscopeAI
        </h1>

        <p
          style={{
            fontSize: "18px",
            marginBottom: "28px",
            textAlign: "center",
            color: "#555",
            lineHeight: 1.5,
          }}
        >
          AI platform for analyzing construction plans and generating scopes
          automatically
        </p>

        <div
          style={{
            display: "grid",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              Are you a GC or Subcontractor?
            </label>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setUserType("gc")}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "10px",
                  border: userType === "gc" ? "2px solid black" : "1px solid #ccc",
                  background: userType === "gc" ? "#000" : "#fff",
                  color: userType === "gc" ? "#fff" : "#000",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                General Contractor
              </button>

              <button
                onClick={() => setUserType("subcontractor")}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "10px",
                  border:
                    userType === "subcontractor"
                      ? "2px solid black"
                      : "1px solid #ccc",
                  background: userType === "subcontractor" ? "#000" : "#fff",
                  color: userType === "subcontractor" ? "#fff" : "#000",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Subcontractor
              </button>
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              What do you want to analyze?
            </label>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setAnalysisType("full")}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "10px",
                  border:
                    analysisType === "full" ? "2px solid black" : "1px solid #ccc",
                  background: analysisType === "full" ? "#000" : "#fff",
                  color: analysisType === "full" ? "#fff" : "#000",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Full Project Analysis
              </button>

              <button
                onClick={() => setAnalysisType("trade")}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "10px",
                  border:
                    analysisType === "trade" ? "2px solid black" : "1px solid #ccc",
                  background: analysisType === "trade" ? "#000" : "#fff",
                  color: analysisType === "trade" ? "#fff" : "#000",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Single Trade Analysis
              </button>
            </div>
          </div>

          {analysisType === "trade" && (
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                Select Trade
              </label>

              <select
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  background: "#fff",
                }}
              >
                {trades.map((trade) => (
                  <option key={trade} value={trade}>
                    {trade}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div
          {...getRootProps()}
          style={{
            border: isDragActive ? "2px solid black" : "2px dashed #bbb",
            borderRadius: "16px",
            padding: "40px 20px",
            textAlign: "center",
            cursor: "pointer",
            background: isDragActive ? "#f1f1f1" : "#fafafa",
            transition: "0.2s ease",
            marginBottom: "24px",
          }}
        >
          <input {...getInputProps()} />
          <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>
            Upload Construction Plans
          </h2>
          <p style={{ color: "#666", margin: 0 }}>
            Drag & drop PDF plans here, or click to select files
          </p>
        </div>

        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "#f3f3f3",
            marginBottom: "20px",
          }}
        >
          <strong>Selected Analysis:</strong> {analysisSummary}
        </div>

        <div
          style={{
            display: "grid",
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          <button
            style={{
              padding: "15px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              background: "#000",
              color: "white",
              cursor: "pointer",
            }}
          >
            Analyze Project Scope
          </button>

          <button
            style={{
              padding: "15px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              background: "white",
            }}
          >
            Generate Trade Breakdown
          </button>

          <button
            style={{
              padding: "15px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              background: "white",
            }}
          >
            AI Assistant
          </button>
        </div>

        <div>
          <h3 style={{ marginBottom: "10px" }}>Uploaded Files</h3>

          {uploadedFiles.length === 0 ? (
            <p style={{ color: "#777" }}>No plans uploaded yet.</p>
          ) : (
            <ul style={{ paddingLeft: "20px", color: "#222" }}>
              {uploadedFiles.map((file, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}