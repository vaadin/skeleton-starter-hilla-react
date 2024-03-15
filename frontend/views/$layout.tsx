import { AppLayout } from '@vaadin/react-components/AppLayout.js';
import { DrawerToggle } from '@vaadin/react-components/DrawerToggle.js';
import {createMenuItems, useViewConfig} from '@vaadin/hilla-file-router/runtime.js';
import { ProgressBar } from '@vaadin/react-components/ProgressBar';
import { Suspense, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title ?? 'Hybrid example';

  useEffect(() => {document.title = currentTitle;}, [currentTitle]);

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">Hybrid example</h1>
          <nav>
            {createMenuItems().map(({ to, icon, title }) => (
              <NavLink className={navLinkClasses} to={to} key={to}>
                {title}
              </NavLink>
            ))}
          </nav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>

      <Suspense fallback={<ProgressBar indeterminate={true} className="m-0" />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
