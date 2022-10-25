import React, { useEffect, useState } from "react";
import FilterOptions from "../FilterOptions";
import OrderingOptions from "../OrderingOptions";
import style from "./SideMenu.module.css";

const SideMenu = ({
  setContinentFilter,
  setActivityFilter,
  setAscendent,
  setOrderBy,
}) => {
  const [menuClass, setMenuClass] = useState(
    `${style.menu} ${style.menu_close}`
  );
  const [btnClass, setBtnClass] = useState(
    `${style.menu_btn_float} ${style.menu_btn_float_menu_close}`
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      setMenuClass(`${style.menu} ${style.menu_open}`);
      setBtnClass(`${style.menu_btn_float} ${style.menu_btn_float_menu_open}`);
    } else {
      setMenuClass(`${style.menu} ${style.menu_close}`);
      setBtnClass(`${style.menu_btn_float} ${style.menu_btn_float_menu_close}`);
    }
  }, [menuOpen]);

  return (
    <>
      <button className={btnClass} onClick={()=>setMenuOpen(true)}>
        {"< Filtros"}
      </button>

      <div className={menuClass}>
        <div className={style.menu_btnClose_div}>
          <button className={style.menu_closeBtn} onClick={()=>setMenuOpen(false)}>{"< Cerrar"}</button>
        </div>
        <FilterOptions
          setContinentFilter={setContinentFilter}
          setActivityFilter={setActivityFilter}
        />
        <OrderingOptions setAscendent={setAscendent} setOrderBy={setOrderBy} />
      </div>
    </>
  );
};

export default SideMenu;
