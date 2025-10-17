import { AppLayout, DrawerToggle, ProgressBar, SideNav, SideNavItem } from '@vaadin/react-components';
import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Signal, signal, effect } from '@vaadin/hilla-react-signals';

const vaadin = window.Vaadin as {
  documentTitleSignal: Signal<string>;
};
vaadin.documentTitleSignal = signal('');
effect(() => {
  document.title = vaadin.documentTitleSignal.value;
});

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title ?? '';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    vaadin.documentTitleSignal.value = currentTitle;
  });

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer">
        <header>
          <h1>{vaadin.documentTitleSignal}</h1>
          <SideNav onNavigate={({ path }) => navigate(path!)} location={location}>
            {createMenuItems().map(({ to, title }) => (
              <SideNavItem path={to} key={to}>
                {title}
              </SideNavItem>
            ))}
          </SideNav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar">
        {vaadin.documentTitleSignal}
      </h2>

      <Suspense fallback={<ProgressBar indeterminate className="m-0" />}>
        <section className="view p-m gap-m">
          <Outlet />
        </section>
      </Suspense>
    </AppLayout>
  );
}
