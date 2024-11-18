const boldFontFamily = "Poppins SemiBold 600";
const mediumFontFamily = "Poppins Medium 500";
const regularFontFamily = "Poppins Regular 400";
const robotoFontFamily = "Roboto";
// const boldFontFamily = "Poppins";
// const mediumFontFamily = "Poppins";
// const regularFontFamily = "Poppins";
// const robotoFontFamily = "Roboto";

const textVariants = {
  b900: {
    fontWeight: "600",
    fontSize: 64,
    lineHeight: 72,
    fontFamily: boldFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  b800: {
    fontWeight: "600",
    fontSize: 48,
    lineHeight: 56,
    fontFamily: boldFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  b700: {
    fontWeight: "600",
    fontSize: "40px",
    lineHeight: "1.3",
    fontFamily: boldFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  b600: {
    fontWeight: "600",
    fontSize: "32px",
    lineHeight: "1.3",
    fontFamily: boldFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  b500: {
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "1.3",
    fontFamily: boldFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  b400: {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "1.3",
    fontFamily: boldFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  b40018: {
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "1.3",
    fontFamily: boldFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  b300: {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "1.3",
    fontFamily: boldFontFamily,
    color: "darkCharcoal",
  },
  b200: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    fontFamily: boldFontFamily,
    color: "darkCharcoal",
  },
  b100: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: boldFontFamily,
    color: "darkCharcoal",
  },
  b000: {
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 14,
    fontFamily: boldFontFamily,
    color: "darkCharcoal",
  },
  m900: {
    fontWeight: "500",
    fontSize: 64,
    lineHeight: 72,
    fontFamily: mediumFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  m800: {
    fontWeight: "500",
    fontSize: 48,
    lineHeight: 56,
    fontFamily: mediumFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  m750: {
    fontWeight: "500",
    fontSize: "40px",
    lineHeight: "1.4em",
    fontFamily: mediumFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  m700: {
    fontWeight: "500",
    fontSize: "38px",
    lineHeight: "1.3",
    fontFamily: mediumFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  m600: {
    fontWeight: "500",
    fontSize: "32px",
    lineHeight: "1.3",
    fontFamily: mediumFontFamily,
    color: "var(--midnightBlue)",
  },
  m500: {
    fontSize: "24px",
    fontWeight: "500",
    lineHeight: "1.3",
    fontFamily: mediumFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  m400: {
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "1.3",
    fontFamily: mediumFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  m300: {
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "1.3",
    fontFamily: mediumFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  profileNameM300: {
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "1.5em",
    fontFamily: mediumFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  profileEmailM300: {
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1.5em",
    fontFamily: mediumFontFamily,
  },
  m200: {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "1.3",
    fontFamily: mediumFontFamily,
    color: "darkCharcoal",
  },
  m100: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: mediumFontFamily,
    color: "darkCharcoal",
  },
  m000: {
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 14,
    fontFamily: mediumFontFamily,
    color: "darkCharcoal",
  },
  r900: {
    fontWeight: "400",
    fontSize: 64,
    lineHeight: 72,
    fontFamily: regularFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  r800: {
    fontWeight: "400",
    fontSize: 48,
    lineHeight: 56,
    fontFamily: regularFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  r700: {
    fontWeight: "400",
    fontSize: "40px",
    lineHeight: "1.3",
    fontFamily: regularFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  r600: {
    fontWeight: "400",
    fontSize: 32,
    lineHeight: 40,
    fontFamily: regularFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  r500: {
    fontWeight: "400",
    fontSize: "24px",
    lineHeight: "1.3",
    fontFamily: regularFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  r400: {
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "1.3",
    fontFamily: regularFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  r300: {
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "1.3",
    fontFamily: regularFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  r200: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.3",
    fontFamily: regularFontFamily,
    color: "darkCharcoal",
  },
  r100: {
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1.3",
    fontFamily: regularFontFamily,
    color: "darkCharcoal",
  },
  r000: {
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 14,
    fontFamily: regularFontFamily,
    color: "darkCharcoal",
  },
  l300: {
    fontWeight: "600",
    fontSize: "1.3",
    lineHeight: "24px",
    textDecorationLine: "underline",
    fontFamily: boldFontFamily,
    color: "darkBlue",
  },
  l200: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    textDecorationLine: "underline",
    fontFamily: boldFontFamily,
    color: "darkBlue",
  },
  label: {
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "1.2",
    fontFamily: mediumFontFamily,
    color: "darkBlue",
  },
  defaultTextInput: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: "1.2",
    fontFamily: regularFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  alertTitle: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: robotoFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  alertBody: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: regularFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  alertText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    fontFamily: robotoFontFamily,
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--midnightBlue"
    ),
  },
  alertButton: {
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 24,
    fontFamily: robotoFontFamily,
    color: "veryLightBlue",
  },
  alertButtonIOS: {
    fontWeight: "300",
    fontSize: 17,
    lineHeight: 24,
    color: "iOSAlertBtnColor",
  },
};
export default textVariants;
