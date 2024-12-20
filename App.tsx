import {Text, View} from 'react-native';
import React from 'react';

//Form validation imports
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordValidation: Yup.number()
    .min(4, 'Length must be more that 4 characters')
    .max(16, 'Length must be less that 16 characters')
    .required('The length is required'),
});

const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
