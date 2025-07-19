import React from "react";
import { FaEuroSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import "./FilterSortBar.css";

import { FaBalanceScale } from "react-icons/fa";

const FilterSortBar = ({
  category,
  setCategory,
  sortBy,
  setSortBy,
  categories,
  tripleCompare,
  setTripleCompare,
}) => (
  <div className="filter-sort-bar-sticky">
    <div className="filter-sort-bar-row">
      <select
        className="form-select filter-sort-bar-select"
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
      <div className="filter-sort-bar-btn-group">
        <button
          className={`sort-btn${
            sortBy === "priceAsc" || sortBy === "priceDesc" ? " active" : ""
          }`}
          onClick={() =>
            setSortBy(sortBy === "priceAsc" ? "priceDesc" : "priceAsc")
          }
          title={
            sortBy === "priceAsc" ? "Prezzo crescente" : "Prezzo decrescente"
          }
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
        >
          <MdTextFields />
          {sortBy === "az" ? (
            <span className="sort-btn-label">A</span>
          ) : (
            <span className="sort-btn-label">Z</span>
          )}
        </button>
        <button
          className={`sort-btn triple-btn${tripleCompare ? " active" : ""}`}
          onClick={() => setTripleCompare((prev) => !prev)}
          title={
            tripleCompare ? "Comparazione tripla attiva" : "Comparazione doppia"
          }
        >
          <FaBalanceScale />
          <span className="sort-btn-label-x3">X3</span>
        </button>
      </div>
    </div>
  </div>
);

export default FilterSortBar;
