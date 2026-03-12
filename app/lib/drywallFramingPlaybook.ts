export function getDrywallFramingAnalysis(fileName: string) {
  return `DRYWALL / FRAMING BID READINESS REVIEW

File Reviewed:
${fileName}

====================================
LIKELY INCLUDED SCOPE
====================================

• Interior metal stud framing
• Gypsum board partitions
• Shaft wall assemblies
• Acoustical batt insulation where indicated
• GWB ceilings, soffits, and bulkheads where shown
• Blocking / backing related to partition systems
• Moisture-resistant board where required
• Abuse-resistant board where required
• FRP substrate board if specifically indicated

====================================
KEY ITEMS TO VERIFY
====================================

• Wall type legend and partition schedule
• Rated vs non-rated wall assemblies
• Shaft wall locations and assembly details
• Head-of-wall and top-of-wall conditions
• Deck height / slab-to-structure framing heights
• Ceiling coordination with RCP
• Soffits and bulkhead framing requirements
• Insulation requirements by wall type
• Blocking / backing responsibility
• Firestopping responsibility
• Acoustical sealant requirements
• Door frame and hardware support coordination
• Finish level implications if shown in plans/specs

====================================
LIKELY EXCLUSIONS / CLARIFICATIONS
====================================

• Firestopping unless specifically included
• Temporary protection
• Final paint unless included in contract
• Equipment support framing unless clearly detailed
• Exterior structural framing
• Demolition unless specifically included
• Access panels by others unless specified
• Specialty supports for owner-furnished items unless clarified

====================================
HIGH-RISK SCOPE GAPS
====================================

• Wall types referenced but not fully detailed
• Rated assembly requirements not coordinated with partition types
• Ceiling plans not fully aligned with wall / soffit conditions
• Missing clarification on blocking and backing scope
• Unclear firestopping / sealant trade responsibility
• Incomplete detail for shaft wall terminations
• Framing height assumptions that may affect labor and material

====================================
RECOMMENDED RFIs BEFORE BID
====================================

1. Confirm whether firestopping is included in drywall/framing scope or by separate trade.
2. Confirm blocking / backing scope at accessories, millwork support, grab bars, and equipment.
3. Clarify whether FRP substrate board is included where FRP finish is shown.
4. Confirm whether acoustical sealant at partition perimeter is included.
5. Clarify ACT ceiling scope versus separate ceiling trade.
6. Confirm partition heights extending above ceiling where deck height is not clearly shown.
7. Confirm shaft wall and rated wall assemblies are fully detailed in plans or specs.
8. Confirm responsibility for support / framing at door hardware, frame heads, and openings.

====================================
ESTIMATOR REVIEW NOTES
====================================

• Compare architectural wall types against partition details.
• Compare RCP against soffit / bulkhead framing requirements.
• Review finish schedule for moisture-resistant / specialty board conditions.
• Identify any areas where framing height assumptions may impact cost.
• Flag all ambiguous scope areas before proposal submission.
`;
}
