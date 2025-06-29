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

## Installation

yarn add @ahsankk/react-native-animated-components react-native-reanimated react-native-gesture-handler

OR

npm install @ahsankk/react-native-animated-components react-native-reanimated react-native-gesture-handler

## 📸 Demo

Here’s a quick preview of components:

![Drawer Navigation Demo](./demos/drawer%20demo.gif)

![Switch Demo](./demos/Switch.gif)

![Carousel Demo](./demos/carousel.gif)


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





import { Switch } from '@ahsankk/react-native-animated-components';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ padding: 20 }}>
      <Switch
        value={false}
        onChange={(val) => console.log('Switch state:', val)}
        labels={{ on: 'YES', off: 'NO' }}
        switchTrackStyle={{ backgroundColor: '#333' }}
        circleStyle={{ backgroundColor: '#ffb703' }}
        labelStyle={{ color: '#fff' }}
      />
    </View>
  );
}



import { StyleSheet, View } from 'react-native';
import Carousel from './customComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const cards = ['red', 'blue', 'yellow', 'green', 'orange'];
  return (
    <GestureHandlerRootView style={styles.container}>

      <Carousel
        data={cards}
        CARD_WIDTH={300}
        CARD_HEIGHT={400}
        SWIPE_THRESHOLD={80}
        renderCard={(item) => {
          return (
            <View style={{ flex: 1, backgroundColor: item, justifyContent: 'center', alignItems: 'center', backgroundColor: item }} />
          )
        }}
        onIndexChange={(index) => console.log('Current Index:', index)} // ✅ Callback

      />
    </GestureHandlerRootView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});