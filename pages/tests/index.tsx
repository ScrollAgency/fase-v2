import dynamic from "next/dynamic";
import React from "react";
import { MapBoxSimple } from "@/plasmic-library/components";

export default function TestMapBoxSimple() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ width: 600, height: 400 }}>
        <MapBoxSimple
          location={{
            address: "6 rue du Bac, 75007 Paris, France",
            latitude: null,
            longitude: null,
            id: "test-id",
            title: "Test Location",
            slug: "test-location"
          }}
        />
      </div>
    </div>
  );
}
