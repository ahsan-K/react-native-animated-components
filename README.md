# 📦 Animated Drawer Navigation

This package provides animated React Native components with smooth transitions and flexible customizations.  
Currently, it includes a fully customizable **animated drawer navigation page**.

---

## ✨ Features

- 📱 Animated drawer with smooth transitions using `react-native-reanimated`.
- 🎨 Custom styling support for components.
- 🧩 Easily extendable and composable.
- 🚀 Plug-and-play architecture.

---

## 📸 Demo

Here’s a quick preview of the drawer navigation in action:

![Drawer Navigation Demo](https://drive.google.com/uc?export=view&id=1kTfZe67VDSF-uCnPhmA619tpH2q2pdiF)

---

## 🧠 Usage

```tsx
import DrawerNavigation from './DrawerNavigation';
import HomePage from './HomePage';
import { Image, Text } from 'react-native';

const options = [
  {
    title: "Home",
    onPress: () => {},
    icon: <Image source={require('./assets/home.png')} />,
    component: <Text>Home</Text>,
  },
  {
    title: "Settings",
    onPress: () => {},
    icon: <Image source={require('./assets/settings.png')} />,
  },
];

export default function App() {
  return <DrawerNavigation navigationOptions={options} Page={HomePage} />;
}
