import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
interface SwitchProps {
    value?: boolean;
    onChange: (value: boolean) => void;
    circleStyle?: StyleProp<ViewStyle>;
    switchTrackStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    labels?: {
        on: string;
        off: string;
    };
}
declare const Switch: React.FC<SwitchProps>;
export default Switch;
