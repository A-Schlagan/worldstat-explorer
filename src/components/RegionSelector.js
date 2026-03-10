import React from "react";

export default function RegionSelector({selectedRegion, setSelectedRegion}){

    const regions = [
        { label: "Alle Kontinente", value: "" },
        { label: "Afrika", value: "Africa" },
        { label: "Amerika", value: "Americas" },
        { label: "Asien", value: "Asia" },
        { label: "Europa", value: "Europe" },
        { label: "Ozeanien", value: "Oceania" }
    ];

    return(
        <select value={selectedRegion} onChange={(e)=> setSelectedRegion(e.target.value)} className="selectorRegion">
            {regions.map((region) => (
                <option key={region.label} value={region.value}>
                    {region.label}
                </option>
            ))}
        </select>
    )
}