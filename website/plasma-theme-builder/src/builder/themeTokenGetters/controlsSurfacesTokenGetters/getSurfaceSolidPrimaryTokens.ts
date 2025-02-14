import type { TokensByType, ThemeConfig } from '@salutejs/plasma-tokens-utils';

const comment: Record<keyof TokensByType, string> = {
    default: 'Основной непрозрачный фон поверхности/контрола',
    onDark: 'Основной непрозрачный фон поверхности/контрола на темном фоне',
    onLight: 'Основной непрозрачный фон поверхности/контрола на светлом фоне',
    inverse: 'Инвертированный основной непрозрачный фон поверхности/контрола',
};

export const getSurfaceSolidPrimaryTokens = (config: ThemeConfig) => {
    const darkValue = `[general.${config.grayscale.dark}.${950}]`;
    const lightValue = `[general.${config.grayscale.light}.${100}]`;

    return {
        dark: {
            default: {
                value: darkValue,
                comment: comment.default,
            },
            onDark: {
                value: darkValue,
                comment: comment.onDark,
            },
            onLight: {
                value: lightValue,
                comment: comment.onLight,
            },
            inverse: {
                value: lightValue,
                comment: comment.inverse,
            },
        },
        light: {
            default: {
                value: lightValue,
                comment: comment.default,
            },
            onDark: {
                value: darkValue,
                comment: comment.onDark,
            },
            onLight: {
                value: lightValue,
                comment: comment.onLight,
            },
            inverse: {
                value: darkValue,
                comment: comment.inverse,
            },
        },
    };
};
