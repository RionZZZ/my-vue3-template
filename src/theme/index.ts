export interface Color {
  primary: {
    color: String
  }
  logo: {
    color: string
    backgroundColor: string
  }
}

interface Style {
  light: Color
  dark: Color
}

export const style: Style = {
  light: {
    primary: {
      color: '#ff9c00'
    },
    logo: {
      color: '#5d5d5d',
      backgroundColor: '#fff'
    }
  },
  dark: {
    primary: {
      color: '#282724'
    },
    logo: {
      color: '#fff',
      backgroundColor: '#2a2a2a'
    }
  }
}
