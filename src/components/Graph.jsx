import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  plugins,
} from "chart.js";
import { callback } from "chart.js/helpers";
import { Bar } from "react-chartjs-2";
import { format } from "../utils/format";
import { filtrer } from "../utils/Filtre";
import { Form } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { generateColors } from "../utils/Colors";

Chart.register(BarElement, CategoryScale, LinearScale, plugins);

function Graph({ transactions, date }) {
  const { values: filtre, handleChange } = useForm();

  const transacFiltree = filtrer(transactions, date, filtre.type);

  //Couleurs pour les barres
  const Colors = generateColors(transacFiltree.length);
  const donnee = Object.values(
    transacFiltree.reduce((acc, { categorie, montant, type }) => {
      if (!categorie) {
        categorie = type === "Revenue" ? "Autre (Revenue)" : "Autre(Dépense)";
      }
      if (!acc[categorie]) {
        acc[categorie] = { categorie, total: 0 };
      }
      acc[categorie].total += montant;
      return acc;
    }, {})
  );

  const data = {
    labels: donnee.map((item) => `${item.categorie}`),
    datasets: [
      {
        label: "transac",
        data: donnee.map((item) => item.total),
        backgroundColor: Colors,
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
    },
  };

  return (
    <div className="my-3">
      <div className="bg-white rounded shadow p-4">
        <div className="d-flex justify-content-between">
          <h2 className="text-lg fw-semibold">Transaction mensuelle</h2>
          <Form.Select
            className="w-auto"
            name="type"
            value={filtre.type}
            onChange={handleChange}
          >
            <option value="All">R/D</option>
            <option value="Revenue">Revenue</option>
            <option value="Dépense">Dépense</option>
          </Form.Select>
        </div>

        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Graph;
