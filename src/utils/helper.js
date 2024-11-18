
export const ticketFeesCheck = (data) => {
    const resData = {
      isBookingFee: false,
      isTicketGuardFee: false,
      isPlatformFee: false,
  
    }
    if (data?.addFeesToTicketPrice === false) {
      if (data?.addBookingFeeToTicketPrice) {
        resData.isBookingFee = true
      } else {
        resData.isTicketGuardFee = false
        resData.isPlatformFee = false
  
      }
    } else {
      if (data?.addBookingFeeToTicketPrice) {
        resData.isBookingFee = true
        resData.isTicketGuardFee = true
        resData.isPlatformFee = true
      } else {
        resData.isTicketGuardFee = true
        resData.isPlatformFee = true
      }
    }
  
    return resData
  }
  


