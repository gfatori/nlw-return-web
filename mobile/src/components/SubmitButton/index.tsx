import React from 'react';
import {
    Text,
    TouchableOpacityProps,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { theme } from '../../theme';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
    isLoading: boolean,
}

export function SubmitButton({ isLoading }: Props) {
    return (
        <TouchableOpacity 
        // style={styles.container}
        // onPress={() => {
        //     alert('you tapped my butt');
        // }}
        >
            {
                isLoading
                    ?
                    <ActivityIndicator
                        color={theme.colors.text_on_brand_color}
                    />
                    :
                    <Text style={styles.title}>
                        Enviar Feedback
                    </Text>
            }
        </TouchableOpacity>
    );
}