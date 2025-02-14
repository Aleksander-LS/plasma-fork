import { popoverConfig } from '../../../../components/Popover';
import { component, mergeConfig } from '../../../../engines';

export type { PopoverPlacement, PopoverTrigger } from '../../../../components/Popover';

const mergedConfig = mergeConfig(popoverConfig);
const PopoverComponent = component(mergedConfig);

/**
 * Всплывающее окно.
 */
export const Popover = PopoverComponent;
