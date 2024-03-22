import {
  AppLayout,
  DrawerToggle,
  ProgressBar,
  SideNav,
  SideNavItem,
} from "@vaadin/react-components";
import {
  createMenuItems,
  useViewConfig,
} from "@vaadin/hilla-file-router/runtime.js";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const defaultTitle = document.title;

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title ?? defaultTitle;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">${currentTitle}</h1>
          <SideNav
            onNavigate={({ path }) => navigate(path!)}
            location={location}
          >
            {createMenuItems().map(({ to, icon, title }) => (
              <SideNavItem path={to} key={to}>
                {title}
              </SideNavItem>
            ))}
          </SideNav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>

      <Suspense fallback={<ProgressBar indeterminate className="m-0" />}>
        <section className="view">
          <Outlet />
        </section>
      </Suspense>
    </AppLayout>
  );
}
