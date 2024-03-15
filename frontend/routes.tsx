import { toReactRouter } from '@vaadin/hilla-file-router/runtime.js';
import { protectRoutes } from '@vaadin/hilla-react-auth';
import views from 'Frontend/generated/views.js';
import { serverSideRoutes } from "Frontend/generated/flow/Flow";
import {createBrowserRouter} from "react-router-dom";

const route = toReactRouter(views as any);
route.children?.push(...serverSideRoutes);

export const routes = protectRoutes([route]);
const router = createBrowserRouter(routes, {basename: new URL(document.baseURI).pathname });
export default router;
