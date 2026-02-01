'use client';

import { Button, createTheme } from '@mantine/core';

const CLIENT_THEME = createTheme({
  components: {
    Button: Button.extend({
      vars: (_, props) => {
        let sizeVars = {};

        if (props.size === 'xxl') {
          sizeVars = {
            '--button-height': '70px',
            '--button-padding-x': '30px',
            '--button-fz': '24px',
          };
        } else {
          const sizeMap: Record<string, { height: string; paddingX: string }> =
            {
              xs: { height: '30px', paddingX: '14px' },
              sm: { height: '36px', paddingX: '18px' },
              md: { height: '42px', paddingX: '22px' },
              lg: { height: '50px', paddingX: '26px' },
              xl: { height: '60px', paddingX: '32px' },
            };

          const size = props.size || 'md';
          const sizeConfig = sizeMap[size as string] || sizeMap.md;

          sizeVars = {
            '--button-height': sizeConfig.height,
            '--button-padding-x': sizeConfig.paddingX,
          };
        }

        const variantVars =
          props.variant === 'filled'
            ? {
                '--button-bg':
                  'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
                '--button-color':
                  'light-dark(var(--mantine-color-white), var(--mantine-color-black))',
                '--button-hover':
                  'light-dark(var(--mantine-color-gray-9), var(--mantine-color-gray-1))',
              }
            : {};

        return {
          root: {
            ...sizeVars,
            ...variantVars,
          },
        };
      },
    }),
  },
});

export default CLIENT_THEME;
