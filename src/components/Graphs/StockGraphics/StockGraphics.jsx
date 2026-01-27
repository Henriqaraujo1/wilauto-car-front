import React, { useEffect, useState } from "react";
import { Colors } from "../../../variable";
import { Chart, Line,} from "react-chartjs-2";
import {
  DivGraph,
  DivGraphics,
  DivOrgTitleGraph,
  SelectOption,
  TitleGraph,
} from "./StockGraphicsStyle";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineController,
  BarController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export default function StockGraphics(props) {
  const stockInfo = props.dataStockGraph;
  const statusGraph = props.statusData;
  const dataStockGraphDay = props.dataStockGraphDay;


  const [isClearable] = useState(true);
  const [displayGraphChartMonth, setDisplayGraphChartMonth] = useState("none");
  const [displayGraphLineMonth, setDisplayGraphLineMonth] = useState("flex");

  const [displayGraphChartDay, setDisplayGraphChartDay] = useState("none");
  const [displayGraphLineDay, setDisplayGraphLineDay] = useState("none");

  const [labels, setLabels] = useState([]);
  const [dataStockOrdersMonth, setDataStockOrdersMonth] = useState([]);
  const [dataStockOutMonth, setDataStockOutMonth] = useState([]);
  const infoMonths = [];
  const infoValuesStockOrders = [];
  const infoValuesStockOut = [];

  const [labelsDay, setLabelsDay] = useState([]);
  const [dataStockOrdersDay, setDataStockOrdersDay] = useState([]);
  const [dataStockOutDay, setDataStockOutDay] = useState([]);
  const infoDay = [];
  const infoValuesStockOrdersDay = [];
  const infoValuesStockOutDay = [];

  const optionsGraphs = [
    { value: 1, label: "Linha Meses", display: "flex" },
    { value: 2, label: "Barra Meses", display: "flex" },
    { value: 3, label: "Linha Dias", display: "flex" },
    { value: 4, label: "Barra Dias", display: "flex" },
  ];

  useEffect(() => {
    if (stockInfo?.codeStatus === 200) {
      stockInfo?.stockGraph.forEach((stock) => {
        infoMonths.push(stock.nameMonth);
        infoValuesStockOrders.push(stock.stockOrderValue);
        infoValuesStockOut.push(stock.stockOutValue);
      });
      setLabels(infoMonths);
      setDataStockOrdersMonth(infoValuesStockOrders);
      setDataStockOutMonth(infoValuesStockOut);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockInfo]);
  useEffect(() => {
    if (dataStockGraphDay?.codeStatus === 200) {
      dataStockGraphDay?.stockGraphDays.forEach((stock) => {
        infoDay.push(stock.date);
        infoValuesStockOrdersDay.push(stock.stockOrderValue);
        infoValuesStockOutDay.push(stock.stockOutValue);
      });
      setLabelsDay(infoDay);
      setDataStockOrdersDay(infoValuesStockOrdersDay);
      setDataStockOutDay(infoValuesStockOutDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockInfo]);

  useEffect(() => {
    if (statusGraph) {
      setLabels([]);
      setDataStockOrdersMonth([]);
      setDataStockOutMonth([]);
      setDataStockOrdersDay([]);
      setDataStockOutDay([]);
      infoMonths.pop();
      infoValuesStockOrders.pop();
      infoValuesStockOut.pop();
      infoDay.pop();
      infoValuesStockOrdersDay.pop();
      infoValuesStockOutDay.pop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGraph]);

  const changeGraph = (infoGraph) => {
    if (infoGraph?.value === 1) {
      setDisplayGraphLineMonth(infoGraph.display);
      setDisplayGraphChartMonth("none");
      setDisplayGraphLineDay("none");
      setDisplayGraphChartDay("none");
    }
    if (infoGraph?.value === 2) {
      setDisplayGraphChartMonth(infoGraph.display);
      setDisplayGraphLineMonth("none");
      setDisplayGraphLineDay("none");
      setDisplayGraphChartDay("none");
    }
    if (infoGraph?.value === 3) {
      setDisplayGraphLineDay(infoGraph.display);
      setDisplayGraphChartDay("none");
      setDisplayGraphChartMonth("none");
      setDisplayGraphLineMonth("none");
    }
    if (infoGraph?.value === 4) {
      setDisplayGraphChartDay(infoGraph.display);
      setDisplayGraphChartMonth("none");
      setDisplayGraphChartMonth("none");
      setDisplayGraphLineDay("none");
    }
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "left",
      },
      title: {
        display: false,
        text: "Dataset",
      },
    },
  };

  const dataLineMonth = {
    labels,
    datasets: [
      {
        label: "Entradas",
        data: dataStockOrdersMonth,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BKStockOrders,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BKStockOrders,
      },
      {
        label: "Saidas",
        data: dataStockOutMonth,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkStockOut,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkStockOut,
      },
    ],
  };
  const dataBarMonth = {
    labels,
    datasets: [
      {
        type: "bar",
        borderWidth: 2,
        label: "Entradas",
        data: dataStockOrdersMonth,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BKStockOrders,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BKStockOrders,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Saidas",
        data: dataStockOutMonth,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkStockOut,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkStockOut,
      },
    ],
  };

  const dataLineDay = {
    labels: labelsDay,
    datasets: [
      {
        label: "Entradas",
        data: dataStockOrdersDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BKStockOrders,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BKStockOrders,
      },
      {
        label: "Saidas",
        data: dataStockOutDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkStockOut,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkStockOut,
      },
    ],
  };
  const dataBarDay = {
    labels: labelsDay,
    datasets: [
      {
        type: "bar",
        borderWidth: 2,
        label: "Entradas",
        data: dataStockOrdersDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BKStockOrders,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BKStockOrders,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Saidas",
        data: dataStockOutDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkStockOut,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkStockOut,
      },
    ],
  };

  return (
    <DivGraphics>
      <DivOrgTitleGraph>
        <TitleGraph>Grafico de Vendas e Despesas</TitleGraph>
        <SelectOption
          name="permissions"
          placeholder="Selecione"
          isClearable={isClearable}
          options={optionsGraphs}
          onChange={changeGraph}
        />
      </DivOrgTitleGraph>
      <DivGraph>
        {/* <DivInfoGraph></DivInfoGraph> */}
        <Line
          options={options}
          data={dataLineMonth}
          height={100}
          width={500}
          style={{ display: displayGraphLineMonth }}
        />
        {/* <Pie data={data}/> */}
        <Chart
          type="bar"
          options={options}
          data={dataBarMonth}
          height={100}
          width={500}
          style={{ display: displayGraphChartMonth }}
        />
        <Line
          options={options}
          data={dataLineDay}
          height={100}
          width={500}
          style={{ display: displayGraphLineDay }}
        />
        {/* <Pie data={data}/> */}
        <Chart
          type="bar"
          options={options}
          data={dataBarDay}
          height={100}
          width={500}
          style={{ display: displayGraphChartDay }}
        />
      </DivGraph>
    </DivGraphics>
  );
}
