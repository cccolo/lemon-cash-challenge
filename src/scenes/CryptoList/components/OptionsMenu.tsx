import React from 'react';
import {
  Animated,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchIcon} from '../../../assets/images';
import {InputSearch} from './InputSearch';

type Props = {
  onToggleMenu: () => void;
  onAction: (type: 'SEARCH' | 'FAVORITES', value: string | boolean) => void;
};

export const OptionsMenu: React.FC<Props> = ({
  onToggleMenu,
  onAction,
}: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const animation = React.useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
    onToggleMenu();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const toggleSwitch = React.useCallback(() => {
    setIsEnabled(!isEnabled);
    onAction('FAVORITES', !isEnabled);
  }, [isEnabled, onAction]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.switchText}>
            {isEnabled ? 'Ocultar favoritos' : 'Ver favoritos'}
          </Text>
          <Switch
            trackColor={{false: '#767577', true: 'rgb(0, 240, 104)'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            testID="toggle-switch"
          />
        </View>
        <TouchableOpacity
          onPress={toggleMenu}
          style={styles.toggleButton}
          testID="toggle-button">
          <SearchIcon />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.menuContainer,
          {height: heightInterpolate, opacity: opacityInterpolate},
        ]}
        testID="menu-container">
        <InputSearch
          onCancel={toggleMenu}
          onChangeText={value => onAction('SEARCH', value)}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  menuContainer: {
    overflow: 'hidden',
    marginTop: 10,
  },
  switchText: {
    color: 'white',
    fontSize: 12,
  },
});
