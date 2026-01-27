import { useState, useEffect } from "react";
import {
  DivEmployeeRegister,
  TitleEmployeeReg,
  DivScreenEmployee,
} from "./EmployeeRegisterStyle";
import NewEmployee from "../../components/Forms/NewEmployee/NewEmployee";
import SearchEmployee from "../../components/Search/SearchEmployee/SearchEmployee";
import {
  useGetAllEmployeeQuery,
  useGetCodEmployeeQuery,
} from "../../store/registers/employee/employee.api";
import { useGetAllPositionQuery } from "../../store/registers/workPosition/position.api";

export default function EmployeeRegister() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: employees,
    isFetching,
    isLoading,
    // refetch,
  } = useGetAllEmployeeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: getNextCodEmployee, isLoading: loadingCod } =
    useGetCodEmployeeQuery();

  const {
    data: position,
    isFetching: fetchingPosition,
    isLoading: loadingPosition,
    // refetch,
  } = useGetAllPositionQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (employees?.errorStatus === true) {
      alert(employees?.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [employees, position]);

  return (
    <DivEmployeeRegister>
      <TitleEmployeeReg>Cadastro de Funcionarios</TitleEmployeeReg>
      <DivScreenEmployee>
        <NewEmployee
          positionInfo={position?.positions}
          employeeCod={getNextCodEmployee?.employeeCod}
          loadingCod={loadingCod}
        />
        <SearchEmployee
          employeesInfo={employees?.employee}
          disableFilter={disableFilter}
          isFetching={isFetching}
          isLoading={isLoading}
          positionInfo={position?.positions}
        />
      </DivScreenEmployee>
    </DivEmployeeRegister>
  );
}
