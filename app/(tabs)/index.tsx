import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface RiceProduct {
  id: string;
  name: string;
  price: number;
  volume: string;
  prefecture: string;
  isFurusato: boolean;
}

const mockRiceData: RiceProduct[] = [
  { id: '1', name: 'コシヒカリ', price: 450, volume: '5kg', prefecture: '新潟県', isFurusato: false },
  { id: '2', name: 'あきたこまち', price: 380, volume: '5kg', prefecture: '秋田県', isFurusato: true },
  { id: '3', name: 'ひとめぼれ', price: 420, volume: '10kg', prefecture: '宮城県', isFurusato: false },
  { id: '4', name: 'ななつぼし', price: 390, volume: '5kg', prefecture: '北海道', isFurusato: true },
  { id: '5', name: 'つや姫', price: 520, volume: '5kg', prefecture: '山形県', isFurusato: false },
];

const prefectures = [
  '全国', '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

export default function RiceSearchScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [priceRange, setPriceRange] = useState([200, 1000]);
  const [selectedPrefecture, setSelectedPrefecture] = useState('全国');
  const [furusatoOnly, setFurusatoOnly] = useState(false);
  const [searchResults, setSearchResults] = useState<RiceProduct[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    let filteredResults = mockRiceData.filter(rice => {
      const pricePerKg = rice.price;
      const matchesPrice = pricePerKg >= priceRange[0] && pricePerKg <= priceRange[1];
      const matchesPrefecture = selectedPrefecture === '全国' || rice.prefecture === selectedPrefecture;
      const matchesFurusato = !furusatoOnly || rice.isFurusato;
      
      return matchesPrice && matchesPrefecture && matchesFurusato;
    });

    setSearchResults(filteredResults);
    setHasSearched(true);
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
    filterCard: {
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
    filterTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 15,
    },
    priceRangeContainer: {
      marginBottom: 20,
    },
    priceRangeText: {
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 10,
    },
    pickerContainer: {
      marginBottom: 20,
    },
    picker: {
      backgroundColor: colors.background,
      borderRadius: 8,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    switchLabel: {
      fontSize: 16,
      color: colors.text,
    },
    searchButton: {
      backgroundColor: colors.tint,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 30,
    },
    searchButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    resultsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
    },
    resultCard: {
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    productName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 5,
    },
    productDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    productDetail: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 2,
    },
    furusatoTag: {
      backgroundColor: colors.success,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      alignSelf: 'flex-start',
      marginTop: 5,
    },
    furusatoTagText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '500',
    },
    noResults: {
      textAlign: 'center',
      fontSize: 16,
      color: colors.text,
      marginTop: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>普通米検索</Text>
        
        <View style={styles.filterCard}>
          <Text style={styles.filterTitle}>検索条件</Text>
          
          <View style={styles.priceRangeContainer}>
            <Text style={styles.priceRangeText}>
              価格帯: {priceRange[0]}円 - {priceRange[1]}円 / kg
            </Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={200}
              maximumValue={1000}
              minimumTrackTintColor={colors.tint}
              maximumTrackTintColor={colors.border}
              thumbTintColor={colors.tint}
              value={priceRange[1]}
              onValueChange={(value) => setPriceRange([priceRange[0], Math.round(value)])}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Text style={[styles.filterTitle, { marginBottom: 10 }]}>産地</Text>
            <Picker
              selectedValue={selectedPrefecture}
              onValueChange={setSelectedPrefecture}
              style={styles.picker}
            >
              {prefectures.map((prefecture) => (
                <Picker.Item key={prefecture} label={prefecture} value={prefecture} />
              ))}
            </Picker>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>ふるさと納税のみ</Text>
            <Switch
              value={furusatoOnly}
              onValueChange={setFurusatoOnly}
              trackColor={{ false: colors.border, true: colors.tint }}
              thumbColor={colors.card}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>検索</Text>
        </TouchableOpacity>

        {hasSearched && (
          <>
            <Text style={styles.resultsTitle}>検索結果 ({searchResults.length}件)</Text>
            {searchResults.length > 0 ? (
              searchResults.map((rice) => (
                <View key={rice.id} style={styles.resultCard}>
                  <Text style={styles.productName}>{rice.name}</Text>
                  <View style={styles.productDetails}>
                    <Text style={styles.productDetail}>価格: {rice.price}円/kg</Text>
                    <Text style={styles.productDetail}>容量: {rice.volume}</Text>
                  </View>
                  <Text style={styles.productDetail}>産地: {rice.prefecture}</Text>
                  {rice.isFurusato && (
                    <View style={styles.furusatoTag}>
                      <Text style={styles.furusatoTagText}>ふるさと納税</Text>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noResults}>条件に合う商品が見つかりませんでした</Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
