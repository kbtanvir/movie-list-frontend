import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../features/auth/logic/services/auth.service";
import { sliceStore } from "../../../features/auth/logic/slice";
import { AppRoutes } from "../../consts/appRoutes";
import styles from "./index.module.css";
export default function HeaderLayout() {
  return (
    <div className={styles.header}>
      <div className={styles.logoText}>MovieBuzz</div>
      <DropdownMenu />
    </div>
  );
}

function DropdownMenu() {
  const navigate = useNavigate();

  const { session } = useSelector(sliceStore.state);

  function handleLogout() {
    authService
      .logout({
        refreshToken: session!.refreshToken,
      })
      .then(() => {
        navigate(AppRoutes.movies);
      });
  }

  return (
    <div className={styles.dropdownMenu}>
      <BiUser className={styles.dropdownMenuButton} />
      <div className={styles.dropdownMenuContent}>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
        {/* <a href="#">Register</a> */}
      </div>
    </div>
  );
}
