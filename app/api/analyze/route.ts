import { NextRequest, NextResponse } from "next/server";
import { getDrywallFramingAnalysis } from "../../lib/drywallFramingPlaybook";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const analysisType = (formData.get("analysisType") as string) || "full";
    const selectedPackage =
      (formData.get("selectedPackage") as string) || "";
    const userType = (formData.get("userType") as string) || "gc";
    const selectedScopesRaw =
      (formData.get("selectedScopes") as string) || "[]";

    let selectedScopes: string[] = [];

    try {
      selectedScopes = JSON.parse(selectedScopesRaw);
    } catch {
      selectedScopes = [];
    }

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const role =
      userType === "gc" ? "General Contractor" : "Subcontractor";

    let summary = `PROJECT SCOPE SUMMARY

User Type: ${role}
Analysis Type: ${analysisType}
File Name: ${file.name}
File Size: ${file.size} bytes
`;

    if (
      analysisType === "package" &&
      selectedPackage === "Drywall / Framing Package"
    ) {
      summary = getDrywallFramingAnalysis(file.name);
    } else if (analysisType === "package") {
      summary += `

====================================
SELECTED PACKAGE
====================================

• ${selectedPackage}

====================================
SUGGESTED ANALYSIS OUTPUT
====================================

• Included scope items
• Possible exclusions
• Drawing / spec coordination notes
• Material and labor review points
• Potential RFIs for missing information
`;
    } else if (analysisType === "custom") {
      summary += `

====================================
CUSTOM SCOPE SELECTION
====================================

${
  selectedScopes.length > 0
    ? selectedScopes.map((scope) => `• ${scope}`).join("\n")
    : "• No scopes selected"
}

====================================
SUGGESTED ANALYSIS OUTPUT
====================================

• Scope summary based on selected work only
• Coordination issues between selected scopes
• Notes to compare drawings vs specs
• Missing items to review before bid
`;
    } else {
      summary += `

====================================
FULL PROJECT ANALYSIS
====================================

Detected Trade Packages (initial logic):
• Site / Civil
• Structural
• Drywall / Framing
• Millwork
• Flooring
• Electrical
• Plumbing
• HVAC
• Fire Protection
• Landscape

Next Step:
• Add document intelligence
• Add specs cross-check
• Add package-specific expert reviews
`;
    }

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Analyze route error:", error);

    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
