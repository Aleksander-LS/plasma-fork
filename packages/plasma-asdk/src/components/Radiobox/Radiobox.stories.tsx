import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SSRProvider } from '../SSRProvider';
import { InSpacingDecorator } from '../../helpers';
import { Headline4 } from '../Typography';
import { List, ListItem } from '../List';

import { Radiobox, RadioboxProps, RadioGroup } from '.';

export default {
    title: 'Controls/Radiobox',
    decorators: [InSpacingDecorator],
} as Meta;

const onChange = action('onChange');
const onFocus = action('onFocus');
const onBlur = action('onBlur');

const sizes = ['m', 's'];

const items = [
    {
        name: 'language',
        value: 'c',
        label: 'C',
        disabled: false,
        description: (
            <>
                Си (
                <a
                    href="https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B7%D1%8B%D0%BA"
                    aria-label="английский"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    англ.
                </a>{' '}
                C) — компилируемый статически типизированный язык программирования общего назначения.
            </>
        ),
    },
    { name: 'language', value: 'cpp', label: 'C++', disabled: false },
    { name: 'language', value: 'assembly', label: 'Assembly', disabled: false },
    { name: 'language', value: 'elixir', label: 'Elixir', disabled: true },
];

export const Live = (props) => {
    const [value, setValue] = React.useState('c');

    return (
        <SSRProvider>
            <RadioGroup aria-labelledby="example-radiogroup-title">
                <Headline4 id="example-radiogroup-title" mb="8x">
                    Выберите язык программирования
                </Headline4>
                <List>
                    {items.map((item) => (
                        <ListItem key={item.value} mb="4x">
                            <Radiobox
                                key={item.value}
                                name={item.name}
                                value={item.value}
                                label={item.label}
                                disabled={item.disabled}
                                checked={value === item.value}
                                description={item.description}
                                onChange={(event) => {
                                    event.persist();

                                    setValue(item.value);
                                    onChange(event);
                                }}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                {...props}
                            />
                        </ListItem>
                    ))}
                </List>
            </RadioGroup>
        </SSRProvider>
    );
};

Live.argTypes = {
    size: {
        options: sizes,
        control: {
            type: 'inline-radio',
        },
    },
};

Live.args = {
    size: 'm',
    view: 'accent',
    singleLine: false,
    focused: true,
};

export const Default: ComponentStory<RadioboxProps> = ({ name, label, description, disabled, singleLine, size }) => {
    const value = 0;
    const [checked, setChecked] = React.useState(true);

    return (
        <SSRProvider>
            <Radiobox
                name={name}
                value={value}
                label={label}
                description={description}
                disabled={disabled}
                checked={checked}
                singleLine={singleLine}
                size={size}
                onChange={(event) => {
                    event.persist();

                    setChecked(event.target.checked);
                    onChange(event);
                }}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </SSRProvider>
    );
};

Default.argTypes = {
    size: {
        options: sizes,
        control: {
            type: 'inline-radio',
        },
    },
};

Default.args = {
    name: 'Radiobox',
    label: 'Label',
    description: 'Description',
    disabled: false,
    singleLine: false,
    size: 'm',
};
