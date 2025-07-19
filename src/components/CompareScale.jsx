import React from "react";
import { FaBalanceScale } from "react-icons/fa";
import "./CompareScale.css";

const CompareScale = ({ active, onClick }) => (
  <span
    className={`compare-scale${active ? " active" : ""}`}
    onClick={onClick}
    title={active ? "Rimuovi dalla comparazione" : "Confronta questo gioco"}
  >
    <FaBalanceScale />
  </span>
);

export default CompareScale;
