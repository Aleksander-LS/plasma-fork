import React, { FC } from 'react';
import { StorybookLink as BaseLink } from '@salutejs/plasma-docs-ui';

const storyLinks = {
    Card: 'card--default',
    Cart: 'cart-cart--default',
    Grid: 'grid--default',
    Product: 'product-product--default',
    StateLayout: 'statelayout--success',
    Gallery: 'gallery--multi-gallery',
};

export const StorybookLink: FC<{ name: keyof typeof storyLinks }> = ({ name }) => {
    return <BaseLink link={`https://plasma.sberdevices.ru/temple-storybook/?path=/story/${storyLinks[name]}`} />;
};
