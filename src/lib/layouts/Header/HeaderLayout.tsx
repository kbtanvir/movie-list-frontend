import { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../features/auth/logic/services/auth.service";
import { sliceStore } from "../../../features/auth/logic/slice";
import { AppRoutes } from "../../consts/appRoutes";
import styles from "./HeaderLayout.module.css";

export default function HeaderLayout() {
  const navigate = useNavigate();

  const { user } = useSelector(sliceStore.state);
  // const { data, error, isLoading } = useGetUserByIDQuery(user!.id);
  function handleLogout() {
    authService.logout().then(() => {
      navigate(AppRoutes.movies);
    });
  }
  useEffect(() => {
    // console.log(data);
  }, []);
  return (
    <div className={styles.header}>
      <div className={styles.logoText}>MovieBuzz</div>
      <div className={styles.userInfo}>
        <div className={styles.dropdownMenu}>
          <BiUser className={styles.dropdownMenuIcon} />
          <div className={styles.dropdownMenuContent}>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
        <span>
          {user!.firstName} {user!.lastName.split("")[0]}.
        </span>
      </div>
    </div>
  );
}
