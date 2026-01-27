import React, { useEffect, useState } from "react";
import { Colors } from "../../../variable";
import { Chart, Line} from "react-chartjs-2";
import {
  DivGraph,
  DivGraphics,
  DivOrgTitleGraph,
  SelectOption,
  TitleGraph,
} from "./ExpenseGraphicsStyle";
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

export default function ExpenseGraphics(props) {
  const expensePayInfo = props.expenseGraph;
  const statusGraph = props.statusData;


  const [isClearable] = useState(true);
  const [displayGraphChartMonth, setDisplayGraphChartMonth] = useState("none");
  const [displayGraphLineMonth, setDisplayGraphLineMonth] = useState("flex");
  const [displayGraphChartDay, setDisplayGraphChartDay] = useState("none");
  const [displayGraphLineDay, setDisplayGraphLineDay] = useState("none");

  const [labels, setLabels] = useState([]);
  const [dataExpensePayMonth, setDataExpensePayMonth] = useState([]);
  const [dataExpenseNoPayedMonth, setDataExpenseNoPayedMonth] = useState([]);
  const infoMonths = [];
  const infoExpensePay = [];
  const infoExpensesNoPay = [];

  const [labelsDays, setLabelsDays] = useState([]);
  const [dataExpensePayDays, setDataExpensePayDays] = useState([]);
  const [dataExpenseNoPayedDays, setDataExpenseNoPayedDays] = useState([]);
  const infoDays = [];
  const infoExpensePayDays = [];
  const infoExpensesNoPayDays = [];

  const optionsGraphs = [
    { value: 1, label: "Linha Meses", display: "flex" },
    { value: 2, label: "Barra Meses", display: "flex" },
    { value: 3, label: "Linha Dias", display: "flex" },
    { value: 4, label: "Barra Dias", display: "flex" },
  ];

  useEffect(() => {
    if (expensePayInfo?.codeStatus === 200) {
      expensePayInfo?.expensesGraph.forEach((expense) => {
        infoMonths.push(expense.nameMonth);
        infoExpensePay.push(expense.expensePayValue);
        infoExpensesNoPay.push(expense.expenseNoPayValue);
      });
      setLabels(infoMonths);
      setDataExpensePayMonth(infoExpensePay);
      setDataExpenseNoPayedMonth(infoExpensesNoPay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expensePayInfo]);
  useEffect(() => {
    if (expensePayInfo?.codeStatus === 200) {
      expensePayInfo?.resumeByDays.forEach((expense) => {
        infoDays.push(expense.date);
        infoExpensePayDays.push(expense.expensePayValue);
        infoExpensesNoPayDays.push(expense.expenseNoPayValue);
      });
      setLabelsDays(infoDays);
      setDataExpensePayDays(infoExpensePay);
      setDataExpenseNoPayedDays(infoExpensesNoPay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expensePayInfo]);

  useEffect(() => {
    if (statusGraph) {
      setLabels([]);
      setDataExpensePayMonth([]);
      setDataExpensePayMonth([]);
      setDataExpenseNoPayedDays([]);
      setDataExpenseNoPayedDays([]);
      infoMonths.pop();
      infoExpensePay.pop();
      infoExpensesNoPay.pop();
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
        label: "Despesas Pagas",
        data: dataExpensePayMonth,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkMoney,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkMoney,
      },
      {
        label: "Despesas Não Pagas",
        data: dataExpenseNoPayedMonth,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkExpense,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkExpense,
      },
    ],
  };

  const dataBarMonth = {
    labels,
    datasets: [
      {
        type: "bar",
        borderWidth: 2,
        label: "Despesas pagas",
        data: dataExpensePayMonth,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkMoney,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkMoney,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Despesas Não pagas",
        data: dataExpenseNoPayedMonth,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkExpense,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkExpense,
      },
    ],
  };
  const dataLineDay = {
    labels: labelsDays,
    datasets: [
      {
        label: "Despesas Pagas",
        data: dataExpensePayDays,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkMoney,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkMoney,
      },
      {
        label: "Despesas Não Pagas",
        data: dataExpenseNoPayedDays,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkExpense,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkExpense,
      },
    ],
  };

  const dataBarDay = {
    labels: labelsDays,
    datasets: [
      {
        type: "bar",
        borderWidth: 2,
        label: "Despesas pagas",
        data: dataExpensePayDays,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkMoney,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkMoney,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Despesas Não pagas",
        data: dataExpenseNoPayedDays,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkExpense,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkExpense,
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
        <Line
          options={options}
          data={dataLineMonth}
          width={500}
          height={100}
          style={{ display: displayGraphLineMonth }}
        />
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
          width={500}
          height={100}
          style={{ display: displayGraphLineDay }}
        />
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
