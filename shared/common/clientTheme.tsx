'use client';

import { Button, createTheme } from '@mantine/core';

const CLIENT_THEME = createTheme({
  components: {
    Button: Button.extend({
      vars: (_, props) => {
        if (props.size === 'xxl') {
          return {
            root: {
              '--button-height': '70px',
              '--button-padding-x': '30px',
              '--button-fz': '24px',
            },
          };
        }

        const sizeMap: Record<string, { height: string; paddingX: string }> = {
          xs: { height: '30px', paddingX: '14px' },
          sm: { height: '36px', paddingX: '18px' },
          md: { height: '42px', paddingX: '22px' },
          lg: { height: '50px', paddingX: '26px' },
          xl: { height: '60px', paddingX: '32px' },
        };

        const size = props.size || 'md';
        const sizeConfig = sizeMap[size as string] || sizeMap.md;

        return {
          root: {
            '--button-height': sizeConfig.height,
            '--button-padding-x': sizeConfig.paddingX,
          },
        };
      },
    }),
  },
});

export default CLIENT_THEME;
