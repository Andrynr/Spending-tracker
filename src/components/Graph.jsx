import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
  plugins,
} from "chart.js";
import { callback } from "chart.js/helpers";
import { Bar } from "react-chartjs-2";
import { format } from "../utils/format";
import { useState } from "react";

Chart.register(BarElement, CategoryScale, LinearScale, Colors, plugins);

function Graph({ transactions }) {
  const donnee = Object.values(
    transactions.reduce((acc, { categorie, montant }) => {
      if (!categorie) {
        categorie = "Autre";
      }
      if (!acc[categorie]) {
        acc[categorie] = { categorie, total: 0 };
      }
      acc[categorie].total += montant;
      return acc;
    }, {})
  );
  const [filtre, setFilter] = useState("");

  if (donnee[filtre]) {
    const donneeFiltree = donnee.filter((elmt) => {
      if (elmt.categorie === filtre) return elmt;
    });
  }

  const data = {
    labels: donnee.map((item) => `${item.categorie}`),
    datasets: [
      {
        label: "transac",
        data: donnee.map((item) => item.total),
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${context.label}: ${format(value)}`;
          },
        },
      },
      legend: {
        labels: {
          generateLabels(chart) {
            return chart.data.labels.map((label, i) => ({
              text: label,
              fillStyle: Colors[i],
              strokeStyle: Colors[i],
              index: i,
            }));
          },
        },
      },
      Colors: { enabled: true },
    },
  };
  return (
    <div className="my-3">
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg fw-semibold">Transaction mensuelle</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Graph;
