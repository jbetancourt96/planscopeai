"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
        background: "#f8f8f8",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          PlanscopeAI
        </h1>

        <p
          style={{
            fontSize: "18px",
            marginBottom: "30px",
            textAlign: "center",
            color: "#555",
          }}
        >
          AI platform for analyzing construction plans and generating scopes automatically
        </p>

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