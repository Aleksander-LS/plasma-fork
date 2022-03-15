import styled from 'styled-components';
import { Badge as BaseBadge, BadgeProps as BaseProps, views } from '@salutejs/plasma-core';

export const badgeViews = {
    primary: views.primary,
    secondary: views.overlay,
    warning: views.warning,
};

export type BadgeView = keyof typeof badgeViews;
export interface BadgeProps extends BaseProps {
    /**
     * Вид компонента
     */
    view?: BadgeView;
}

/**
 * Небольшая бирка для ячеек и карточек.
 * Компонент может отображаться в нескольких размерах и цветах, может содержать текст и/или иконку.
 */
export const Badge = styled(BaseBadge)<BadgeProps>`
    ${({ view = 'primary' }) => badgeViews[view]};
`;
