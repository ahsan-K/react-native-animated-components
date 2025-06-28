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

![Drawer Navigation Demo](./demos/drawer%20demo.gif)

---

## 🧠 Usage

```tsx
import { DrawerNavigation } from '@ahsankk/react-native-animated-components';
import { Image, Text } from 'react-native';


const options = [
  {
    title: "Home",
    onPress: () => { },
    icon: <Image source={require('./assets/home.png')} />,
    component: <Text>Home</Text>,
  },
  {
    title: "Settings",
    onPress: () => { },
    icon: <Image source={require('./assets/settings.png')} />,
  },
];

export default function App() {
  return (
    <DrawerNavigation navigationOptions={options} Page={CustomComponent} />
  )
}


const CustomComponent = ({ onPress }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'purple', padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Home</Text>

      <Button onPress={onPress} title="click" />
    </View>
  )
}



