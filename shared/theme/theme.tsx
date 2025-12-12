import localFont from 'next/font/local';
import {
  DEFAULT_THEME,
  MantineColorsTuple,
  colorsTuple,
  createTheme,
} from '@mantine/core';

export const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretandard',
  weight: '45 920',
});

export const hanna = localFont({
  src: '../../public/fonts/BMHANNAProOTF.otf',
  display: 'swap',
  variable: '--font-hanna',
});

const blue: MantineColorsTuple = [
  '#eaeaff',
  '#d0d0ff',
  '#9c9cfd',
  '#6665fc',
  '#3b37fb',
  '#221bfb',
  '#160dfc',
  '#0902e1',
  '#0000cd',
  '#0000b1',
];

const gray: MantineColorsTuple = [
  '#f0f5fc',
  '#e1e5eb',
  '#c5cbd5',
  '#a5aebd',
  '#8996a9',
  '#78879e',
  '#6e7f99',
  '#5d6d86',
  '#516179',
  '#42536d',
];

const red: MantineColorsTuple = [
  '#ffe2e1',
  '#ffe2e1',
  '#ffc9c8',
  '#ffc9c8',
  '#e3231f',
  '#e3231f',
  '#CD1C18',
  '#CD1C18',
  '#A41613',
  '#A41613',
];

export const THEME = createTheme({
  fontFamily: `${pretendard.style.fontFamily}, ${hanna.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  fontSizes: {
    xs: '0.75rem', //12px
    sm: '0.875rem', //14px
    md: '1rem', //16px
    lg: '1.125rem', //18px
    xl: '1.25rem', //20px
    xxl: '1.5rem', //24px
    '2xl': '1.75rem', //28px
  },
  colors: {
    black: colorsTuple('#141414'),
    white: colorsTuple('#FAFAFA'),
    blue,
    gray,
    red,
  },
  components: {
    Notification: {
      defaultProps: {
        withCloseButton: false,
        color: 'transparent',
      },
    },
    TextInput: {
      styles: {
        label: {
          fontSize: '20px', //xl
          fontWeight: 700,
        },
        wrapper: {
          width: '100%',
          height: '48px',
        },
        input: {
          height: '100%',
          fontSize: '16px', //md
          padding: '0 12px',
        },
      },
    },
    Tabs: {
      styles: {
        root: {
          width: '100%',
        },
        list: {
          display: 'flex',
          width: '100%',
        },
        tab: {
          flex: 1,
          textAlign: 'center',
        },
        tabLabel: {
          fontSize: '20px', //xl
          fontWeight: 700,
        },
        panel: {
          marginTop: '20px',
          padding: 0,
        },
      },
    },
  },
});
