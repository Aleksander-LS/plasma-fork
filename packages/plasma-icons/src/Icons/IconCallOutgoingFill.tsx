import React from 'react';

import { CallOutgoingFill } from '../Icon.assets/CallOutgoingFill';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCallOutgoingFill: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CallOutgoingFill} />;
};
