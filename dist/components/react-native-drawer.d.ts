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
}
declare const DrawerNavigation: React.FC<DrawerNavigationProps>;
export default DrawerNavigation;
