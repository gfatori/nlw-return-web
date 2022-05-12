import React, { useState } from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { FeedbackType } from '../../components/Widget'
import { ScreenshotButton } from '../../components/ScreenshotButton'
import { SubmitButton } from '../SubmitButton'

import { styles } from './styles';
import { theme } from '../../theme';

import { feedbackTypes } from '../../utils/feedbackTypes'
import { api } from '../../libs/api';
interface Props {
    feedbackType: FeedbackType,
    onFeedbackCanceled: () => void,
    onFeedbackSent: () => void,
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
    const feedbackTypeInfo = feedbackTypes[feedbackType]

    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [comment, setComment] = useState('');

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        })
            .then(uri => setScreenshot(uri))
            .catch(err => console.error(err))

    }

    function handleScreenshotRemove() {
        console.log('chamei a função de remover screenshot')
        setScreenshot(null)
    }

    async function handleSendFeedback() {
        console.log('chamei a função de mandar feedback')
        if (isSendingFeedback) {
            console.log('ja tava mandando?');
            return;
        }
        console.log('chamei a função de mandar feedback')
        setIsSendingFeedback(true);
        console.log(' sending feedback...')
        // const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

        //     try {
        //         await api.post('/feedback', {
        //             type: feedbackType,
        //             screenshot: `data:image/png;base64, ${screenshotBase64}`,
        //         });

        //         onFeedbackSent();

        //     } catch (error) {
        //         console.log(error)
        //         setIsSendingFeedback(false);
        //     }
        console.log('chamei a função de mandar feedback')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}

                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>

                </View>
            </View>

            <TextInput
                multiline
                style={styles.input}
                placeholder="Deixe seu feedback"
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />
            <View style={styles.footer}>
            

                <SubmitButton
                    // onPress={() => {
                        //     alert('you tapped my butt');
                        // }}
                        isLoading={isSendingFeedback}
                        onPress={handleSendFeedback}
                />

<ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
            </View>
        </View>
    );
}