import React, { createContext } from 'react'

export const ThemeContext = createContext()

export class ThemeContextProvider extends React.Component {
    state = {
        isLightTheme: true,
        light: {chars: '#8B008B', ui: '#ddd', bg: '#cc99ff'},
        dark: {chars: '#ddd', ui: '#333', bg: '#555'},
    }

    toggleTheme = () => {
        this.setState(
            { isLightTheme: !this.state.isLightTheme }
        )
    }
    render() {
        return(
            <ThemeContext.Provider value={{...this.state, toggleTheme: this.toggleTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}

