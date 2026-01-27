import React, { useState } from "react";
import {
  DivNav,
  Nav,
  OptionMenu,
  Bars,
  Bar,
  NavMenu,
  DivDrop,
  DropMenuSpan,
  ImgLogo,
  LiDiv,
  DivOrgMenu,
  NavLinkImg,
  DivOrgUser,
} from "./NavbarStyle";
import Logo from "../../images/LogoInicio.png";
import UserConfig from "../Configs/UserConfig/UserConfig";
import {
  Building2,
  ShoppingCart,
  Wallet,
  Boxes,
  UserPlus,
  User,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <DivNav>
      <Nav open={open}>
        <NavLinkImg to="/home">
          <ImgLogo src={Logo} />
        </NavLinkImg>

        <Bars onClick={() => setOpen(!open)}>
          <Bar />
        </Bars>

        <NavMenu open={open}>
          <DivOrgMenu>
            {/* Empresa */}
            <LiDiv>
              <OptionMenu onClick={() => toggleMenu("empresa")}>
                <span>
                  <Building2 size={18} /> Empresa
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    transform:
                      activeMenu === "empresa" ? "rotate(180deg)" : "rotate(0)",
                    transition: "0.3s",
                  }}
                />
              </OptionMenu>
              <AnimatePresence>
                {activeMenu === "empresa" && (
                  <DivDrop
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <DropMenuSpan to="/home">Resumo</DropMenuSpan>
                    <DropMenuSpan to="/resume/profits">
                      Resumo Lucro
                    </DropMenuSpan>
                    <DropMenuSpan to="/resume/invoice">
                      Faturamento
                    </DropMenuSpan>
                    <DropMenuSpan to="/resume/expense">Despesas</DropMenuSpan>
                    <DropMenuSpan to="/resume/stock">Estoque</DropMenuSpan>
                  </DivDrop>
                )}
              </AnimatePresence>
            </LiDiv>

            {/* Comercial */}
            <LiDiv>
              <OptionMenu onClick={() => toggleMenu("comercial")}>
                <span>
                  <ShoppingCart size={18} /> Comercial
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    transform:
                      activeMenu === "comercial"
                        ? "rotate(180deg)"
                        : "rotate(0)",
                    transition: "0.3s",
                  }}
                />
              </OptionMenu>
              <AnimatePresence>
                {activeMenu === "comercial" && (
                  <DivDrop
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <DropMenuSpan to="/comercial">Venda Balcão</DropMenuSpan>
                    <DropMenuSpan to="/comercial/more-sell">
                      Mais Vendidos
                    </DropMenuSpan>
                    <DropMenuSpan to="/comercial/budget">
                      Orçamento
                    </DropMenuSpan>
                  </DivDrop>
                )}
              </AnimatePresence>
            </LiDiv>

            {/* Financeiro */}
            <LiDiv>
              <OptionMenu onClick={() => toggleMenu("financeiro")}>
                <span>
                  <Wallet size={18} /> Financeiro
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    transform:
                      activeMenu === "financeiro"
                        ? "rotate(180deg)"
                        : "rotate(0)",
                    transition: "0.3s",
                  }}
                />
              </OptionMenu>
              <AnimatePresence>
                {activeMenu === "financeiro" && (
                  <DivDrop
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <DropMenuSpan to="/financial">
                      Resumo de Vendas
                    </DropMenuSpan>
                    <DropMenuSpan to="/financial/financial-entry-order">
                      Compras Fornecedores
                    </DropMenuSpan>
                    <DropMenuSpan to="/financial/comission">
                      Comissões
                    </DropMenuSpan>
                    <DropMenuSpan to="/financial/debits">Despesa</DropMenuSpan>
                  </DivDrop>
                )}
              </AnimatePresence>
            </LiDiv>

            {/* Estoque */}
            <LiDiv>
              <OptionMenu onClick={() => toggleMenu("estoque")}>
                <span>
                  <Boxes size={18} /> Estoque
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    transform:
                      activeMenu === "estoque" ? "rotate(180deg)" : "rotate(0)",
                    transition: "0.3s",
                  }}
                />
              </OptionMenu>
              <AnimatePresence>
                {activeMenu === "estoque" && (
                  <DivDrop
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <DropMenuSpan to="/stock">Estoque</DropMenuSpan>
                    <DropMenuSpan to="/stock/stock-item">
                      Entrada no Estoque
                    </DropMenuSpan>
                    <DropMenuSpan to="/stock/etiquetas">Etiquetas</DropMenuSpan>
                  </DivDrop>
                )}
              </AnimatePresence>
            </LiDiv>

            {/* Cadastros */}
            <LiDiv>
              <OptionMenu onClick={() => toggleMenu("cadastros")}>
                <span>
                  <UserPlus size={18} /> Cadastros
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    transform:
                      activeMenu === "cadastros"
                        ? "rotate(180deg)"
                        : "rotate(0)",
                    transition: "0.3s",
                  }}
                />
              </OptionMenu>
              <AnimatePresence>
                {activeMenu === "cadastros" && (
                  <DivDrop
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <DropMenuSpan to="/new-client">Cliente</DropMenuSpan>
                    <DropMenuSpan to="/new-provider">Fornecedor</DropMenuSpan>
                    <DropMenuSpan to="/new-product">Produto</DropMenuSpan>
                    <DropMenuSpan to="/new-employee">Funcionário</DropMenuSpan>
                    <DropMenuSpan to="/new-position">Profissão</DropMenuSpan>
                    <DropMenuSpan to="/new-user">Usuário</DropMenuSpan>
                    <DropMenuSpan to="/new-brand">Tipo</DropMenuSpan>
                    <DropMenuSpan to="/new-delivery">Delivery</DropMenuSpan>
                    <DropMenuSpan to="/new-category">Categoria</DropMenuSpan>
                  </DivDrop>
                )}
              </AnimatePresence>
            </LiDiv>
            {/* User */}
            <LiDiv>
              <OptionMenu onClick={() => toggleMenu("user")}>
                <span>
                  <User size={18} /> Usuário
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    transform:
                      activeMenu === "user" ? "rotate(180deg)" : "rotate(0)",
                    transition: "0.3s",
                  }}
                />
              </OptionMenu>

              <AnimatePresence>
                {activeMenu === "user" && (
                  <DivDrop
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <UserConfig open={open} />
                  </DivDrop>
                )}
              </AnimatePresence>
            </LiDiv>
          </DivOrgMenu>
        </NavMenu>
      </Nav>
    </DivNav>
  );
}
