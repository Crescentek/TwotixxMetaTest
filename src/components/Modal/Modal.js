import React, { useEffect } from "react";
import "./Modal.css";
import { ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CountdownTimer from "../Common/CountdownTimer";
import { useDispatch, useSelector } from "react-redux";
import { resetTimer } from "../../reducers/eventDataReducer";
import { clearCreateCartId } from "../../reducers/eventDataReducer";
import { clearCart } from "../../services/api";
const Modal = ({ children, onClose }) => {
  const timerStarted = useSelector((state) => state.timerStarted);
  const cartId = useSelector((state)=>state.cartId)
  console.log('cartId', cartId)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const clearCartAsync = async () => {
       dispatch(resetTimer());
       localStorage.removeItem("countdownEndTime");
    };
    clearCartAsync();
  }, [location, dispatch]);
  
  const handleClose = async() => {
    dispatch(resetTimer());
    localStorage.removeItem("countdownEndTime");
    if(cartId){
       await clearCart({cartId})
    }
     dispatch(clearCreateCartId()) 
    onClose();
  };

  const gotoHome = async() => {
    dispatch(resetTimer());
    localStorage.removeItem("countdownEndTime");
    if(cartId){
      await clearCart({cartId})
   }
   dispatch(clearCreateCartId())
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    return () => {
      const clearCartOnUnmount = async () => {
        localStorage.removeItem("countdownEndTime");
      //   if(cartId){
      //     await clearCart({cartId})
      //  }
      };
        clearCartOnUnmount();
    };
  }, []);

 
  
  
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="successHeader modal-top-logoClose">
          <div className="navBarLogo" onClick={gotoHome}>
            <img
              className="iconnavBarLogo"
              alt=""
              src="/icon1.svg"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          {timerStarted && <CountdownTimer initialSeconds={600} />}

          <div className="modal-close-button-block">
            <button className="modal-close-button" onClick={handleClose}>
              <img
                src="/x-close.svg"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </button>
          </div>
        
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
