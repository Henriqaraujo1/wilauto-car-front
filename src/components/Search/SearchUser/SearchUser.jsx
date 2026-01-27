import { useEffect, useState } from "react";
import {
  Close,
  Edit,
  Password,
  PersonRemove,
  Search,
} from "@styled-icons/material";
import {
  BtnEdit,
  BtnRemove,
  BtnPassword,
  DivBtnEdit,
  DivBtnFilter,
  DivIdUser,
  DivUser,
  DivUserInfo,
  DivSearch,
  DivSearchUser,
  DivTableSearch,
  DivInfo,
  TitleSearchUser,
  NameInput,
  NameLabel,
  SpanCod,
  SpanName,
  DivOrgLoading,
  DivOrgId,
  DivOrgCard,
  DivOrgInputs,
  EmailInput,
  FormatNumberText,
} from "./SearchUserStyle";
import UpdateUser from "../../Update/UpdateUser/UpdateUser";
import UpdatePassword from "../../Update/UpdatePassword/UpdatePassword";
// import InfoUser from "../Info/InfoUser/InfoUser";
import DeleteUser from "../../DeleteComponent/DeleteUser/DeleteUser";

import { ClipLoader } from "react-spinners";
import {
  BtnCancel,
  DivBtnSearch,
} from "../../Search/SearchProvider/SearchProviderStyle";

export default function SearchUser({
  usersInfo,
  permissionsInfo,
  isLoading,
  isFetching,
  disableFilter,
}) {
  const [userPopUp, setUserPopUp] = useState(false);
  const [delUserOption, setDelUserOption] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [filterUsername, setFilterUsername] = useState("");
  const [filterNameUser, setFilterNameuser] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterInfoUser, setFilterInfoUser] = useState([]);

  const [passwordPopUp, setPasswordPopUp] = useState(false);

  const [showList, setShowList] = useState(false);

  const [dataUserUpdate, setDataUserUpdate] = useState([]);
  const [dataPassUser, setDataPassUser] = useState({
    username: "",
    email: "",
    idUser: "",
  });

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
    if (!usersInfo) return setFilterInfoUser([]);

    let filterList = usersInfo;

    if (filterNameUser.trim().length > 0) {
      const parts = filterNameUser.trim().split(/\s+/);
      const firstName = parts[0].toLowerCase();
      const secondName = parts.slice(1).join(" ").toLowerCase();

      filterList = filterList.filter((user) => {
        const fullName =
          user?.firstName.toLowerCase() + " " + user?.lastName.toLowerCase();

        return (
          fullName.includes(firstName) &&
          (secondName === "" || fullName.includes(secondName))
        );
      });
    }

    if (filterUsername.length > 0) {
      filterList = filterList.filter((user) =>
        user.username.includes(filterUsername.toLocaleLowerCase())
      );
    }

    if (filterEmail.length > 0) {
      filterList = filterList.filter((user) =>
        user.email.includes(filterEmail.toLocaleLowerCase())
      );
    }

    setFilterInfoUser(filterList);
  }, [usersInfo, filterNameUser, filterEmail, filterUsername]);

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
    <DivSearchUser>
      <DivSearch>
        <TitleSearchUser>Consulta Usuario</TitleSearchUser>
        <DivBtnFilter show={disableFilter}>
          <DivOrgInputs>
            <NameLabel>Nome</NameLabel>
            <NameInput
              value={filterNameUser}
              onChange={(e) => setFilterNameuser(e.target.value)}
            />
            <NameLabel>Conta do Usuario</NameLabel>
            <NameInput
              value={filterUsername}
              onChange={(e) => setFilterUsername(e.target.value)}
            />
          </DivOrgInputs>
          <DivOrgInputs>
            <NameLabel>Email</NameLabel>
            <EmailInput
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
            <DivBtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setFilterNameuser("");
                  setFilterUsername("");
                  setFilterEmail("");
                  setFilterInfoUser(usersInfo);
                }}
              >
                <Close />
              </BtnCancel>
            </DivBtnSearch>
          </DivOrgInputs>
        </DivBtnFilter>
      </DivSearch>
      <DivTableSearch>
        {!showList ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          // <></>
          filterInfoUser.map((infoUser, index) => {
            return (
              <DivUser key={index}>
                <DivOrgCard>
                  <DivInfo>
                    <DivOrgId>
                      <DivIdUser>{index + 1}</DivIdUser>
                    </DivOrgId>
                    <DivUserInfo>
                      <SpanCod>Conta do Usuario: {infoUser.username}</SpanCod>
                      <SpanName>
                        Nome: {parseName(infoUser.firstName, infoUser.lastName)}
                      </SpanName>
                      <SpanName>Email: {infoUser.email}</SpanName>
                      <FormatNumberText
                        value={infoUser.phoneNumber}
                        format="(##) #####-####"
                        allowEmptyFormatting
                        mask="_"
                      />
                    </DivUserInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      onClick={() => {
                        setUserPopUp(!userPopUp);
                        setDataUserUpdate(infoUser);
                      }}
                    >
                      <Edit />
                    </BtnEdit>

                    <BtnPassword
                      onClick={() => {
                        setPasswordPopUp(!passwordPopUp);
                        setDataPassUser({
                          username: infoUser.username,
                          email: infoUser.email,
                          idUser: infoUser.idUser,
                        });
                      }}
                    >
                      <Password />
                    </BtnPassword>

                    <BtnRemove
                      onClick={() => {
                        setDelUserOption(!delUserOption);
                        setSelectedUser(infoUser);
                      }}
                    >
                      <PersonRemove />
                    </BtnRemove>
                  </DivBtnEdit>
                </DivOrgCard>
                {delUserOption && infoUser.idUser === selectedUser.idUser && (
                  <DeleteUser
                    selectedUser={selectedUser}
                    delUserOption={delUserOption}
                    setDelUserOption={setDelUserOption}
                  />
                )}
              </DivUser>
            );
          })
        )}
        {userPopUp && (
          <UpdateUser
            permissions={permissionsInfo}
            dataUserUpdate={dataUserUpdate}
            userPopUp={userPopUp}
            setUserPopUp={setUserPopUp}
          />
        )}
        {passwordPopUp && (
          <UpdatePassword
            dataPassUserInfo={dataPassUser}
            passwordPopUp={passwordPopUp}
            setPasswordPopUp={setPasswordPopUp}
          />
        )}
      </DivTableSearch>
    </DivSearchUser>
  );
}
