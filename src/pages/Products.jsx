import { useState } from "react";
import ListView from "./web-view/ListView";
import GridView from "./web-view/GridView";

export default function Products() {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <>
      {viewMode === "grid" ? (
        <GridView viewMode={viewMode} setViewMode={setViewMode} />
      ) : (
        <ListView viewMode={viewMode} setViewMode={setViewMode} />
      )}
    </>
  );
}