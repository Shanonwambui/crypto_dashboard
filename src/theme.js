import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens

export const tokens = (mode) => ({
...(mode === "dark" 
    ? {
        grey: {
            100: "#e0e0e0",
            200: "#c2c2c2",
            300: "#a3a3a3",
            400: "#858585",
            500: "#666666",
            600: "#525252",
            700: "#3d3d3d",
            800: "#292929",
            900: "#e0e0e0"
        },
        primary: {
            100: "#d0d1d5",
            200: "#a1a4ab",
            300: "#727681",
            400: "#292929",
            500: "#121212",
            600: "#101624",
            700: "#0c101b",
            800: "#3f434f",
            900: "#040509"
        },
        greenAccent: {
            100: "#dbf5ee",
            200: "#b7ebde",
            300: "#94e2cd",
            400: "#43D1A7",
            500: "#32a852",
            600: "#3da58a",
            700: "#2e7c67",
            800: "#1e5245",
            900: "#0f2922"
        },
        redAccent: {
            100: "#f8dcdb",
            200: "#f1b9b7",
            300: "#e99592",
            400: "#F55A7F",
            500: "#ED2939",
            600: "#af3f3b",
            700: "#832f2c",
            800: "#58201e",
            900: "#2c100f"
        },
        blueAccent: {
            100: "#e1e2fe",
            200: "#c3c6fd",
            300: "#a4a9fc",
            400: "#845ADF",
            500: "#6870fa",
            600: "#535ac8",
            700: "#455DDC",
            800: "#2a2d64",
            900: "#151632"
        },

    }
    : {
        grey: {
            100: "#141414",
            200: "#292929",
            300: "#3d3d3d",
            400: "#525252",
            500: "#666666",
            600: "#858585",
            700: "#c5c5c5",
            800: "#c2c2c2",
            900: "#525252",
        },
        primary: {
            100: "#040509",
            200: "#080b12",
            300: "#0c101b",
            400: "#f2f0f0",
            500: "#DDDDDD",
            600: "#434957",
            700: "#727681",
            800: "#a1a4ab",
            900: "#d0d1d5",
        },
        greenAccent: {
            100: "#0f2922",
            200: "#1e5245",
            300: "#2e7c67",
            400: "#43D1A7",
            500: "#20c997",
            600: "#70d8bd",
            700: "#94e2cd",
            800: "#b7ebde",
            900: "#dbf5ee",
        },
        redAccent: {
            100: "#2c100f",
            200: "#58201e",
            300: "#832f2c",
            400: "#F55A7F",
            500: "#db4f4a",
            600: "#e2726e",
            700: "#e99592",
            800: "#f1b9b7",
            900: "#f8dcdb",
        },
        blueAccent: {
            100: "#151632",
            200: "#2a2d64",
            300: "#3e4396",
            400: "#A55CF5",
            500: "#6870fa",
            600: "#868dfb",
            700: "#141414",
            800: "#c3c6fd",
            900: "#e1e2fe",
        },

    }
    
    ),
});
// mui theme settings
export const themeSettings =(mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === "dark" 
            ? {
                // palette values for dark mode
                primary: {
                    main: colors.primary[500],
                },
                secondary: {
                    main: colors.greenAccent[700],
                },
                neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100],
                },
                background: {
                    default: colors.primary[500],
                }
            }
            : {
                primary: {
                    main: colors.primary[100],
                },
                secondary: {
                    main: colors.greenAccent[500],
                },
                neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100]
                },
                background: {
                    default: "#DDDDDD",
                },

            }),

        },
        typography: {
            fontFamily: ["Source Sans 3", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 40,

            },
            h2: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 32,

            },
            h3: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 24,

            },
            h4: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 20,

            },
            h5: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 16,

            },
            h6: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 14,

            },
            

        },
    };
};


// context for color mode
export const ColorModeContext = createContext ({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        ()=> ({
            toggleColorMode: ()=>
            setMode((prev)=> (prev === "light" ? "dark": "light")),

        }),
        []
    );

    const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);

    return[theme, colorMode];

};