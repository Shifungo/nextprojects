"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/NavBar.module.css";
interface navbarProps {
  childComp?: React.ReactNode;
}
const NavBar: React.FC<navbarProps> = (childComp): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  const children = childComp;
  function handleHover() {
    setIsHovering(true);
  }

  function handleLeave() {
    setIsHovering(false);
  }

  return (
    <div className={styles.navBarWrapperFull}>
      <div className={styles.homeButton}>
        <Link className={styles.link} href={"/"}>
          HOME
        </Link>
      </div>
      <div className={styles.navBarWrapper}>
        <ul>
          <li>
            <Link className={styles.link} href={"/who"}>
              Quem Sou Eu
            </Link>
          </li>
          <li>
            <div onMouseEnter={handleHover} onMouseLeave={handleLeave}>
              <Link className={styles.link} href={"/"}>
                Projetos
              </Link>

              {isHovering && (
                <div className={styles.dropdownMenu}>
                  <Link className={styles.link} href={"/atividades"}>
                    Calendar
                  </Link>
                </div>
              )}
            </div>
          </li>
          <li>
            <Link className={styles.link} href={"/contato"}>
              Contato
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
