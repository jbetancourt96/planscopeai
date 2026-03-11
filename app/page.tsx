export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial"
    }}>

      <h1 style={{fontSize: "48px", marginBottom: "10px"}}>
        PlanscopeAI
      </h1>

      <p style={{fontSize: "18px", marginBottom: "40px"}}>
        AI platform for analyzing construction plans and generating scopes automatically
      </p>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "300px"
      }}>

        <button style={{
          padding: "15px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          background: "#000",
          color: "white"
        }}>
          Upload Construction Plans
        </button>

        <button style={{
          padding: "15px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "1px solid #ccc"
        }}>
          Analyze Project Scope
        </button>

        <button style={{
          padding: "15px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "1px solid #ccc"
        }}>
          Generate Trade Breakdown
        </button>

        <button style={{
          padding: "15px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "1px solid #ccc"
        }}>
          AI Assistant
        </button>

      </div>

    </main>
  )
}