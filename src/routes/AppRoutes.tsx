import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ProtectedRoute } from './ProtectedRoute';
import Home from '../pages/Home/Home';
import Projects from '../pages/Projects/Projects';
import ProjectDetails from '../pages/ProjectDetails/ProjectDetails';
import About from '../pages/About/About';
import BlogIndex from '../pages/Blog/BlogIndex';
import BlogPostPage from '../pages/Blog/BlogPost';
import Contact from '../pages/Contact/Contact';
import TrackRequest from '../pages/TrackRequest/TrackRequest';
import NotFound from '../pages/NotFound/NotFound';
import { RequireCustomerAuth } from './RequireCustomerAuth';

// The request form pulls in the whole validation schema, and the admin area is
// only ever used by one person — both are split out so public visitors never
// download them.
const RequestProject = lazy(() => import('../pages/RequestProject/RequestProject'));
const AdminLayout = lazy(() =>
  import('../components/layout/AdminLayout').then((module) => ({ default: module.AdminLayout }))
);
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const Account = lazy(() => import('../pages/Account/Account'));
const MyRequests = lazy(() => import('../pages/Account/MyRequests'));
const RequestDetails = lazy(() => import('../pages/Account/RequestDetails'));
const EditRequest = lazy(() => import('../pages/Account/EditRequest'));
const AdminLogin = lazy(() => import('../pages/Admin/Login'));
const AdminForgotPassword = lazy(() => import('../pages/Admin/ForgotPassword'));
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'));
const AdminProjectsList = lazy(() => import('../pages/Admin/ProjectsList'));
const AdminProjectForm = lazy(() => import('../pages/Admin/ProjectForm'));
const AdminRequestsList = lazy(() => import('../pages/Admin/RequestsList'));
const AdminRequestDetail = lazy(() => import('../pages/Admin/RequestDetail'));
const AdminBannerSettings = lazy(() => import('../pages/Admin/BannerSettings'));
const AdminSettings = lazy(() => import('../pages/Admin/Settings'));
const AdminRequestStatus = lazy(() => import('../pages/Admin/RequestStatusSettings'));
const AdminTestimonialsList = lazy(() => import('../pages/Admin/TestimonialsList'));
const AdminTestimonialForm = lazy(() => import('../pages/Admin/TestimonialForm'));
const AdminBlogList = lazy(() => import('../pages/Admin/BlogList'));
const AdminBlogForm = lazy(() => import('../pages/Admin/BlogForm'));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 size={22} className="animate-spin text-content-muted" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetails />} />
          <Route path="blog" element={<BlogIndex />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="request-project" element={<RequestProject />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="track-request" element={<TrackRequest />} />
          <Route element={<RequireCustomerAuth />}>
            <Route path="account" element={<Account />} />
            <Route path="account/requests" element={<MyRequests />} />
            <Route path="account/requests/:id" element={<RequestDetails />} />
            <Route path="account/requests/:id/edit" element={<EditRequest />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/forgot-password" element={<AdminForgotPassword />} />

        <Route path="admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjectsList />} />
            <Route path="projects/new" element={<AdminProjectForm />} />
            <Route path="projects/:id/edit" element={<AdminProjectForm />} />
            <Route path="requests" element={<AdminRequestsList />} />
            <Route path="requests/:id" element={<AdminRequestDetail />} />
            <Route path="testimonials" element={<AdminTestimonialsList />} />
            <Route path="testimonials/new" element={<AdminTestimonialForm />} />
            <Route path="testimonials/:id/edit" element={<AdminTestimonialForm />} />
            <Route path="blog" element={<AdminBlogList />} />
            <Route path="blog/new" element={<AdminBlogForm />} />
            <Route path="blog/:id/edit" element={<AdminBlogForm />} />
            <Route path="banner" element={<AdminBannerSettings />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="request-status" element={<AdminRequestStatus />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
