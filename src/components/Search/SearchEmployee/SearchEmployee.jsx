import { useEffect, useState } from "react";
import {
  BtnEdit,
  BtnRemove,
  BtnView,
  DivBtnEdit,
  DivBtnFilter,
  DivIdEmployee,
  DivEmployee,
  DivInfo,
  DivEmployeeInfo,
  DivSearch,
  DivSearchEmployee,
  DivTableSearch,
  NameInput,
  NameLabel,
  IdInfo,
  SpanName,
  DivOrgLoading,
  DivCardEmployee,
  DivBtnSearch,
  FormatCPF,
  BtnCancel,
  FormatCPFText,
  DivOrgInput,
} from "./SearchEmployeeStyle";
import UpdateEmployee from "../../Update/UpdateEmployee/UpdateEmployee";
import InfoEmployee from "../../Info/InfoEmployee/InfoEmployee";
import DeleteEmployee from "../../DeleteComponent/DeleteEmployee/DeleteEmployee";

import { Title } from "../../Status/StatusSell/StatusSellStyle";
import { Close, Edit, PersonRemove, Visibility } from "@styled-icons/material";

import { ClipLoader } from "react-spinners";

export default function SearchEmployee({
  employeesInfo,
  positionInfo,
  isLoading,
  isFetching,
  disableFilter,
}) {
  const [employeePopUp, setEmployeePopUp] = useState(false);
  const [delEmployeeOption, setDelEmployeeOption] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [selectedEmployeeView, setSelectedEmployeeView] = useState();
  const [filterCPFEmployee, setFilterCPFEmployee] = useState();
  const [filterNameEmployee, setFilterNameEmployee] = useState("");
  const [filterInfoEmployee, setFilterInfoEmployee] = useState([]);

  const [employeeView, setEmployeeView] = useState(false);

  const [showList, setShowList] = useState(false);
  const [dataEmployeeUpdate, setDataEmployeeUpdate] = useState([]);

  // ! - usar para formatar dois nomes Ex. (henrique silva)
  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = "";
    if (lastName.length > 0) {
      fullName = firstName.concat(" ", lastName);
    } else {
      fullName = firstName;
    }
    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  useEffect(() => {
    if (!employeesInfo) return setFilterInfoEmployee([]);

    let filtered = employeesInfo;

    // Filtro por CPF
    if (filterCPFEmployee?.length > 0) {
      filtered = filtered.filter((employee) =>
        employee.cpf.startsWith(filterCPFEmployee)
      );
    }

    // Separar nome completo digitado em firstName e secondName
    if (filterNameEmployee.trim().length > 0) {
      const parts = filterNameEmployee.trim().split(/\s+/);
      const firstName = parts[0].toLowerCase();
      const secondName = parts.slice(1).join(" ").toLowerCase();

      filtered = filtered.filter((employee) => {
        const fullName =
          employee?.firstName.toLowerCase() +
          " " +
          employee?.lastName.toLowerCase();

        return (
          fullName.includes(firstName) &&
          (secondName === "" || fullName.includes(secondName))
        );
      });
    }

    setFilterInfoEmployee(filtered);
  }, [employeesInfo, filterCPFEmployee, filterNameEmployee]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 250); // 250ms de delay
      return () => clearTimeout(timer);
    } else {
      setShowList(false);
    }
  }, [isLoading, isFetching]);

  return (
    <DivSearchEmployee>
      <DivSearch>
        <Title>Consulta Funcionario</Title>
        <DivBtnFilter show={disableFilter}>
          <DivOrgInput>
            <NameLabel>CPF</NameLabel>

            <FormatCPF
              value={filterCPFEmployee}
              format="###.###.###-##"
              allowEmptyFormatting
              mask="_"
              onValueChange={(values) => {
                setFilterCPFEmployee(values.value);
              }}
            />
          </DivOrgInput>
          <DivOrgInput>
            <NameLabel>Nome</NameLabel>
            <NameInput
              value={filterNameEmployee}
              onChange={(e) => setFilterNameEmployee(e.target.value)}
            />
          </DivOrgInput>
          <DivBtnSearch>
            <BtnCancel
              type="button"
              onClick={() => {
                setFilterCPFEmployee("");
                setFilterNameEmployee("");
                setFilterInfoEmployee(employeesInfo);
              }}
            >
              <Close />
            </BtnCancel>
          </DivBtnSearch>
        </DivBtnFilter>
      </DivSearch>
      <DivTableSearch>
        {!showList ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoEmployee.map((infoEmployee, index) => {
            return (
              <DivEmployee key={infoEmployee.idEmployee}>
                <DivCardEmployee>
                  <DivInfo>
                    <DivIdEmployee>
                      <IdInfo>{index + 1}</IdInfo>
                    </DivIdEmployee>
                    <DivEmployeeInfo>
                      <SpanName>
                        {parseName(
                          infoEmployee.firstName,
                          infoEmployee.lastName
                        )}
                      </SpanName>

                      <FormatCPFText
                        displayType="text"
                        value={infoEmployee.cpf || "00000000000"}
                        format="###.###.###-##"
                        allowEmptyFormatting
                        mask="_"
                      />
                    </DivEmployeeInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      onClick={() => {
                        setEmployeePopUp(!employeePopUp);
                        setDataEmployeeUpdate(infoEmployee);
                      }}
                    >
                      <Edit />
                    </BtnEdit>

                    <BtnView
                      onClick={() => {
                        setEmployeeView(!employeeView);
                        setSelectedEmployeeView(infoEmployee);
                        setDelEmployeeOption(false);
                      }}
                    >
                      <Visibility />
                    </BtnView>
                    <BtnRemove
                      // type="button"
                      onClick={() => {
                        setDelEmployeeOption(!delEmployeeOption);
                        setSelectedEmployee(infoEmployee);
                        setEmployeeView(false);
                      }}
                    >
                      <PersonRemove />
                    </BtnRemove>
                  </DivBtnEdit>
                </DivCardEmployee>
                {employeeView &&
                  infoEmployee.idEmployee ===
                    selectedEmployeeView.idEmployee && (
                    <InfoEmployee
                      selectedEmployeeView={selectedEmployeeView}
                      employeeView={employeeView}
                      setEmployeeView={setEmployeeView}
                    />
                  )}
                {delEmployeeOption &&
                  infoEmployee.idEmployee === selectedEmployee.idEmployee && (
                    <DeleteEmployee
                      selectedEmployee={selectedEmployee}
                      delEmployeeOption={delEmployeeOption}
                      setDelEmployeeOption={setDelEmployeeOption}
                    />
                  )}
              </DivEmployee>
            );
          })
        )}
        {employeePopUp && (
          <UpdateEmployee
            dataEmployeeUpdate={dataEmployeeUpdate}
            employeePopUp={employeePopUp}
            setEmployeePopUp={setEmployeePopUp}
            positionInfo={positionInfo}
          />
        )}
      </DivTableSearch>
    </DivSearchEmployee>
  );
}
