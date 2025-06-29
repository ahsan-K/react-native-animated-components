import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    UIManager,
    LayoutAnimation,
    Platform,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ContextType = {
    startX: number;
};

type CarouselProps<T> = {
    data: T[];
    CARD_WIDTH: number;
    CARD_HEIGHT: number;
    SWIPE_THRESHOLD: number;
    renderCard: (item: T, index: number) => React.ReactElement;
    onIndexChange?: (index: number) => void; // ✅ NEW
};

function Carousel<T>({
    data,
    CARD_WIDTH,
    CARD_HEIGHT,
    SWIPE_THRESHOLD,
    renderCard,
    onIndexChange
}: CarouselProps<T>) {

    const [cards, setCards] = useState<T[]>(data);
    const translateX = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (
            Platform.OS === 'android' &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);

    const reorderNext = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCards(prev => {
            const updated = [...prev];
            const first = updated.shift();
            if (first) updated.push(first);
            return updated;
        });
        setCurrentIndex(prev => {
            const newIndex = (prev + 1) % data.length;
            onIndexChange?.(newIndex); // ✅ Notify parent
            return newIndex;
        });
        translateX.value = 0;

    };

    const reorderPrevious = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCards(prev => {
            const updated = [...prev];
            const last = updated.pop();
            if (last) updated.unshift(last);
            return updated;
        });
        setCurrentIndex(prev => {
            const newIndex = (prev - 1 + data.length) % data.length;
            onIndexChange?.(newIndex); // ✅ Notify parent
            return newIndex;
        });
        translateX.value = 0;
    };

    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        ContextType
    >({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX;
        },
        onEnd: (event) => {
            if (event.translationX < -SWIPE_THRESHOLD) {
                translateX.value = withTiming(-SCREEN_WIDTH, {}, (finished) => {
                    if (finished) runOnJS(reorderNext)();
                });
            } else if (event.translationX > SWIPE_THRESHOLD) {
                translateX.value = withTiming(SCREEN_WIDTH, {}, (finished) => {
                    if (finished) runOnJS(reorderPrevious)();
                });
            } else {
                translateX.value = withTiming(0);
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={[styles.container, { height: CARD_HEIGHT + 60 }]}>
            {/* Background Cards */}
            {cards.slice(1, 3).reverse().map((item, index) => {
                const scale = 1 - (index + 1) * 0.05;
                const translateY = (index + 1) * 18;
                const zIndex = index;
                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.card,
                            {
                                width: CARD_WIDTH * scale,
                                height: CARD_HEIGHT * scale,
                                transform: [{ translateY }],
                                zIndex,
                                opacity: (100 - (index + 50)) / 200,
                            },
                        ]}
                    >
                        {renderCard(item, index + 1)}
                    </Animated.View>
                );
            })}

            {/* Top card with gesture */}
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[
                        styles.card,
                        {
                            width: CARD_WIDTH,
                            height: CARD_HEIGHT,
                            zIndex: 99,
                        },
                        animatedStyle,
                    ]}
                >
                    {renderCard(cards[0], 0)}
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'absolute',
        borderRadius: 16,
        overflow: 'hidden',
    },
});

export default Carousel;
