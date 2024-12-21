import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';

//Form validation imports
// import * as Yup from 'yup';
// import {yupResolver} from '@hookform/resolvers/yup';

// const PasswordSchema = Yup.object().shape({
//   passwordValidation: Yup.number()
//     .min(4, 'Length must be more that 4 characters')
//     .max(16, 'Length must be less that 16 characters')
//     .required('The length is required'),
// });

const App = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      myPassword: '',
    },
    mode: 'onBlur',
    // resolver: yupResolver(PasswordSchema),
  });
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (number) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const onResetPasswordState = () => {
    reset();
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumber(false);
    setSymbols(false);
  };

  const onLowerCaseValueChange = () => {
    setLowerCase(previousState => !previousState);
  };
  const onUpperCaseValueChange = () => {
    setUpperCase(previousState => !previousState);
  };
  const onNumberChange = () => {
    setNumber(previousState => !previousState);
  };
  const onSymbolChange = () => {
    setSymbols(previousState => !previousState);
  };

  const onSubmit = data => {
    generatePasswordString(data.myPassword);
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.headerText}>Password Generator</Text>
        <Controller
          control={control}
          rules={{
            required: 'Password length is required',
            min: {
              value: 4,
              message: 'Minimum value is required 4',
            },
            max: {
              value: 16,
              message: 'Maximum value is required 16',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.passwordLengthInputFieldContainer}
              placeholder="Password Length"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="myPassword"
        />
        {errors.myPassword && (
          <Text style={styles.errorTextStyle}>{errors.myPassword.message}</Text>
        )}
        <View style={styles.toggleSwitchTile}>
          <Text>Lower Case</Text>
          <Switch onValueChange={onLowerCaseValueChange} value={lowerCase} />
        </View>
        <View style={styles.toggleSwitchTile}>
          <Text>Upper Case</Text>
          <Switch onValueChange={onUpperCaseValueChange} value={upperCase} />
        </View>
        <View style={styles.toggleSwitchTile}>
          <Text>Numbers</Text>
          <Switch onValueChange={onNumberChange} value={number} />
        </View>
        <View style={styles.toggleSwitchTile}>
          <Text>Symbols</Text>
          <Switch onValueChange={onSymbolChange} value={symbols} />
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onResetPasswordState}>
            <Text style={styles.submitButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        {isPasswordGenerated && (
          <View style={styles.generatedPasswordCard}>
            <Text style={styles.generatedPasswordText}>
              Your Password : {password}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  headerText: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    alignSelf: 'center',
    padding: 16,
    backgroundColor: 'lightblue',
    borderRadius: 8,
  },
  cancelButton: {
    alignSelf: 'center',
    padding: 16,
    backgroundColor: 'pink',
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 22,
  },
  passwordLengthInputFieldContainer: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  errorTextStyle: {color: 'red', paddingHorizontal: 16},
  toggleSwitchTile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  generatedPasswordCard: {
    height: 100,
    marginTop: 16,
    marginHorizontal: 24,
    backgroundColor: 'lightgreen',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatedPasswordText: {
    fontSize: 24,
  },
});
