import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'news' | 'event';
}

interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'sale' | 'announcement';
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: '令和6年産米の備蓄米入札について',
    date: '2024-03-15',
    content: '農林水産省より令和6年産米の政府備蓄米買入入札の実施について発表されました。',
    type: 'news'
  },
  {
    id: '2',
    title: '備蓄米販売イベント開催',
    date: '2024-03-10',
    content: '3月20日〜22日に東京ビッグサイトで備蓄米の特別販売イベントを開催いたします。',
    type: 'event'
  },
  {
    id: '3',
    title: '価格改定のお知らせ',
    date: '2024-03-05',
    content: '4月1日より備蓄米の販売価格を改定いたします。詳細については公式サイトをご確認ください。',
    type: 'news'
  },
];

const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    date: '2024-03-20',
    title: '備蓄米販売イベント',
    description: '東京ビッグサイトで特別価格での販売',
    type: 'sale'
  },
  {
    id: '2',
    date: '2024-03-25',
    title: '価格改定実施',
    description: '新価格での販売開始',
    type: 'announcement'
  },
  {
    id: '3',
    date: '2024-04-01',
    title: '新年度入札開始',
    description: '令和6年度の備蓄米入札開始',
    type: 'announcement'
  },
];

export default function StockpileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [activeTab, setActiveTab] = useState<'calendar' | 'news'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getMonthName = (date: Date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentMonth(newDate);
  };

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <View style={styles.newsCard}>
      <View style={styles.newsHeader}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <View style={[styles.newsTypeTag, { backgroundColor: item.type === 'event' ? colors.warning : colors.success }]}>
          <Text style={styles.newsTypeText}>{item.type === 'event' ? 'イベント' : 'ニュース'}</Text>
        </View>
      </View>
      <Text style={styles.newsDate}>{formatDate(item.date)}</Text>
      <Text style={styles.newsContent}>{item.content}</Text>
    </View>
  );

  const renderCalendarEvent = ({ item }: { item: CalendarEvent }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventDate}>
        <Text style={styles.eventDateText}>{formatDate(item.date)}</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <View style={[styles.eventTypeTag, { backgroundColor: item.type === 'sale' ? colors.danger : colors.tint }]}>
          <Text style={styles.eventTypeText}>{item.type === 'sale' ? '販売' : '告知'}</Text>
        </View>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 4,
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 8,
    },
    activeTab: {
      backgroundColor: colors.tint,
    },
    tabText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    monthNavigator: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    monthButton: {
      backgroundColor: colors.tint,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    monthButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    monthText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    newsCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    newsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    newsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
      marginRight: 10,
    },
    newsTypeTag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    newsTypeText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '500',
    },
    newsDate: {
      fontSize: 14,
      color: colors.icon,
      marginBottom: 8,
    },
    newsContent: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    eventCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    eventDate: {
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.tint,
      borderRadius: 8,
      paddingVertical: 8,
      marginRight: 12,
    },
    eventDateText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
      textAlign: 'center',
    },
    eventContent: {
      flex: 1,
    },
    eventTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    eventDescription: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 8,
      lineHeight: 18,
    },
    eventTypeTag: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    eventTypeText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>備蓄米情報</Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'calendar' && styles.activeTab]}
            onPress={() => setActiveTab('calendar')}
          >
            <Text style={[styles.tabText, activeTab === 'calendar' && styles.activeTabText]}>
              カレンダー
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'news' && styles.activeTab]}
            onPress={() => setActiveTab('news')}
          >
            <Text style={[styles.tabText, activeTab === 'news' && styles.activeTabText]}>
              ニュース
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {activeTab === 'calendar' ? (
          <>
            <View style={styles.monthNavigator}>
              <TouchableOpacity style={styles.monthButton} onPress={() => changeMonth('prev')}>
                <Text style={styles.monthButtonText}>‹ 前月</Text>
              </TouchableOpacity>
              <Text style={styles.monthText}>{getMonthName(currentMonth)}</Text>
              <TouchableOpacity style={styles.monthButton} onPress={() => changeMonth('next')}>
                <Text style={styles.monthButtonText}>次月 ›</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={mockCalendarEvents}
              renderItem={renderCalendarEvent}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <FlatList
            data={mockNews}
            renderItem={renderNewsItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
} 