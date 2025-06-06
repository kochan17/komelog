import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const FEEDBACK_EXAMPLES = [
  '米の価格安定化政策についてより詳しい情報を公開してほしいです。',
  '備蓄米の販売時期や場所をもっと早く告知してほしいです。',
  '地域の小規模農家への支援制度を充実させてほしいです。',
  '米の品質基準や検査結果をもっと透明化してほしいです。',
  '農業技術の普及や指導体制を強化してほしいです。',
];

export default function FeedbackScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [feedbackText, setFeedbackText] = useState('');
  const MAX_LENGTH = 500;

  const handleSubmit = () => {
    if (feedbackText.trim().length === 0) {
      Alert.alert('入力エラー', 'ご意見・ご要望を入力してください。');
      return;
    }

    Alert.alert(
      '投稿完了',
      'ご意見ありがとうございます！\nしっかりと農林水産省に届けてきます！',
      [
        {
          text: 'OK',
          onPress: () => {
            setFeedbackText('');
            router.push('/');
          }
        }
      ]
    );
  };

  const insertExample = (example: string) => {
    if (feedbackText.length + example.length <= MAX_LENGTH) {
      setFeedbackText(prev => prev ? `${prev}\n\n${example}` : example);
    } else {
      Alert.alert('文字数エラー', '文字数制限を超えてしまいます。');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 30,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      marginBottom: 30,
      textAlign: 'center',
    },
    inputCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    textInput: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      minHeight: 120,
      textAlignVertical: 'top',
    },
    characterCount: {
      alignItems: 'flex-end',
      marginTop: 8,
    },
    characterCountText: {
      fontSize: 14,
      color: colors.icon,
    },
    characterCountOver: {
      color: colors.danger,
    },
    submitButton: {
      backgroundColor: colors.tint,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 30,
    },
    submitButtonDisabled: {
      backgroundColor: colors.border,
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    examplesCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    examplesTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 15,
    },
    exampleItem: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      borderLeftWidth: 3,
      borderLeftColor: colors.tint,
    },
    exampleText: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    examplesNote: {
      fontSize: 12,
      color: colors.icon,
      marginTop: 10,
      fontStyle: 'italic',
    },
  });

  const isOverLimit = feedbackText.length > MAX_LENGTH;
  const isButtonDisabled = feedbackText.trim().length === 0 || isOverLimit;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>農林水産省への要望</Text>
          
          <Text style={styles.description}>
            農林水産省への政策提言やご意見・ご要望をお聞かせください。{'\n'}
            皆様の声を農林水産省に届けさせていただきます。
          </Text>

          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>ご意見・ご要望</Text>
            <TextInput
              style={styles.textInput}
              value={feedbackText}
              onChangeText={setFeedbackText}
              placeholder="こちらにご意見やご要望をご記入ください..."
              placeholderTextColor={colors.placeholder}
              multiline
              maxLength={MAX_LENGTH + 50} // 少し余裕を持たせて警告表示
            />
            <View style={styles.characterCount}>
              <Text style={[
                styles.characterCountText,
                isOverLimit && styles.characterCountOver
              ]}>
                {feedbackText.length} / {MAX_LENGTH}文字
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[
              styles.submitButton,
              isButtonDisabled && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmit}
            disabled={isButtonDisabled}
          >
            <Text style={styles.submitButtonText}>投稿する</Text>
          </TouchableOpacity>

          <View style={styles.examplesCard}>
            <Text style={styles.examplesTitle}>投稿例</Text>
            {FEEDBACK_EXAMPLES.map((example, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exampleItem}
                onPress={() => insertExample(example)}
              >
                <Text style={styles.exampleText}>{example}</Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.examplesNote}>
              投稿例をタップすると入力欄に追加されます
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 