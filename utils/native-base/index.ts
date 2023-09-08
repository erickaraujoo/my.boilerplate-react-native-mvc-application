import { extendTheme } from 'native-base';

export const nativeBaseCustomTheme = extendTheme({
  colors: {
    local: {
      black: '#000000',
      blue: {
        intense: '#005CA9',
        mid: '#0085FF'
      },
      green: {
        mid: '#189D3E'
      },
      grey: {
        100: '#F3F3F3',
        150: '#F3F5F9',
        200: '#E8E8E8',
        250: '#DFDFDF',
        300: '#D0D7DE',
        350: '#C4C4C4',
        50: '#FBFBFB',
        500: '#818181',
        550: '#707070',
        600: '#5D5D5D',
        700: '#313136',
        800: '#1D1D20',
        900: '#151519'
      },
      red: {
        light: '#FF5472',
        mid: '#CE3036',
        superLight: '#FFF1F1',
        veryLight: '#FFE5E5'
      },
      white: '#FFFFFF'
    }
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'solid'
      },
      variants: {
        ghost: {
          _pressed: {
            bg: 'local.grey.100'
          },
          _spinner: {
            color: 'local.blue.mid'
          },
          _text: {
            _android: {
              fontSize: '14px'
            },
            _ios: {
              fontSize: '14px'
            },
            color: 'local.blue.mid',
            fontFamily: 'PoppinsMedium'
          },
          borderColor: 'local.blue.mid',
          borderWidth: '1',
          paddingBottom: '11px',
          paddingTop: '11px',
          rounded: 'full'
        },
        solid: {
          _pressed: {
            bg: 'local.blue.intense'
          },
          _spinner: {
            color: 'local.white'
          },
          _text: {
            _android: {
              fontSize: '14px'
            },
            _ios: {
              fontSize: '14px'
            },
            color: 'local.white',
            fontFamily: 'PoppinsMedium'
          },
          bg: 'local.blue.mid',
          isLoadingText: 'Carregando',
          paddingBottom: '12px',
          paddingTop: '12px',
          rounded: 'full'
        }
      }
    },
    Checkbox: {
      baseStyle: () => ({
        _checked: {
          backgroundColor: 'local.blue.mid',
          borderColor: 'local.blue.mid'
        },
        _pressed: {
          borderColor: 'local.blue.mid'
        },
        _text: {
          ml: '0px'
        },
        borderColor: 'local.grey.900'
      }),
      defaultProps: {
        rounded: '4px'
      }
    },
    FAB: {
      defaultProps: {
        renderInPortal: false,
        variant: 'solid'
      },
      variants: {
        solid: {
          _icon: {
            color: 'local.white',
            size: '20px'
          },
          _pressed: {
            bg: 'local.blue.intense'
          },
          _spinner: {
            color: 'local.white'
          },
          _text: {
            _android: {
              fontSize: '16px'
            },
            _ios: {
              fontSize: '16px'
            },
            color: 'local.white',
            fontFamily: 'PoppinsMedium'
          },
          bg: 'local.blue.mid',
          bottom: '16px',
          isLoadingText: 'Carregando',
          paddingBottom: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '16px',
          position: 'absolute',
          right: '20px',
          rounded: 'full'
        }
      }
    },
    FormControlLabel: {
      baseStyle: () => ({
        _text: {
          color: 'local.grey.900'
        },
        mb: '8px'
      })
    },
    Heading: {
      baseStyle: () => ({
        color: 'local.blue.mid'
      })
    },
    Icon: {
      baseStyle: () => ({
        color: 'local.grey.900'
      }),
      defaultProps: {
        size: '20px'
      }
    },
    Input: {
      baseStyle: () => ({
        fontFamily: 'PoppinsLight',
        theme: 'outline'
      }),
      defaultProps: { variant: 'outline' },
      variants: {
        outline: {
          _focus: {
            backgroundColor: 'white',
            borderColor: 'local.blue.mid',
            cursorColor: '#0085FF',
            selectionColor: '#0085FF'
          },
          _input: {
            cursorColor: '#0085FF',
            fontSize: '14px',
            selectionColor: '#0085FF'
          }
        }
      }
    },
    Radio: {
      baseStyle: () => ({
        _checked: {
          _icon: { color: 'local.blue.mid', size: '8px' },
          borderColor: 'local.blue.mid'
        },
        _text: {
          fontFamily: 'PoppinsLight',
          fontSize: '14px'
        },
        borderColor: 'local.grey.900',
        borderWidth: '1.5px'
      }),
      defaultProps: {
        size: '16px'
      }
    },
    Select: {
      baseStyle: () => ({
        _actionSheetContent: {
          maxHeight: '300px',
          paddingLeft: '0px',
          paddingRight: '0px'
        },
        _item: {
          _pressed: {
            backgroundColor: 'local.grey.250'
          },
          _text: {
            fontSize: '14px'
          }
        },
        _selectedItem: {
          _text: { color: 'local.white' },
          backgroundColor: 'local.blue.mid'
        }
      })
    },
    Text: {
      baseStyle: () => ({
        color: 'local.grey.900',
        fontSize: '14px'
      })
    }
  },
  fonts: {
    body: 'PoppinsRegular'
  }
});
