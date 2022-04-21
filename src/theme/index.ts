export interface Color {
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
    logo: {
      color: '#5d5d5d',
      backgroundColor: '#fff'
    }
  },
  dark: {
    logo: {
      color: '#fff',
      backgroundColor: '#2a2a2a'
    }
  }
}
