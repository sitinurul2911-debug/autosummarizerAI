import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SummarizerPage from "./pages/SummarizerPage";

const App = () => {
    return (
        <Router>
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Navbar />
                
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/summarizer" element={<SummarizerPage />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
};

export default App;
