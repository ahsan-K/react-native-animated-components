import React, { useEffect } from 'react';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, } from 'react-native-reanimated';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, FlatList, } from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const DrawerNavigation = ({ navigationOptions, Page }) => {
    const animatedHeight = useSharedValue(HEIGHT);
    const animatedWidth = useSharedValue(WIDTH);
    const animatedRadius = useSharedValue(100);
    const animateMargin = useSharedValue(0);
    useEffect(() => {
        animatedWidth.value = withTiming(WIDTH);
        animatedHeight.value = withTiming(HEIGHT);
        animatedRadius.value = withTiming(0);
        animateMargin.value = withTiming(0);
    }, []);
    const onPress = () => {
        if (animatedWidth.value === WIDTH / 2.5) {
            animatedWidth.value = withTiming(WIDTH);
            animatedRadius.value = withTiming(0);
            animatedHeight.value = withTiming(HEIGHT);
            animateMargin.value = withTiming(0);
        }
        else {
            animatedWidth.value = withTiming(WIDTH / 2.5);
            animatedRadius.value = withTiming(20);
            animatedHeight.value = withTiming(HEIGHT - 100);
            animateMargin.value = withTiming(40);
        }
    };
    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: animatedWidth.value,
            borderTopLeftRadius: animatedRadius.value,
            borderBottomLeftRadius: animatedRadius.value,
            overflow: 'hidden',
            height: animatedHeight.value,
            marginVertical: animateMargin.value,
            alignSelf: 'flex-end',
            position: 'absolute',
        };
    });
    const renderItem = ({ item, index }) => {
        if (item === null || item === void 0 ? void 0 : item.component) {
            return <React.Fragment key={index}>{item.component}</React.Fragment>;
        }
        return (<TouchableOpacity style={styles.itemContainer} key={index} onPress={item === null || item === void 0 ? void 0 : item.onPress}>
                {item === null || item === void 0 ? void 0 : item.icon}
                <Text style={styles.navOptionsStyles}>{item === null || item === void 0 ? void 0 : item.title}</Text>
            </TouchableOpacity>);
    };
    return (<View>
            <FlatList keyExtractor={(_, index) => index.toString()} data={navigationOptions} renderItem={renderItem}/>
            <Animated.View style={animatedStyles}>
                <Page onPress={onPress}/>
            </Animated.View>
        </View>);
};
const styles = StyleSheet.create({
    navOptionsStyles: {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginStart: 20,
    },
    itemContainer: {
        flexDirection: 'row',
    },
});
export default DrawerNavigation;
