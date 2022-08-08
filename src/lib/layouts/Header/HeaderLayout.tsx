import { useState } from "react";
import { BiUser } from "react-icons/bi";
import styles from "./HeaderLayout.module.css";
export default function HeaderLayout() {
  return (
    <div className={styles.header}>
      <div className={styles.logoText}>MovieBuzz</div>
      <DropdownMenu />
    </div>
  );
}

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.dropdownMenu}>
      {/* <button className={styles.dropdownMenuButton} onMouseMove={handleClick}>
        Dropdown Menu
      </button> */}
      <BiUser className={styles.dropdownMenuButton} />
      <div className={styles.dropdownMenuContent}>
        <a href="#">Login</a>
        <a href="#">Register</a>
      </div>
    </div>
  );
}
