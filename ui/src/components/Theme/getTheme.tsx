import React from "react";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { green, red } from "@mui/material/colors";

function getTheme(mode: "light" | "dark") {
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: { main: green.A700 },
        error: { main: red.A200 },
        mode,
      },
      typography: {
        h1: {
          fontWeight: 900,
          fontSize: "2rem",
        },
        h2: {
          fontWeight: 900,
          fontSize: "1.25rem",
        },
        h3: {
          fontWeight: 900,
          fontSize: "1rem",
        },
        subtitle1: {
          fontSize: "0.9rem",
          opacity: 0.87,
        },
        subtitle2: {
          opacity: 0.6,
        },
        body1: {
          fontSize: "0.925rem",
        },
        body2: {
          fontSize: "0.85rem",
        },
      },
      zIndex: {
        appBar: 1400,
      },
    })
  );

  return createTheme(theme, {
    palette: {
      action: {
        hover: theme.palette.primary.main + "15",
      },
    },
    typography: {
      caption: {
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(1),
      },
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            "& > * .MuiListItem-root:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            "&.Mui-focusVisible:focus": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            "& .MuiCardActionArea-focusHighlight": {
              backgroundColor: theme.palette.primary.main,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 700,
            letterSpacing: 0,
            outline: `solid 0 transparent`,
            transition: theme.transitions.create([
              "background-color",
              "color",
              "outline",
            ]),
            "&.MuiButton-containedPrimary:hover": {
              backgroundColor: theme.palette.primary.light,
            },
            "&.Mui-focusVisible, &:active": {
              backgroundColor: theme.palette.primary.dark,
              outline: `solid 3px ${theme.palette.primary.main}`,
            },
          },
          text: {
            borderRadius: "1rem",
            padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
            border: `solid 1px transparent`,
            transition: theme.transitions.create(["color"]),
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&.Mui-focusVisible": {
              backgroundColor: theme.palette.primary.main,
              border: `solid 1px ${theme.palette.primary.dark}`,
              color: theme.palette.primary.contrastText,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: theme.palette.text.primary,
            textDecoration: "none",
            "&:hover": {
              color: theme.palette.primary.main,
            },
            "&:active": {
              color: theme.palette.primary.dark,
            },
          },
        },
      },
      MuiTabs: {
        defaultProps: {
          TabIndicatorProps: {
            children: <span className="MuiTabs-indicatorSpan" />,
          },
        },
        styleOverrides: {
          root: {
            "& .MuiTabs-flexContainerVertical .MuiTab-root": {
              marginTop: 4,
              marginBottom: 4,
            },
            minHeight: "2rem",
            "& .MuiButtonBase-root": {
              paddingLeft: 0,
              paddingRight: 0,
              textAlign: "left",
              alignItems: "flex-start",
              minWidth: "inherit",
              marginRight: theme.spacing(4),
            },
            "& .MuiTabs-indicator": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
            },
            "& .MuiTabs-flexContainerVertical + .MuiTabs-indicator .MuiTabs-indicatorSpan":
              {
                height: "1.5rem",
                width: 2,
                backgroundColor: theme.palette.primary.main,
              },
            "& .MuiTabs-flexContainer:not(.MuiTabs-flexContainerVertical) + .MuiTabs-indicator .MuiTabs-indicatorSpan":
              {
                width: "1.5rem",
                height: 2,
                backgroundColor: theme.palette.primary.main,
              },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: "2rem",
            textTransform: "none",
            "&.Mui-selected": {
              fontWeight: 700,
              backgroundColor: "transparent",
            },
            "&:hover": {
              color: theme.palette.primary.main,
            },
            "&.Mui-focusVisible": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-root": {
              fontWeight: 700,
              borderBottomColor: "divider",
            },
          },
        },
      },
      MuiFormControl: {
        defaultProps: {
          fullWidth: true,
          margin: "normal",
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: theme.typography.body2.fontSize,
            fontWeight: "bold",
            color: theme.palette.text.primary,
            transition: theme.transitions.create(["color", "opacity"]),
            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },
            "&.Mui-focused.Mui-error": {
              color: theme.palette.error.main,
            },
            "&.Mui-disabled": {
              opacity: 1 - theme.palette.action.disabledOpacity,
            },
          },
          asterisk: {
            color: theme.palette.error.main,
            fontWeight: "bold",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before, &::after": {
              display: "none",
            },
            "label + &": {
              marginTop: theme.spacing(0.5),
            },
            "& .MuiInputBase-input": {
              borderRadius: 4,
              position: "relative",
              border: `1px solid ${theme.palette.action.disabled}`,
              padding: "10px 12px",
              transition: theme.transitions.create([
                "background-color",
                "opacity",
              ]),
              "&:focus": {
                borderColor: theme.palette.primary.main,
                outline: `1px solid ${theme.palette.primary.main}`,
              },
              "&:hover:not(&:focus)": {
                borderColor: theme.palette.text.secondary,
              },
              "&.Mui-disabled": {
                opacity: 1 - theme.palette.action.disabledOpacity,
              },
            },
            "&.Mui-error .MuiInputBase-input": {
              backgroundColor: `${theme.palette.error.main}20`,
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
        },
      },
      MuiGrid: {
        defaultProps: {
          spacing: { xs: 2, md: 3 },
        },
      },
      MuiStack: {
        defaultProps: {
          direction: "row",
          spacing: 2,
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: "lg",
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            background: "none",
            boxShadow: "none",
            "&.Mui-expanded": {
              marginTop: 0,
              marginBottom: 0,
            },
            "&:before": {
              display: "none",
            },
          },
        },
        defaultProps: {
          defaultExpanded: true,
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding: 0,
            "&.Mui-expanded": {
              minHeight: 0,
            },
            minHeight: 0,
            "&:hover": {
              backgroundColor: theme.palette.grey[500] + "10",
            },
            flexDirection: "row-reverse",
            "& > *": {
              marginRight: 2,
            },
          },
          content: {
            "&.Mui-expanded": {
              marginTop: theme.spacing(1.5),
              marginBottom: theme.spacing(1.5),
            },
          },
          expandIconWrapper: {
            transform: "rotate(-90deg)",
            "&.Mui-expanded": {
              transform: "rotate(0deg)",
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { paddingTop: 0, paddingBottom: theme.spacing(3) },
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          closeText: "Fermer",
          clearText: "Vider",
          loadingText: "Chargement...",
          noOptionsText: "Aucun résultat",
          openText: "Ouvrir",
        },
        styleOverrides: {
          inputRoot: {
            "&:hover > fieldset": {
              borderColor: theme.palette.text.secondary,
            },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            "&.Mui-focusVisible": {
              outline: `solid 3px ${theme.palette.primary.main}`,
            },
            "&.MuiButtonBase-root": {
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 8,
              paddingRight: 8,
              fontSize: "0.75rem",
            },
          },
        },
      },
    },
  });
}

export default getTheme;
