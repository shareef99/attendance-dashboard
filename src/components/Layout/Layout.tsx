import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppShell } from "@mantine/core";
import Sidebar from "./Sidebar";
import { checkAuth } from "../../helpers/auth";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuth()) {
      navigate("/auth/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell
      navbar={<Sidebar />}
      styles={() => ({
        main: {
          backgroundColor: "#e7eef6",
          paddingTop: 0,
          paddingBottom: 0,
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
