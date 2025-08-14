import { Routes, Route } from "react-router-dom";

import Layout from "../shared/components/Layout/Layout";

import MainLoginPage from "./MainLoginPage/MainLoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";


import MainPage from "./MainPage/MainPage";
import SearchPage from "./SearchPage/SearchPage";
import ExplorePage from "./ExplorePage/ExplorePage";
import MessagePage from "./MessagePage/MessagePage";
// import NotificationPage from "./NotificationPage/NotificationPage";
import CreatePage from "./CreatePage/CreatePage";
import ProfilePage from "./ProfilePage/ProfilePage";
import EditProfilePage from "./EditProfilePage/EditProfilePage";
import ResetPage from "./ResetPage/ResetPage";

import TermsPage from "./TermsPage/TermsPage";
import PolicyPage from "./PolicyPage/PolicyPage";
import CookiesPolicyPage from "./CookiesPolicyPage/CookiesPolicyPage";

import NotFoundPage from "./NotFoundPage/NotFoundPage";

import PublicRoute from "../shared/components/PublicRoute/PublicRoute";
import PrivateRoute from "../shared/components/PrivateRoute/PrivateRoute";

const Navigation = () => {
    return (
        <Routes>
            
            <Route element={<PublicRoute />}>
                <Route path="/" element={<MainLoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ResetPage />} />
                <Route path="/reset-password" element={<ResetPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/policy" element={<PolicyPage />} />
                <Route path="/cookies" element={<CookiesPolicyPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/messages" element={<MessagePage />} />
                    {/* <Route path="/notifications" element={<NotificationPage />} /> */}
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/:username" element={<ProfilePage />} />
                    <Route path="/editprofile" element={<EditProfilePage />} />
                </Route>
            </Route>
        </Routes>
    )
}
export default Navigation;