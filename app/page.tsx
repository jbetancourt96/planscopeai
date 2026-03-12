"use client";

import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const scopePackages = [
  "Drywall / Framing Package",
  "Millwork Package",
  "Flooring Package",
  "Electrical Package",
  "Plumbing Package",
  "HVAC Package",
  "Site / Civil Package",
  "Structural Package",
  "Landscape Package",
  "Painting Package",
  "Interiors Finish Package",
];

const customScopes = [
  "Framing",
  "Drywall",
  "Insulation",
  "ACT / Ceilings",
  "Blocking / Backing",
  "Caulking / Sealants",
  "Firestopping",
  "FRP",
  "Wall Covering",
  "Painting",
  "Doors / Frames / Hardware Coordination",
  "Millwork",
  "Flooring",
  "Roofing",
  "Low Voltage",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Structural",
  "Landscape",
  "Site / Civil",
];

type Section = {
  title: string;
  items: string[];
};

function parseAnalysisToSections(text: string): Section[] {
  if (!text) return [];

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: Section[] = [];
  let currentTitle = "";
  let currentItems: string[] = [];

  const flushSection = () => {
    if (currentTitle && currentItems.length > 0) {
      sections.push({
        title: currentTitle,
        items: currentItems,
      });
    }
  };

  for (const line of lines) {
    const isHeading =
      line === line.toUpperCase() &&
      !line.startsWith("•") &&
      !line.match(/^\d+\./) &&
      !line.includes(":");

    if (isHeading) {
      flushSection();
      currentTitle = line;
      currentItems = [];
      continue;
    }

    if (line.startsWith("•")) {
      currentItems.push(line.replace("•", "").trim());
      continue;
    }

    if (line.match(/^\d+\./)) {
      currentItems.push(line);
      continue;
    }

    if (line.includes(":") && currentTitle === "") {
      sections.push({
        title: "PROJECT OVERVIEW",
        items: [line],
      });
      continue;
    }

    if (currentTitle) {
      currentItems.push(line);
    }
  }

  flushSection();

  if (sections.length === 0) {
    return [
      {
        title: "ANALYSIS",
        items: lines,
      },
    ];
  }

  return sections;
}

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [userType, setUserType] = useState<"gc" | "subcontractor">("gc");
  const [analysisType, setAnalysisType] = useState<
    "full" | "package" | "custom"
  >("full");
  const [selectedPackage, setSelectedPackage] = useState<string>(
    scopePackages[0]
  );
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Framing",
    "Drywall",
    "Insulation",
    "ACT / Ceilings",
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

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

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope)
        ? prev.filter((item) => item !== scope)
        : [...prev, scope]
    );
  };

  const analysisSummary = useMemo(() => {
    const role = userType === "gc" ? "General Contractor" : "Subcontractor";

    if (analysisType === "full") {
      return `Full project analysis for ${role}`;
    }

    if (analysisType === "package") {
      return `${selectedPackage} for ${role}`;
    }

    return `Custom scope selection for ${role}: ${
      selectedScopes.length > 0 ? selectedScopes.join(", ") : "No scopes selected"
    }`;
  }, [analysisType, selectedPackage, selectedScopes, userType]);

  const reportSections = useMemo(() => {
    return analysisResult ? parseAnalysisToSections(analysisResult) : [];
  }, [analysisResult]);

  const runAnalysis = async () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one plan PDF first.");
      return;
    }

    if (analysisType === "custom" && selectedScopes.length === 0) {
      alert("Please select at least one custom scope.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFiles[0]);
      formData.append("userType", userType);
      formData.append("analysisType", analysisType);
      formData.append("selectedPackage", selectedPackage);
      formData.append("selectedScopes", JSON.stringify(selectedScopes));

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setAnalysisResult(data.error || "Analysis failed.");
        setIsAnalyzing(false);
        return;
      }

      setAnalysisResult(data.summary || "No analysis returned.");
    } catch (error) {
      setAnalysisResult("Analysis failed.");
    }

    setIsAnalyzing(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
        background: "#f7f7f7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "980px",
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

            <div style={{ display: "grid", gap: "12px" }}>
              <button
                onClick={() => setAnalysisType("full")}
                style={{
                  width: "100%",
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
                onClick={() => setAnalysisType("package")}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border:
                    analysisType === "package"
                      ? "2px solid black"
                      : "1px solid #ccc",
                  background: analysisType === "package" ? "#000" : "#fff",
                  color: analysisType === "package" ? "#fff" : "#000",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Scope Package Analysis
              </button>

              <button
                onClick={() => setAnalysisType("custom")}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border:
                    analysisType === "custom"
                      ? "2px solid black"
                      : "1px solid #ccc",
                  background: analysisType === "custom" ? "#000" : "#fff",
                  color: analysisType === "custom" ? "#fff" : "#000",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Custom Scope Selection
              </button>
            </div>
          </div>

          {analysisType === "package" && (
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                Select Scope Package
              </label>

              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  background: "#fff",
                }}
              >
                {scopePackages.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>
          )}

          {analysisType === "custom" && (
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                Select Custom Scopes
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "10px",
                }}
              >
                {customScopes.map((scope) => {
                  const checked = selectedScopes.includes(scope);

                  return (
                    <button
                      key={scope}
                      onClick={() => toggleScope(scope)}
                      type="button"
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: checked ? "2px solid black" : "1px solid #ccc",
                        background: checked ? "#000" : "#fff",
                        color: checked ? "#fff" : "#000",
                        cursor: "pointer",
                        fontSize: "15px",
                      }}
                    >
                      {checked ? "✓ " : ""}
                      {scope}
                    </button>
                  );
                })}
              </div>
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
            marginBottom: "28px",
          }}
        >
          <button
            onClick={runAnalysis}
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
            {isAnalyzing ? "Analyzing plans..." : "Analyze Project Scope"}
          </button>

          <button
            type="button"
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
            type="button"
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

        {reportSections.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            <div
              style={{
                padding: "18px 20px",
                borderRadius: "14px",
                background: "#111",
                color: "#fff",
                marginBottom: "16px",
              }}
            >
              <div style={{ fontSize: "13px", opacity: 0.8, marginBottom: "6px" }}>
                BID READINESS REPORT
              </div>
              <div style={{ fontSize: "26px", fontWeight: 700 }}>
                Drywall / Framing Review
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {reportSections.map((section, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #e7e7e7",
                    borderRadius: "14px",
                    padding: "18px",
                    background: "#fafafa",
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: "12px",
                      fontSize: "18px",
                    }}
                  >
                    {section.title}
                  </h3>

                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "20px",
                      lineHeight: 1.7,
                      color: "#222",
                    }}
                  >
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

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
