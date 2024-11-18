<div>
  {!isPhoneValid && (
    <>
      <div className="customer-verification">STEP 1: VERIFICATION</div>
      <div className="text12">Enter your mobile number</div>
      <span className="mobile-verification-content">
        Your mobile number is required to verify your account and protect your
        tickets
      </span>
      <p className="mobile-verification-label">Mobile number</p>
      <div className="phone-input-container big-input-static">
        <div className="phoneNoCont">
          <span
            className="countryFlagCode"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedCountry.flagUrl !== "/flag-united-kingdom.svg" ? (
              <span className="topCflag">
                <span>{selectedCountry.flagUrl}</span>
              </span>
            ) : (
              <img
                className="countryFlag"
                src={selectedCountry.flagUrl}
                alt="Country Flag"
              />
            )}
            <span className="countryCode">+{selectedCountry.dialingCode}</span>
          </span>
          <input
            className="form-control"
            type="tel"
            placeholder="Mobile number"
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {showDropdown && (
            <div className="countryDropdown">
              {countryList?.map((country) => (
                <div
                  key={country.dialingCode}
                  onClick={() => {
                    setSelectedCountry({
                      dialingCode: country.dialingCode,
                      flagUrl: country.flagUrl,
                    });
                    setShowDropdown(false);
                  }}
                >
                  <span className="cflag">
                    <span>{country.flagUrl}</span>
                  </span>
                  <span className="cdialCode">
                    <span>+{country.dialingCode}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <CommonButton
        text="Continue"
        width="100%"
        height="46px"
        onClick={handleContinueClick}
      />
    </>
  )}

  {isPhoneValid && !isOtpVerified && !isRegistrationComplete && (
    <>
      <span className="otp-verification-title">We’ve sent you a code</span>
      <div className="otp-verification-text">
        You've been texted a log-in code to{" "}
        <span
          style={{
            color: "#0057FF",
            display: "inline-block",
            whiteSpace: "nowrap",
            fontWeight: "600",
          }}
        >
          {`+${selectedCountry.dialingCode} ${formData.phoneNumber
            .replace("+" + selectedCountry.dialingCode, "")
            .trim()}`}
        </span>
        for extra security. Please enter it below:
      </div>
      <Grid container spacing={2}>
        {formData.otp.map((value, index) => (
          <Grid item xs={3} key={`otp_${index}`}>
            <TextField
              type="tel"
              inputRef={otpRefs.current[index]}
              className="otp-input"
              variant="outlined"
              value={value}
              onChange={handleChange(`otp`, index)}
              onKeyDown={(e) => handleChange(`otp`, index)(e)}
              onPaste={handlePaste}
              InputProps={{
                style: {
                  fontSize: "2rem",
                  borderColor: isOtpValid
                    ? "#0057FF"
                    : "var(--twotixx-borders-silver)",
                  color: isOtpValid
                    ? "#0057FF"
                    : "var(--Twotixx-Text-Error-Red)",
                  backgroundColor: isOtpValid
                    ? "transparent"
                    : "var(--surface-error-subtle)",
                },
                inputProps: {
                  maxLength: 1,
                  style: { textAlign: "center" },
                },
              }}
              error={!isOtpValid}
            />
          </Grid>
        ))}
      </Grid>
      <CommonButton
        text="Request new code"
        onClick={mobileOTPResend}
        width="100%"
        height="46px"
      />
    </>
  )}

  {isMobileVerified &&
    isNewUser &&
    isOtpVerified &&
    !isRegistrationComplete && (
      <>
        <span className="registration-text1">Let's get you started</span>
        <p className="registration-text2">
          It seems you don't have a Twotixx account created yet, so we'll just
          need some details from you.
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter first name"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Enter last name"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <CommonButton
          text="Create Account"
          width="100%"
          height="46px"
          onClick={() => handleRegisterUser(mobileOTP, emailOTP)}
        />
      </>
    )}
</div>;
