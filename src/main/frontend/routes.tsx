import { RouterConfigurationBuilder } from '@vaadin/hilla-file-router/runtime.js';
import fileRoutes from 'Frontend/generated/file-routes.js';
import Flow from 'Frontend/generated/flow/Flow.js';

export const { routes, router } = new RouterConfigurationBuilder()
  // Adding file routes generated by @vaadin/hilla-file-router.
  // If you use File Router, this call should come first.
  .withFileRoutes(fileRoutes)
  // To add some React routes, you could use the following approach.
  //
  // NOTE: these routes won't appear in the menu automatically.
  //
  // .withReactRoutes([
  //   {
  //     path: '/login',
  //     element: <Login />
  //     handle: {
  //       title: 'Sign In'
  //     }
  //   }
  // ])

  // Adding the fallback to allow user to visit server-side routes
  // created via Java.
  .withFallback(Flow)
  // Protecting the routes. If the route has `loginRequired` or `rolesAllowed`
  // option set in `ViewConfig`, it will forbid the access to the route and
  // remove the menu record for the users who don't fit the requirements.
  //
  // NOTE: It protects routes with only client's capabilities. Do not forget to
  // set up server protection as well.
  .protect()
  .build();
