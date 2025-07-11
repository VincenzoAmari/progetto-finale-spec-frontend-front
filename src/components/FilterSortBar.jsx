import React from "react";
import { FaEuroSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import "./FilterSortBar.css";

const FilterSortBar = ({
  category,
  setCategory,
  sortBy,
  setSortBy,
  categories,
}) => (
  <div className="filter-sort-bar-sticky">
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <select
        className="form-select"
        style={{ maxWidth: 180, minWidth: 100 }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Tutti i generi</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          className={`sort-btn${sortBy === "priceAsc" ? " active" : ""}`}
          onClick={() =>
            setSortBy(sortBy === "priceAsc" ? "priceDesc" : "priceAsc")
          }
          title={
            sortBy === "priceAsc" ? "Prezzo crescente" : "Prezzo decrescente"
          }
          style={{
            background:
              sortBy === "priceAsc" || sortBy === "priceDesc"
                ? "#00ffe7"
                : "#23272f",
            color:
              sortBy === "priceAsc" || sortBy === "priceDesc"
                ? "#181c24"
                : "#00ffe7",
            border: "1.5px solid #00ffe7",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 18,
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <FaEuroSign />
          {sortBy === "priceAsc" ? <FaArrowUp /> : <FaArrowDown />}
        </button>
        <button
          className={`sort-btn${
            sortBy === "az" || sortBy === "za" ? " active" : ""
          }`}
          onClick={() => setSortBy(sortBy === "az" ? "za" : "az")}
          title={sortBy === "az" ? "Ordina A-Z" : "Ordina Z-A"}
          style={{
            background:
              sortBy === "az" || sortBy === "za" ? "#00ffe7" : "#23272f",
            color: sortBy === "az" || sortBy === "za" ? "#181c24" : "#00ffe7",
            border: "1.5px solid #00ffe7",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 18,
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <MdTextFields />
          {sortBy === "az" ? (
            <span style={{ fontWeight: 700 }}>A</span>
          ) : (
            <span style={{ fontWeight: 700 }}>Z</span>
          )}
        </button>
      </div>
    </div>
  </div>
);

export default FilterSortBar;
