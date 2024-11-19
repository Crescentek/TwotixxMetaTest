import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import EventDetails from "./pages/EventDetails/EventDetails";
import store from "./utils/store";
import SuccessPage from "./components/Modal/SuccessPage";
import CancelPage from "./components/Modal/CancelPage";
import Contact from "./pages/Contact/Contact";
import AppPage from "./pages/App/AppPage";
import Terms from "./pages/TermsnCond/Terms";
import Home from "./pages/Home/Home";
import Grants from "./pages/Grants/Grants";
import TicketGuard from "./pages/TicketGuard/TicketGuard";
import About from "./pages/About/About";

import Features from "./pages/Features/Features";
import NotFound from "./pages/NotFound/NotFound";
import EventList from "./pages/EventListing/EventList";
import Seller from "./pages/Seller/Seller";
import Promoter from "./pages/PromoterDetails/Promoter";
import MetaUpdater  from './components/Common/MetaUpdater';
import { ToastContainer } from "react-toastify";
import { clearCart } from "./services/api";

function App() {

  useEffect(() => {
    const cartId = localStorage.getItem('createdcartId')
    if(cartId){
      handleClearCart(cartId)
    }
  }, []);

  const handleClearCart = async(cartId) => {
    localStorage.removeItem("countdownEndTime");
    localStorage.removeItem("createdcartId");
    await clearCart({cartId})
  };



  return (
    <HelmetProvider>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition="Bounce"
        />
        {/* Same as */}
        <ToastContainer />
        <Router>
        {/* <MetaUpdater /> */}
          {/* <div className="App"> */}
          
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/event-details/:id" element={<EventDetails />}/>
                <Route path="/event-list" element={<EventList />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<CancelPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ticketGuard" element={<TicketGuard />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/organisers" element={<Seller />}/>
                <Route path="/grants" element={<Grants />}/>
                <Route path="/about" element={<About />} />               
                <Route path="/promoter/:id" element={<Promoter />} />
                <Route path="/features" element={<Features />} />
            </Routes>
            
          {/* </div> */}
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
