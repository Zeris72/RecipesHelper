import {Route,Routes} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import FavoriteRecipesPage from "./pages/FavoriteRecipesPage";
import SignInPage from "./pages/SignInPage";
import RecipesListPage from "./pages/RecipesListPage";
import CalCalculatorPage from "./pages/CalCalculatorPage";
import Layout from "./components/layouts/Layout";
import ShowRecipePage from "./pages/ShowRecipePage";
import AddCommentPage from "./pages/AddCommentPage";
import SuggestRecipePage from "./pages/SuggestRecipePage";
import LogoutPage from "./pages/LogoutPage";
import AdminPage from "./pages/AdminPage";
import AddRecipePage from "./pages/AddRecipePage";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/favorites" element={<FavoriteRecipesPage/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/result" element={<RecipesListPage/>}/>
        <Route path="/cal" element={<CalCalculatorPage/>}/>
        <Route path="/recipe" element={<ShowRecipePage/>}/>
        <Route path="/addcomment" element={<AddCommentPage/>}/>
        <Route path="/suggestrecipe" element={<SuggestRecipePage/>}/>
        <Route path="/logout" element={<LogoutPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/addrecipe" element={<AddRecipePage/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
