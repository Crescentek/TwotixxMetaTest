import React, { useState, useLayoutEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { TextField, Grid } from "@mui/material";
import "./Contact.css";
import CommonButton from "../../components/Common/CommonButton";
import { contactPage } from "../../../src/services/api";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  textField: {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      fontFamily: "var(--global-font-family)",
      color: "black",
    },
  },
});

function Contact() {
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comment: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const maxChars = 500;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]:
        name === "comment" && value.length > maxChars
          ? formData.comment
          : value,
    });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (formData.comment.length > maxChars)
      errors.comment = "Comment exceeds maximum length";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { firstName, lastName, email, comment } = formData;
      const userNames = `${firstName} ${lastName}`;

      try {
        Swal.fire({
          title: "Submitting...",
          text: "Please wait.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await contactPage(email, userNames, comment);

        Swal.close();

        if (response.status) {
          Swal.fire({
            title: "Success!",
            text: "Form submitted successfully",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonClass: "custom-swal-button",
            // buttonsStyling: false
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }
      } catch (error) {
        Swal.close();
        console.error("Submission error: ", error.message);
      }
    }
  };

  const characterCountStyle = {
    color:
      formData.comment.length > maxChars ? "red" : "var(--Primary-Mid-Blue)",
    marginTop: "8px",
    float: "right",
  };

  return (
    <>
    <div className="contact-main">
      <Navbar />
      <div className="contact-body-sec">
        <div className="contact-inner-block">
          <div className="contact-body-lft">
            <h2>Get in touch!</h2>
            <form
              noValidate
              className="lft-form"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <div className="lft-description">
                    <p className="lft-desc-text">
                      If you have any questions about an event, please contact
                      the event organiser directly. If you'd like to speak to
                      Twotixx then fill in your details and we'll get back to
                      you as quick as we can.
                    </p>
                    {/* <p className="lft-desc-text"> */}

                    {/* </p> */}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <span>First Name</span>
                  <TextField
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                    name="firstName"
                    placeholder="Enter first name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    InputLabelProps={{
                      className: "custom-label",
                    }}
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <span>Last Name</span>
                  <TextField
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                    name="lastName"
                    placeholder="Enter last name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    InputLabelProps={{
                      className: "custom-label",
                    }}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <span>Email address</span>
                  <TextField
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    name="email"
                    placeholder="Enter email address"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    InputLabelProps={{
                      className: "custom-label",
                    }}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <span>Comments</span>
                  <TextField
                    error={!!formErrors.comment}
                    helperText={formErrors.comment}
                    name="comment"
                    placeholder="Add your comments..."
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={6}
                    value={formData.comment}
                    onChange={handleInputChange}
                    className={classes.textField}
                    InputLabelProps={{
                      className: "custom-label",
                    }}
                  />
                  <div
                    className="character-counter"
                    style={characterCountStyle}
                  >
                    {`${formData.comment.length}/${maxChars} characters`}
                  </div>
                </Grid>
              </Grid>
              <div className="contact-btn">
                <CommonButton
                  type="submit"
                  text="Submit"
                  width="328px"
                  height="52px"
                  fontSize="28px"
                  textAlign="center"
                />
              </div>
            </form>
          </div>
          <div className="contact-body-rht">
            <img className="contact-rhtImg" alt="" src="/help-bg.svg" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
}

export default Contact;
