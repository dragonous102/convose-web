const FONT_FAMILY = {
  DEFAULT: "Poppins, sans-serif",
  SECONDARY: "Gloria Hallelujah, cursive",
  EMOJI: "sans-serif",
}

export default {
  FONT: {
    LIGHT: `
      font-family: ${FONT_FAMILY.DEFAULT};;
      font-weight: 300;
    `,
    DEFAULT: `
      font-family: ${FONT_FAMILY.DEFAULT};
      font-weight: 400;
    `,
    SEMIBOLD: `
      font-family: ${FONT_FAMILY.DEFAULT};
      font-weight: 600;
    `,
    BOLD: `
      font-family: ${FONT_FAMILY.DEFAULT};
      font-weight: 700;
    `,
    EMOJI: `
      font-family: ${FONT_FAMILY.EMOJI};
    `,
    SECONDARY: `
      font-family: ${FONT_FAMILY.SECONDARY};
    `,
  },
  FONT_SIZES: {
    XXS: "11px",
    XS: "12px",
    SXS: "13px",
    SX: "14px",
    S: "15px",
    M: "16px",
    L: "18px",
    LXL: "20px",
    XL: "24px",
    XXL: "132px",
  },
  ICON_SIZES: {
    XS: "8px",
    S: "12px",
    M: "14px",
    L: "16px",
    XL: "18px",
  },
  COLORS: {
    PRIMARY: "#19aaeb",
    SECONDARY: "#f1f1f1",
    TERTIARY: "#EDF3F5",
    BACKGROUND: "#FFFFFF",
    BACKGROUND_KNOWLEDGE_LEVEL: "#B4ECFF",
    BACKGROUND_KNOWLEDGE_LEVEL_HOVER: "#1CBAF1",
    PRIMARY_HOVER: "#26C7FF",
    PRIMARY_ACTIVE: "#47D0FF",
    LIGHT: "#FFFFFF ",
    LIGHT_HOVER: "#EBF5FF",
    CALL_HOVER: "#B9B9B9",
    LIGHT_ACTIVE: "#D3EAFF",
    TEXT_BLACK: "#000000",
    TEXT_DARK: "#333333",
    TEXT_DARK_HOVER: "#666",
    TEXT_DARK_GREY: "#767676",
    TEXT_GREY: "#A8A8A8",
    HANGUP_HOVER: "#FA6E6E",
    BUTTON_DARK_GREY: "#4d4d4d",
    ADD_INTEREST_BACKGROUND: "#EFEFEF",
    MENTION_BACKGROUND: "#94C2FF",
    MENTION_BACKGROUND_ME: "#FAE8B8",
    BACKGROUND_GREY: "#EEE",
    BACKGROUND_BLACK: "#000000",
    BACKGROUND_MID_GREY: "#C3C3C3",
    BACKGROUND_INPUT_DARK: "#3D3D3D",
    BACKGROUND_PROFILE_INBOX: "#D6E4EB",
    BACKGROUND_MESSAGE_FORM_TRANSPARENT: "#ffffffee",
    BACKGROUND_TRANSPARENT: "transparent",
    COOKIE_BACKGROUND: "rgba(51, 51, 51, 0.9)",
    TOOLTIP_BACKGROUND: "rgba(80, 83, 85, 0.9);",
    MODAL_BACKGROUND: "rgba(0, 0, 0, .32)",
    MODAL_BACKGROUND_DARK: "rgba(0, 0, 0, .8)",
    ONBOARDING_BACKGROUND: "#19AAEB",
    BOX_SHADOW_ONBOARDING: "rgba(0, 0, 0, 0.2)",
    TEXT_BRIGHT: "#FFFFFF",
    ICONS: "#8C8C8C",
    CARD_PARTNER_MESSAGE_BACKGROUND: "#ededed",
    CARD_USER_MESSAGE_BACKGROUND: "#359dff",
    CARD_BACKGROUND: "#f9f9f9",
    CARD_ICONS: "#19aaeb",
    CARD_ICONS_ACTIVE: "#0CA2DB",
    USER_ACTIVE: "#12ce12",
    USER_INACTIVE: "#e8e8e8",
    WARM_GREY: "#909090",
    BRIGHT_GREY: "#BDBDBD",
    BOX_SHADOW_CARD: "rgba(0, 0, 0, .07)",
    SIGNAL: {
      SUCCESS: "#12CE12",
      WARN: "#FF5A5A",
    },
    LOGOCHARACTERS: [
      "#85CE00",
      "#F967CA",
      "#B555FF",
      "#1CBAF1",
      "#FF9F1F",
      "#FFE300",
    ],
    THEME: {
      THEME01: "#7D6AF1",
      THEME02: "#EC1F45",
      THEME03: "#19C46D",
      THEME04: "#E64626",
      THEME05: "#3BA4B4",
      THEME06: "#2E3192",
      THEME07: "#632C8D",
      THEME08: "#24AF6C",
      THEME09: "#4B0049",
      THEME10: "#523EC5",
      THEME11: "#2390FF",
      THEME12: "#39B54A",
    },
  },
  SHADOWS: {
    BOX_SHADOW_MODAL: "0 2px 40px 0 rgba(0, 0, 0, .16)",
    BOX_SHADOW_DROPDOWN: "0 2px 48px 0 rgba(0, 0, 0, 0.22)",
    BOX_SHADOW_CIRCLE_BUTTON: "0 1px 3px 0 rgba(0, 0, 0, 0.13)",
    BOX_SHADOW_INTEREST: "0px 10px 15px rgba(0, 0, 0, 0.1)",
    BOX_SHADOW_INTEREST_LABEL: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    BOX_SHADOW_CIRCLE_BUTTON_TRANSPARENT: "0 1px 3px 0 rgba(0, 0, 0, 0)",
    BOX_SHADOW_CARD_OPENED:
      "rgb(0 0 0 / 11%) 0px 6px 23px, rgb(0 0 0 / 11%) 0px 1px 4px",
    BOX_SHADOW_SUGGESTIONS_OPENED:
      "rgb(0 0 0 / 11%) 0px 6px 23px, rgb(0 0 0 / 11%) 0px 1px 4px",
    BOX_SHADOW_CARD: "rgb(136 143 143 / 24%) 0px 6px 25px",
    BOX_SHADOW_CARD_HEADER: "rgb(136 143 143 / 24%) 0px 1px 14px",
    BOX_SHADOW_CARD_HOVER: "rgb(51 187 238 / 40%) 0px 6px 25px;",
    BOX_SHADOW_CHAT_CLOSED: "rgba(0, 0, 0, 0.15) 0px 6px 25px",
    BOX_SHADOW_MENU: "0 2px 19px 3px rgba(0, 0, 0, 0.16)",
    TEXT_SHADOW_TIMESTAMP: "1px 1px rgba(0, 0, 0, 0.7)",
  },
  SPACING: {
    CHAT_CARD_PADDING: "9px",
  },
  TRANSITION: {
    EASING: "ease-in-out",
    DURATION: ".25s",
  },
}
