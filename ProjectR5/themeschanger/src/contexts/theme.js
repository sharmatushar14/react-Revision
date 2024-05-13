import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    //Value that we want as default when there is no matching Provider in the tree
    themeMode: 'light',
    darkTheme: ()=>{},
    lightTheme: ()=>{}
})

export const ThemeProvider = ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext)
    //Used in most production grade codebases
}