import {Text, View} from 'react-native';
import React, {useState} from 'react';

//Form validation imports
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordValidation: Yup.number()
    .min(4, 'Length must be more that 4 characters')
    .max(16, 'Length must be less that 16 characters')
    .required('The length is required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {};
  const createPassword = (characters: string, passwordLength: number) => {};
  const resetPasswordState = () => {};

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
