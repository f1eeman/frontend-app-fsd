import { type FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useAppDispatch, useAppSelector } from 'app/providers/store/hooks'
// import { LoginModal } from 'features/AuthByUsername'
// import { getUserAuthData, userActions } from 'entities/user'
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button/Button";
import * as classes from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC = ({ className = "" }: NavbarProps) => {
  const { t } = useTranslation();
  // const authData = useAppSelector(getUserAuthData)
  // const dispatch = useAppDispatch()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const toggleAuthModal = useCallback(() => {
    setIsAuthModalOpen((prev) => !prev);
  }, []);

  // const onLogout = useCallback(() => {
  //   dispatch(userActions.logout());
  // }, [dispatch]);

  // if (authData) {
  //   return (
  //     <div className={classNames(classes.navbar, {}, [className])}>
  //       <Button
  //         theme={"clear-inverted"}
  //         className={classes.links}
  //         onClick={onLogout}
  //       >
  //         {t("Выйти")}
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className={classNames(classes.navbar, {}, [className])}>
      <div className={classes.links}>
        <Button theme={"clear-inverted"} onClick={toggleAuthModal}>
          {t("Войти")}
        </Button>
      </div>
      {/* <LoginModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} /> */}
    </div>
  );
};
