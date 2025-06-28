"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_1 = require("react-native");
const WIDTH = react_native_1.Dimensions.get('window').width;
const HEIGHT = react_native_1.Dimensions.get('window').height;
const DrawerNavigation = ({ navigationOptions, Page }) => {
    const animatedHeight = (0, react_native_reanimated_1.useSharedValue)(HEIGHT);
    const animatedWidth = (0, react_native_reanimated_1.useSharedValue)(WIDTH);
    const animatedRadius = (0, react_native_reanimated_1.useSharedValue)(100);
    const animateMargin = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        animatedWidth.value = (0, react_native_reanimated_1.withTiming)(WIDTH);
        animatedHeight.value = (0, react_native_reanimated_1.withTiming)(HEIGHT);
        animatedRadius.value = (0, react_native_reanimated_1.withTiming)(0);
        animateMargin.value = (0, react_native_reanimated_1.withTiming)(0);
    }, []);
    const onPress = () => {
        if (animatedWidth.value === WIDTH / 2.5) {
            animatedWidth.value = (0, react_native_reanimated_1.withTiming)(WIDTH);
            animatedRadius.value = (0, react_native_reanimated_1.withTiming)(0);
            animatedHeight.value = (0, react_native_reanimated_1.withTiming)(HEIGHT);
            animateMargin.value = (0, react_native_reanimated_1.withTiming)(0);
        }
        else {
            animatedWidth.value = (0, react_native_reanimated_1.withTiming)(WIDTH / 2.5);
            animatedRadius.value = (0, react_native_reanimated_1.withTiming)(20);
            animatedHeight.value = (0, react_native_reanimated_1.withTiming)(HEIGHT - 100);
            animateMargin.value = (0, react_native_reanimated_1.withTiming)(40);
        }
    };
    const animatedStyles = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
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
            return <react_1.default.Fragment key={index}>{item.component}</react_1.default.Fragment>;
        }
        return (<react_native_1.TouchableOpacity style={styles.itemContainer} key={index} onPress={item === null || item === void 0 ? void 0 : item.onPress}>
                {item === null || item === void 0 ? void 0 : item.icon}
                <react_native_1.Text style={styles.navOptionsStyles}>{item === null || item === void 0 ? void 0 : item.title}</react_native_1.Text>
            </react_native_1.TouchableOpacity>);
    };
    return (<react_native_1.View>
            <react_native_1.FlatList keyExtractor={(_, index) => index.toString()} data={navigationOptions} renderItem={renderItem}/>
            <react_native_reanimated_1.default.View style={animatedStyles}>
                <Page onPress={onPress}/>
            </react_native_reanimated_1.default.View>
        </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = DrawerNavigation;
