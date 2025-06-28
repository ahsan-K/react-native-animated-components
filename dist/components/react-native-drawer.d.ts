import React from 'react';
interface NavigationOption {
    title: string;
    onPress: () => void;
    icon?: React.ReactNode;
    component?: React.ReactNode;
}
interface DrawerNavigationProps {
    navigationOptions: NavigationOption[];
    Page: React.ComponentType<{
        onPress: () => void;
    }>;
    flatListStyle?: object;
    animatedViewStyle?: object;
    itemContainerStyle?: object;
    itemTextStyle?: object;
    direction?: 'right' | 'left';
}
declare const DrawerNavigation: React.FC<DrawerNavigationProps>;
export default DrawerNavigation;
