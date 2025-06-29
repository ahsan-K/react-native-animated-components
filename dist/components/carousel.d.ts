import React from 'react';
type CarouselProps<T> = {
    data: T[];
    CARD_WIDTH: number;
    CARD_HEIGHT: number;
    SWIPE_THRESHOLD: number;
    renderCard: (item: T, index: number) => React.ReactElement;
    onIndexChange?: (index: number) => void;
};
declare function Carousel<T>({ data, CARD_WIDTH, CARD_HEIGHT, SWIPE_THRESHOLD, renderCard, onIndexChange }: CarouselProps<T>): React.JSX.Element;
export default Carousel;
