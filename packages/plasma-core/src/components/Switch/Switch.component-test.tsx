import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@salutejs/plasma-cy-utils';

describe('plasma-core: Switch', () => {
    const Switch = getComponent('Switch');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Switch label="Переключатель" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
