import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SummarizerPage from "./pages/SummarizerPage";

function App() {
    return (
        <Router>
            <div className="pt-[4.75rem] lg:pt-[5.25rem] min-h-screen flex flex-col">
                <Navbar />

                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/summarizer" element={<SummarizerPage />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
