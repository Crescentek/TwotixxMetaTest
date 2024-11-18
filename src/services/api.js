import Api from "../utils/Api";

function getStatus(response) {
  if (response.status === 200 || response.status === 204) {
    return { status: true, response: response.response };
  } else if (response.status === 502) {
    return { status: false };
  } else {
    if (response.status === 400) {
      return { status: false, response: response.response, isWithError: true };
    } else if (response.status === 428) {
      return { status: false, response: response.response };
    } else {
      return { status: false, response: response };
    }
  }
}

export async function getEventsNearLocation(ipAddress) {
  try {
    // const url = `api/TicketSelling/GetEventsNearLocation?lat=${lat}&lon=${lon}`;
    const url = `api/TicketSelling/GetEventsNearLocation?ipAddress=${ipAddress}`;
    const response = await Api.GET(url);
    return getStatus(response);
  } catch (error) {
    console.error("Error in getEventsNearLocation:", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function getTrendeingEventDetails(params) {
  try {
    const res = await Api.GET("api/TicketSelling/GetTrendingEvents", params);
    if (res) {
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function getCountryList() {
  try {
    const res = await Api.GET("api/GetCountries");
    if (res) {
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

// Get currency list
export async function getCurrencyList(params) {
  try {
    const res = await Api.GET(`api/GetCurrencies`);
    if (res) {
      return getStatus(res);
    } else {
      return { status: false, message: res?.message };
    }
  } catch (error) {
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function getEventOverview(categoryName, params) {
  let dateRange = {};
  let priceRange = {};

  if (params.dateRange && Object.keys(params.dateRange).length > 0) {
    dateRange = params.dateRange;
  }
  if (params.priceRange && Object.keys(params.priceRange).length > 0) {
    priceRange = params.priceRange;
  }

  const payload = {
    categoryName: categoryName || "",
    type: params.type || "",
    city: params.city || "",
    dateRange: dateRange,
    priceRange: priceRange,
  };
  try {
    const response = await Api.POST(
      "api/TicketSelling/EventsOverview",
      payload
    );
    return getStatus(response);
  } catch (error) {
    console.error("getEventOverview error:", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function getEventCategories(params) {
  try {
    // const response = await Api.GET(
    //   "api/TicketSelling/GetEventCategories",

    // );
    const response = await Api.POST(
      "api/TicketSelling/v2/GetEventCategories",
      params
    );
    return getStatus(response);
  } catch (error) {
    console.error("getEventOverview error:", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function getEventDetails(id, trackingCode) {
  try {
    const endpoint = trackingCode
      ? `getevents/${id}?trackingCode=${trackingCode}`
      : `getevents/${id}`;

    const res = await Api.GET(endpoint);
    console.log("getEventDetails", res);
    if (res) {
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function getEventCities(params) {
  try {
    const res = await Api.GET(`api/GetEventCities`);
    if (res) {
      return getStatus(res);
    } else {
      return { status: false, message: res?.message };
    }
  } catch (error) {
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

// email existence check
export async function emailInUse(params) {
  try {
    const res = await Api.POST("api/Register/EmailInUse", params);
    if (res) {
      console.log("emailInUse", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("emailInUse error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

// sign up
export async function signUp(params) {
  try {
    const res = await Api.POST("api/Register/MobileWallet", params);
    if (res) {
      console.log("signUp****", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("signUpMobileWallet error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

//mobile otp send
export async function sendOTP(params) {
  try {
    const res = await Api.POST("api/Account/v2/RequestOTP", params);
    if (res) {
      console.log("sendOTP", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("sendOTP error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

//mobile otp verify
export async function verifyOTP(params) {
  try {
    const res = await Api.POST("api/Account/LoginOtp", params);
    if (res) {
      console.log("verifyOTP", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("sendOTP error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

//registration for new payment flow
export async function registerUser(params) {
  try {
    const res = await Api.POST("api/Register/MobileNumber", params);
    if (res) {
      console.log("registerUser", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("sendOTP error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

// contactPage

export async function contactPage(fromEmailAddress, userNames, comment) {
  try {
    const endpoint = `api/Order/ReportIssue/${fromEmailAddress}/${userNames}`;
    const body = { fromEmailAddress, userNames, comment };

    const res = await Api.POST(endpoint, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res) {
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

// create order
export async function createOrder(params) {
  try {
    const res = await Api.POST("api/Order/Create", params);
    if (res) {
      console.log("createOrder", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("createOrder error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

// create order
export async function getDiscountStatus(params) {
  try {
    const res = await Api.POST("api/Order/CalculateDiscount", params);
    if (res) {
      console.log("getDiscountStatus", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("getDiscountStatus error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

// update order
export async function updateOrder(params) {
  try {
    const res = await Api.PUT("api/Order/Update", params);
    if (res) {
      console.log("updateOrder", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("updateOrder error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function getBusinessDetailes(id) {
  try {
    const res = await Api.GET(`api/Business/Get/${id}`);
    console.log("businessDetailes", res);
    if (res) {
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("businessDetailes error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function getPromotersEvents(params) {
  try {
    const { EventStatus, PromoterId, IsPublished } = params;

    const queryString = `?EventStatus=${EventStatus}&PromoterId=${PromoterId}&IsPublished=${IsPublished}`;

    const res = await Api.GET(
      `api/EventManager/GetPromotersEvents${queryString}`
    );
    if (res) {
      return getStatus(res);
    } else {
      return { status: false, message: res?.message };
    }
  } catch (error) {
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function createCart(params) {
  try {
    const res = await Api.POST("api/Order/CreateCart", params);
    if (res) {
      console.log("createCart", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("createCart error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function createPayment(params) {
  try {
    const res = await Api.POST("api/order/createpaymentlink", params);
    if (res) {
      console.log("createPayment", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("createPayment error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function createZeroAmountCheckout(params) {
  try {
    const res = await Api.POST("api/Order/CreateZeroAmountCheckout", params);
    if (res) {
      console.log("CreateZeroAmountCheckout", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("CreateZeroAmountCheckout error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function clearCart(params) {
  const { cartId } = params;
  const queryString = `?id=${cartId}`;
  try {
    const res = await Api.DELETE(`api/Order/RemoveCart${queryString}`);
    if (res) {
      console.log("createCart", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("createCart error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
export async function addGrantDetails(params) {
  try {
    const res = await Api.POST("api/Grant/AddGrantDetails", params);
    if (res) {
      console.log("addGrantDetails", res);
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("addGrantDetails error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}

export async function getEventTypes() {
  try {
    const res = await Api.GET(`api/EventManager/GetEventCategories`);
    console.log("GetEventCategories", res);
    if (res) {
      return getStatus(res);
    } else {
      return { status: false, message: res.message };
    }
  } catch (error) {
    console.log("GetEventCategories error: ", error);
    return { status: false, message: "Oops, Something Went Wrong" };
  }
}
