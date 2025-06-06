import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [email, setEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');

  const showLegalInfo = (type: 'privacy' | 'terms') => {
    const title = type === 'privacy' ? 'プライバシーポリシー' : '利用規約';
    const content = type === 'privacy' 
      ? 'お客様の個人情報は適切に管理され、第三者に提供されることはありません。詳細については当社のプライバシーポリシーをご確認ください。'
      : 'このアプリケーションの利用に際して、以下の利用規約に同意していただく必要があります。詳細については当社の利用規約をご確認ください。';
    
    Alert.alert(title, content, [{ text: 'OK', style: 'default' }]);
  };

  const saveSettings = () => {
    Alert.alert(
      '設定保存',
      '設定が正常に保存されました。',
      [{ text: 'OK', style: 'default' }]
    );
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
    section: {
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 15,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastSettingItem: {
      borderBottomWidth: 0,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    inputContainer: {
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 8,
      fontWeight: '500',
    },
    textInput: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
    },
    legalButton: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastLegalButton: {
      borderBottomWidth: 0,
    },
    legalButtonText: {
      fontSize: 16,
      color: colors.tint,
      textAlign: 'center',
    },
    saveButton: {
      backgroundColor: colors.tint,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    description: {
      fontSize: 14,
      color: colors.icon,
      marginTop: 8,
      lineHeight: 18,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>設定</Text>
        
        {/* 通知設定 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知設定</Text>
          <View style={[styles.settingItem, styles.lastSettingItem]}>
            <Text style={styles.settingLabel}>プッシュ通知</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.tint }}
              thumbColor={colors.card}
            />
          </View>
          <Text style={styles.description}>
            価格変動や新商品の情報をお知らせします
          </Text>
        </View>

        {/* アカウント情報 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アカウント情報</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>メールアドレス</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>郵便番号</Text>
            <TextInput
              style={styles.textInput}
              value={postalCode}
              onChangeText={setPostalCode}
              placeholder="123-4567"
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.description}>
            配送料計算や地域限定商品の表示に使用されます
          </Text>
        </View>

        {/* 表示設定 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>表示設定</Text>
          <View style={[styles.settingItem, styles.lastSettingItem]}>
            <Text style={styles.settingLabel}>ダークモード</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: colors.border, true: colors.tint }}
              thumbColor={colors.card}
            />
          </View>
          <Text style={styles.description}>
            暗い背景でアプリを表示します（次回起動時に反映）
          </Text>
        </View>

        {/* 法務情報 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>法務情報</Text>
          <TouchableOpacity 
            style={styles.legalButton}
            onPress={() => showLegalInfo('privacy')}
          >
            <Text style={styles.legalButtonText}>プライバシーポリシー</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.legalButton, styles.lastLegalButton]}
            onPress={() => showLegalInfo('terms')}
          >
            <Text style={styles.legalButtonText}>利用規約</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>設定を保存</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
} 