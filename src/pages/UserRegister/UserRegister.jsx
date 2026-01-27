import React, { useEffect, useState } from "react";
import { DivUserRegister, TitleUser, DivScreenUser } from "./UserRegisterStyle";
import NewUser from "../../components/Forms/NewUser/NewUser";
import SearchUser from "../../components/Search/SearchUser/SearchUser";

import { useGetAllUserQuery } from "../../store/registers/users/users.api";

export default function UserRegister() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: users,
    isFetching,
    isLoading,
    // refetch,
  } = useGetAllUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (users?.errorStatus === true) {
      alert(users?.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [users]);

  return (
    <DivUserRegister>
      <TitleUser>Usuario</TitleUser>
      <DivScreenUser>
        <NewUser permissionsInfo={users?.allPermissions} />
        <SearchUser
          usersInfo={users?.users}
          permissionsInfo={users?.allPermissions}
          disableFilter={disableFilter}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </DivScreenUser>
    </DivUserRegister>
  );
}
