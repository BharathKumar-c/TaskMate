import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons'; // Import close icon

const BottomSheet = ({isVisible, onClose, children}) => {
  const translateY = useSharedValue(300); // Initial position (hidden)
  const backdropOpacity = useSharedValue(0); // Backdrop starts as transparent
  const [contentHeight, setContentHeight] = useState(0); // Dynamically set height

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0);
      backdropOpacity.value = withTiming(1, {duration: 300}); // Fade in
    } else {
      translateY.value = withSpring(contentHeight);
      backdropOpacity.value = withTiming(0, {duration: 300}); // Fade out
    }
  }, [isVisible, contentHeight]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY > 0 ? event.translationY : 0;
    })
    .onEnd(() => {
      if (translateY.value > contentHeight / 2) {
        onClose();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  return isVisible ? (
    <View style={styles.container}>
      {/* Dark Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, backdropStyle]} />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.sheet, animatedStyle]}
          onLayout={handleLayout}>
          <View style={styles.header}>
            {/* Close Icon */}
            <Pressable style={styles.closeIcon} onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <View style={styles.handle} />
          </View>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  ) : null;
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 50,
    alignItems: 'center',
    marginBottom: 5,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});
