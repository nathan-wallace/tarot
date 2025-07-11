import { useLocalSearchParams, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getCardBySlug, TarotCard } from '@/constants/cards';

export default function CardDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const card: TarotCard | undefined = slug ? getCardBySlug(slug) : undefined;
  const [aiText, setAiText] = useState('');

  useEffect(() => {
    const fetchAI = async () => {
      if (!card) return;
      try {
        const res = await fetch('http://localhost:3001/interpret', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ card }),
        });
        const data = await res.json();
        if (data.interpretation) setAiText(data.interpretation);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAI();
  }, [slug]);

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Card not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{card.name}</Text>
      <Text style={styles.sectionTitle}>Traditional Meaning</Text>
      <Text style={styles.text}>{card.meaning}</Text>
      <Text style={styles.sectionTitle}>AI Interpretation</Text>
      <Text style={styles.text}>{aiText || 'Loading...'}</Text>
      <Link href={`/ai-assistant?card=${card.slug}`} style={styles.link}>
        Ask a follow-up question
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  link: {
    marginTop: 20,
    color: '#0a7ea4',
    fontWeight: '600',
  },
});
