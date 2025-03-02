import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomTextInput = (
  {
    label,
    value,
    onChangeText,
    secureTextEntry = false,
    errorText,
    keyboardType = 'default',
    maxLength,
    returnKeyType = 'done',
    onSubmitEditing,
    placeholder,
    rightIcon,
    multiline = false, // Enable multiline input
    numberOfLines = 4, // Default number of lines
    ...rest
  },
  ref
) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  return (
    <>
      <TextInput
        label={label}
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        keyboardType={keyboardType}
        maxLength={maxLength}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        multiline={multiline} // Enable multiline
        numberOfLines={numberOfLines} // Set number of lines
        style={[
          styles.input,
          multiline && styles.multilineInput, // Apply multiline styles dynamically
        ]}
        outlineColor="#207DFF"
        activeOutlineColor="#207DFF"
        theme={{
          colors: {
            primary: 'rgba(0, 0, 0, 0.1)',
            background: '#ffff',
          },
          roundness: wp(1.8),
        }}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              style={styles.textInputIcon}
              iconColor="#207DFF"
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisibility(!isPasswordVisible)}
            />
          ) : rightIcon ? (
            <TextInput.Icon
              style={styles.textInputIcon}
              iconColor="#207DFF"
              icon={rightIcon}
            />
          ) : null
        }
        {...rest}
        ref={ref}
      />
      {errorText ? <Text style={styles.errorBox}>{errorText}</Text> : null}
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    width: wp(90),
    height: hp(6),
    fontSize: wp(4),
    paddingHorizontal: wp(4),
    marginVertical: hp(1),
  },
  multilineInput: {
    height: hp(12), // Increase height for multiline inputs
    textAlignVertical: 'top', // Ensure text starts from top
    paddingVertical: hp(1), // Add padding for better spacing
  },
  textInputIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.5),
    tintColor: '#207DFF',
  },
  errorBox: {
    flexDirection: 'row',
    color: 'red',
    fontSize: wp(3.5),
    fontFamily: 'Poppins-Regular',
    alignSelf: 'flex-start',
    height: hp(2.5),
    marginTop: hp(0.5),
  },
});
