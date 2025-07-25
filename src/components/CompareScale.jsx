// ...nessun import React necessario...
import { FaBalanceScale } from "react-icons/fa";
import "./CompareScale.css";

// CompareScale: icona bilancia per selezionare/deselezionare un gioco per il confronto
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
