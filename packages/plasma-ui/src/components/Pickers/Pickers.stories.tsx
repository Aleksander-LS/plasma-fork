import React from 'react';
import styled from 'styled-components';
import { Story, Meta, addDecorator } from '@storybook/react';
import { withPerformance, PublicInteractionTask, InteractionTaskArgs } from 'storybook-addon-performance';
import type { SnapType } from '@salutejs/plasma-core';
import { waitFor } from '@testing-library/dom';

import { isSberBox } from '../../utils';
import { disableProps } from '../../helpers';

import { DatePicker, TimePicker, DatePickerProps, TimePickerProps } from '.';

addDecorator(withPerformance);

const StyledWrapper = styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(2, max-content);
    align-items: center;
`;

const isSberbox = isSberBox();
const snapTypes = ['mandatory', 'proximity'] as SnapType[];

const parseDateTime = (dateTime: string) => {
    const [date, time] = dateTime.split(' ');
    const dated = date.split('.').map(Number);
    const timed = time.split(':').map(Number);

    return new Date(dated[2], dated[1] - 1, dated[0], timed[0], timed[1], timed[2]);
};

const propsToDisable = ['initialValue', 'minDate', 'maxDate'];

function isSelected(element: HTMLElement) {
    return () => {
        const ariaSelected = element.getAttribute('tabindex');
        if (ariaSelected === '0') {
            return Promise.resolve();
        }
        return Promise.reject();
    };
}

const interactionTasksDatePicker: PublicInteractionTask[] = [
    {
        name: 'Change value',
        run: async ({ container }: InteractionTaskArgs): Promise<void> => {
            const testingElements = container.querySelector('#picker-month');

            if (testingElements === null) {
                throw new Error('');
            }

            const selected = testingElements.querySelector('div[tabindex="0"]');

            if (selected === null) {
                throw new Error('');
            }

            const { nextSibling, previousSibling } = selected;
            let testingElement = nextSibling;
            let button = testingElements.querySelector<HTMLElement>('[data-placement="bottom"]');

            if (nextSibling instanceof HTMLElement && nextSibling.getAttribute('aria-hidden') === 'true') {
                testingElement = previousSibling;
                button = testingElements.querySelector<HTMLElement>('[data-placement="top"]');
            }

            if (button && testingElement) {
                button.click();
                await waitFor(isSelected(testingElement as HTMLElement));
            } else {
                throw new Error('');
            }
        },
    },
];

const interactionTasksTimePicker: PublicInteractionTask[] = [
    {
        name: 'Change value',
        run: async ({ container }: InteractionTaskArgs): Promise<void> => {
            const testingElements = container.querySelector('#picker-minutes');

            if (testingElements === null) {
                throw new Error('');
            }

            const selected = testingElements.querySelector('div[tabindex="0"]');

            if (selected === null) {
                throw new Error('');
            }

            const { nextSibling, previousSibling } = selected;
            let testingElement = nextSibling;
            let button = testingElements.querySelector<HTMLElement>('[data-placement="bottom"]');

            if (nextSibling instanceof HTMLElement && nextSibling.getAttribute('aria-hidden') === 'true') {
                testingElement = previousSibling;
                button = testingElements.querySelector<HTMLElement>('[data-placement="top"]');
            }

            if (button && testingElement) {
                button.click();
                await waitFor(isSelected(testingElement as HTMLElement));
            } else {
                throw new Error('');
            }
        },
    },
];

export default {
    title: 'Controls/Pickers',
    argTypes: {
        ...disableProps(propsToDisable),
    },
} as Meta;

interface DefaultStoryProps extends DatePickerProps {
    initialValue: string;
    minDate: string;
    maxDate: string;
    DatePickerSize: string;
    TimePickerSize: string;
    TimePickerStep: number;
    DatePickerVisibleItems: number;
    TimePickerVisibleItems: number;
    DatePickerNativeControl: boolean;
    TimePickerNativeControl: boolean;
    optionsYears: boolean;
    optionsMonths: boolean;
    optionsDays: boolean;
    optionsShortMonthName: boolean;
    optionsHours: boolean;
    optionsMinutes: boolean;
    optionsSeconds: boolean;
}

export const Default: Story<DefaultStoryProps> = (args) => {
    const [value, setValue] = React.useState(parseDateTime(args.initialValue));
    const min = React.useMemo(() => parseDateTime(args.minDate), [args.minDate]);
    const max = React.useMemo(() => parseDateTime(args.maxDate), [args.maxDate]);
    const years = args.optionsYears;
    const months = args.optionsMonths;
    const days = args.optionsDays;
    const shortMonthName = args.optionsShortMonthName;
    const hours = args.optionsHours;
    const minutes = args.optionsMinutes;
    const seconds = args.optionsSeconds;
    const dateOptions = React.useMemo(
        () => ({
            years,
            months,
            days,
            shortMonthName,
        }),
        [years, months, days, shortMonthName],
    );
    const timeOptions = React.useMemo(
        () => ({
            hours,
            minutes,
            seconds,
        }),
        [hours, minutes, seconds],
    );

    return (
        <StyledWrapper>
            <DatePicker
                key={`date-${args.DatePickerSize}-${args.DatePickerVisibleItems}`}
                id="datepicker"
                value={value}
                min={min}
                max={max}
                size={args.DatePickerSize as 's'}
                visibleItems={args.DatePickerVisibleItems as 3}
                scrollSnapType={args.scrollSnapType}
                options={dateOptions}
                disabled={args.disabled}
                controls={args.controls}
                autofocus={args.autofocus}
                onChange={setValue}
                enableNativeControl={args.DatePickerNativeControl}
                daysAriaLabel="день"
                monthsAriaLabel="месяц"
                yearsAriaLabel="год"
            />
            <TimePicker
                key={`time-${args.TimePickerSize}-${args.TimePickerVisibleItems}`}
                id="timepicker"
                value={value}
                min={min}
                max={max}
                step={args.TimePickerStep}
                size={args.TimePickerSize as 's'}
                visibleItems={args.TimePickerVisibleItems as 3}
                scrollSnapType={args.scrollSnapType}
                options={timeOptions}
                disabled={args.disabled}
                controls={args.controls}
                onChange={setValue}
                enableNativeControl={args.TimePickerNativeControl}
                secondsAriaLabel="секунды"
                minutesAriaLabel="минуты"
                hoursAriaLabel="часы"
            />
        </StyledWrapper>
    );
};

Default.args = {
    initialValue: '01.09.1980 00:28:59',
    minDate: '01.01.1975 01:15:29',
    maxDate: '31.12.1985 12:45:50',
    optionsYears: true,
    optionsMonths: true,
    optionsDays: true,
    optionsShortMonthName: false,
    optionsHours: true,
    optionsMinutes: true,
    optionsSeconds: true,
    disabled: false,
    controls: isSberbox,
    autofocus: true,
    scrollSnapType: isSberbox ? 'none' : 'mandatory',
    DatePickerSize: 's',
    DatePickerVisibleItems: 3,
    TimePickerSize: 's',
    TimePickerStep: 1,
    TimePickerVisibleItems: 5,
    DatePickerNativeControl: false,
    TimePickerNativeControl: false,
};

Default.argTypes = {
    DatePickerSize: {
        control: {
            type: 'inline-radio',
            options: ['l', 's', 'xs'],
        },
    },
    TimePickerSize: {
        control: {
            type: 'inline-radio',
            options: ['l', 's', 'xs'],
        },
    },
    DatePickerVisibleItems: {
        control: {
            type: 'inline-radio',
            options: [3, 5],
        },
    },
    TimePickerVisibleItems: {
        control: {
            type: 'inline-radio',
            options: [3, 5],
        },
    },
    scrollSnapType: {
        control: {
            type: 'select',
            options: snapTypes,
        },
    },
};

interface DatePickerStoryProps extends DatePickerProps {
    initialValue: string;
    minDate: string;
    maxDate: string;
    optionsYears: boolean;
    optionsMonths: boolean;
    optionsDays: boolean;
    optionsShortMonthName: boolean;
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const Date_Picker: Story<DatePickerStoryProps> = ({
    initialValue,
    minDate,
    maxDate,
    optionsYears,
    optionsMonths,
    optionsDays,
    optionsShortMonthName,
    ...rest
}) => {
    const [value, setValue] = React.useState(parseDateTime(initialValue));
    const min = React.useMemo(() => parseDateTime(minDate), [minDate]);
    const max = React.useMemo(() => parseDateTime(maxDate), [maxDate]);
    const years = optionsYears;
    const months = optionsMonths;
    const days = optionsDays;
    const shortMonthName = optionsShortMonthName;

    const options = React.useMemo(
        () => ({
            years,
            months,
            days,
            shortMonthName,
        }),
        [years, months, days, shortMonthName],
    );

    return (
        <DatePicker
            key={`${rest.size}-${rest.visibleItems}`}
            id="picker"
            value={value}
            min={min}
            max={max}
            options={options}
            onChange={setValue}
            daysAriaLabel="день"
            monthsAriaLabel="месяц"
            yearsAriaLabel="год"
            {...rest}
        />
    );
};

// eslint-disable-next-line @typescript-eslint/camelcase
Date_Picker.parameters = {
    performance: {
        interactions: interactionTasksDatePicker,
        allowedGroups: ['client'],
        disable: false,
    },
};

// eslint-disable-next-line @typescript-eslint/camelcase
Date_Picker.args = {
    initialValue: '01.09.1980 00:28:59',
    minDate: '01.02.1975 01:15:29',
    maxDate: '30.11.1985 12:45:50',
    optionsYears: true,
    optionsMonths: true,
    optionsDays: true,
    optionsShortMonthName: false,
    disabled: false,
    controls: true,
    autofocus: true,
    scrollSnapType: isSberbox ? 'none' : 'mandatory',
    size: 's',
    visibleItems: 5,
    infiniteScroll: true,
};

// eslint-disable-next-line @typescript-eslint/camelcase
Date_Picker.argTypes = {
    size: {
        control: {
            type: 'inline-radio',
            options: ['l', 's', 'xs'],
        },
    },
    visibleItems: {
        control: {
            type: 'inline-radio',
            options: [3, 5],
        },
    },
    scrollSnapType: {
        control: {
            type: 'select',
            options: snapTypes,
        },
    },
};

interface TimePickerStoryProps extends TimePickerProps {
    initialValue: string;
    minDate: string;
    maxDate: string;
    optionsHours: boolean;
    optionsMinutes: boolean;
    optionsSeconds: boolean;
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const Time_Picker: Story<TimePickerStoryProps> = ({
    initialValue,
    minDate,
    maxDate,
    optionsHours,
    optionsMinutes,
    optionsSeconds,
    ...rest
}) => {
    const [value, setValue] = React.useState(parseDateTime(initialValue));
    const min = React.useMemo(() => parseDateTime(minDate), [minDate]);
    const max = React.useMemo(() => parseDateTime(maxDate), [maxDate]);
    const hours = optionsHours;
    const minutes = optionsMinutes;
    const seconds = optionsSeconds;

    const options = React.useMemo(
        () => ({
            hours,
            minutes,
            seconds,
        }),
        [hours, minutes, seconds],
    );

    return (
        <TimePicker
            key={`${rest.size}-${rest.visibleItems}`}
            id="picker"
            value={value}
            min={min}
            max={max}
            options={options}
            onChange={setValue}
            secondsAriaLabel="секунды"
            minutesAriaLabel="минуты"
            hoursAriaLabel="часы"
            {...rest}
        />
    );
};

// eslint-disable-next-line @typescript-eslint/camelcase
Time_Picker.parameters = {
    performance: {
        interactions: interactionTasksTimePicker,
        allowedGroups: ['client'],
        disable: false,
    },
};
// eslint-disable-next-line @typescript-eslint/camelcase
Time_Picker.args = {
    initialValue: '01.09.1980 00:28:59',
    minDate: '01.09.1980 00:15:29',
    maxDate: '01.09.1980 12:30:30',
    optionsHours: true,
    optionsMinutes: true,
    optionsSeconds: true,
    disabled: false,
    controls: true,
    autofocus: true,
    scrollSnapType: isSberbox ? 'none' : 'mandatory',
    size: 'l',
    visibleItems: 3,
    step: 1,
    infiniteScroll: true,
};

// eslint-disable-next-line @typescript-eslint/camelcase
Time_Picker.argTypes = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    ...Date_Picker.argTypes,
    size: {
        control: {
            type: 'inline-radio',
            options: ['l', 's', 'xs'],
        },
    },
};
