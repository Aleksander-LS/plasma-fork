import { HTMLAttributes, MutableRefObject } from 'react';

import type { CalendarBaseProps } from './CalendarBase/CalendarBase';
import type { CalendarDoubleProps } from './CalendarDouble/CalendarDouble';

export enum Keys {
    pageUp = 33,
    pageDown = 34,
    home = 36,
    end = 35,
    left = 37,
    right = 39,
    up = 38,
    down = 40,
    enter = 13,
    space = 32,
}

export interface DateObject {
    day: number;
    monthIndex: number;
    year: number;
}

export interface ItemProps {
    isCurrent: boolean;
    isSelected: boolean;
}

export interface DateItem extends ItemProps {
    isDayInCurrentMonth: boolean;
    inRange?: boolean;
    date: DateObject;
    events?: EventDay[];
    disabled?: boolean;
    isOutOfMinMaxRange?: boolean;
    disabledArrowKey?: string;
    disabledMonths?: string;
}

export interface DayProps extends Partial<ItemProps> {
    isDouble?: boolean;
    isDayInCurrentMonth?: boolean;
    isHovered?: boolean;
    inRange?: boolean;
    sideInRange?: 'left' | 'right';
    disabled?: boolean;
    dayOfWeek?: boolean;
}

export interface MonthsProps extends ItemProps {}

export interface MonthsItem extends ItemProps {
    monthName: string;
    monthFullName?: string;
    monthIndex: number;
}

export interface YearsProps extends ItemProps {}

export interface YearsItem extends ItemProps {
    yearValue: number;
}

export interface EventDay {
    date: Date;
    color?: string;
}

export interface DisabledDay {
    date: Date;
}

export interface UseKeyNavigationProps {
    size: [number, number];
    isDouble?: boolean;
    onPrev: (withShift?: boolean) => void;
    onNext: (withShift?: boolean) => void;
}

export type CalendarValueType = Date | undefined | [Date | undefined, Date?];

export interface Calendar extends HTMLAttributes<HTMLDivElement> {
    /**
     * Выбранное значение.
     */
    value: CalendarValueType;
    /**
     * Состояние календаря, отвечающее за отображение.
     */
    date?: DateObject;
    /**
     * Минимальное значение даты.
     */
    min?: Date;
    /**
     * Максимальное значение даты.
     */
    max?: Date;
    /**
     * Список событий.
     */
    eventList?: EventDay[];
    /**
     * Список отключенных дней.
     */
    disabledList?: DisabledDay[];
    /**
     * Обработчик изменения значения.
     */
    onChangeValue: (value: Date) => void;
}

export type CalendarRange<T> = Omit<T, 'value' | 'onChangeValue'> & {
    /**
     * Выбранное значение.
     */
    value: [Date, Date?];
    /**
     * Обработчик изменения значения.
     */
    onChangeValue: (values: [Date, Date?]) => void;
};

export interface DaysMetaDescription {
    refs: MutableRefObject<HTMLDivElement[][]>;
    rowSize: number;
    newRowIndex: number;
    newColumnIndex: number;
    columnSize: number;
    minColumnIndex: number;
    defaultState?: number[];
}

export type KeyboardArrowKey = 'left' | 'right' | 'up' | 'down';

type BaseProps = {
    /**
     * Режим отображения: двойной или одинарный.
     */
    isDouble?: false;
    /**
     * Режим выбора: диапазон или одинарный.
     */
    isRange?: false;
    /**
     * Выбранное значение.
     */
    value: Date;
} & CalendarBaseProps;

type BaseRangeProps = {
    /**
     * Режим отображения: двойной или одинарный.
     */
    isDouble?: false;
    /**
     * Режим выбора: диапазон или одинарный.
     */
    isRange: true;
} & CalendarRange<CalendarBaseProps>;

type DoubleProps = {
    /**
     * Режим отображения: двойной или одинарный.
     */
    isDouble?: true;
    /**
     * Режим выбора: диапазон или одинарный.
     */
    isRange?: false;
    /**
     * Выбранное значение.
     */
    value: Date;
} & CalendarDoubleProps;

type DoubleRangeProps = {
    /**
     * Режим отображения: двойной или одинарный.
     */
    isDouble?: true;
    /**
     * Режим выбора: диапазон или одинарный.
     */
    isRange: true;
} & CalendarRange<CalendarDoubleProps>;

export type ComponentVariation = {
    base: React.FC<CalendarBaseProps>;
    baseRange: React.FC<CalendarRange<CalendarBaseProps>>;
    double: React.FC<CalendarDoubleProps>;
    doubleRange: React.FC<CalendarRange<CalendarDoubleProps>>;
};

export type CalendarProps = BaseProps | BaseRangeProps | DoubleProps | DoubleRangeProps;
