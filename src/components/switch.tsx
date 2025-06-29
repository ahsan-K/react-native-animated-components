import React, { useEffect, useState } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated';

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

const Switch: React.FC<SwitchProps> = ({
    value = false,
    onChange,
    circleStyle,
    switchTrackStyle,
    labelStyle,
    labels = { on: 'ON', off: 'OFF' }
}) => {
    const [isOn, setIsOn] = useState<boolean>(value);
    const translateX = useSharedValue(isOn ? 32 : 2);

    const toggleSwitch = () => {
        const newValue = !isOn;
        setIsOn(newValue);
        translateX.value = withTiming(newValue ? 32 : 2, { duration: 300 });
    };

    const circleAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const textAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value === 32 ? 2 : 32 }],
    }));

    useEffect(() => {
        onChange(isOn);
    }, [isOn]);

    return (
        <Pressable onPress={toggleSwitch} style={styles.container}>
            <View style={[styles.switchTrack, switchTrackStyle]}>
                <Animated.Text style={[styles.switchText, textAnimatedStyle, labelStyle]}>
                    {isOn ? labels.on : labels.off}
                </Animated.Text>
                <Animated.View style={[styles.circle, circleAnimatedStyle, circleStyle]} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    switchTrack: {
        width: 70,
        height: 32,
        backgroundColor: '#ccc',
        borderRadius: 16,
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    switchText: {
        position: 'absolute',
        fontWeight: 'bold',
        color: '#333',
        zIndex: 1,
        fontSize: 12,
        marginHorizontal: 5,
    },
    circle: {
        width: 28,
        height: 28,
        backgroundColor: '#fff',
        borderRadius: 14,
        position: 'absolute',
        top: 2,
        left: 2,
        zIndex: 2,
        elevation: 2,
    },
});

export default Switch;