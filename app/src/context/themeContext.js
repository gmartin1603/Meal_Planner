import React, { createContext } from 'react'

export const ThemeContext = createContext()

export class ThemeContextProvider extends React.Component {
    state = {
        isLightTheme: true,
        light: {chars: '#555', ui: '#ddd', bg: '#eee'},
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

