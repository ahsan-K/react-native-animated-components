import React, { useEffect } from 'react';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    FlatList,
    ListRenderItem,
} from 'react-native';

// Define the props for each navigation option
interface NavigationOption {
    title: string;
    onPress: () => void;
    icon?: React.ReactNode;
    component?: React.ReactNode;
}

// Define the component props
interface DrawerNavigationProps {
    navigationOptions: NavigationOption[];
    Page: React.ComponentType<{ onPress: () => void }>;
    flatListStyle?: object;
    animatedViewStyle?: object;
    itemContainerStyle?: object;
    itemTextStyle?: object;
    direction?: 'right' | 'left'
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const DrawerNavigation: React.FC<DrawerNavigationProps> = ({
    navigationOptions,
    Page,
    flatListStyle,
    animatedViewStyle,
    itemContainerStyle,
    itemTextStyle,
    direction = 'right'
}) => {
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
        } else {
            animatedWidth.value = withTiming(WIDTH / 2.5);
            animatedRadius.value = withTiming(20);
            animatedHeight.value = withTiming(HEIGHT - 100);
            animateMargin.value = withTiming(40);
        }
    };

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: animatedWidth.value,
            borderTopLeftRadius: direction === "right" ? animatedRadius.value : 0,
            borderBottomLeftRadius: direction === "right" ? animatedRadius.value : 0,
            borderTopRightRadius: direction === "left" ? animatedRadius.value : 0,
            borderBottomRightRadius: direction === "left" ? animatedRadius.value : 0,
            overflow: 'hidden',
            height: animatedHeight.value,
            marginVertical: animateMargin.value,
            alignSelf: direction === "right" ? 'flex-end' : 'flex-start',
            position: 'absolute',
        };
    });

    const renderItem: ListRenderItem<NavigationOption> = ({ item, index }) => {
        if (item?.component) {
            return <React.Fragment key={index}>{item.component}</React.Fragment>;
        }

        return (
            <TouchableOpacity
                style={[styles.itemContainer, { justifyContent: direction === "left" ? "flex-end" : "flex-end" }, itemContainerStyle]}
                key={index}
                onPress={item?.onPress}
            >
                {item?.icon}
                <Text style={[styles.navOptionsStyles, itemTextStyle]}>{item?.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={navigationOptions}
                renderItem={renderItem}
                contentContainerStyle={flatListStyle}
            />
            <Animated.View style={[animatedStyles, animatedViewStyle]}>
                <Page onPress={onPress} />
            </Animated.View>
        </View>
    );
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
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
});

export default DrawerNavigation;
