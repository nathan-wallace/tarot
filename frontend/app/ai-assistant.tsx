import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const params = useLocalSearchParams<{ card?: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const send = async () => {
    if (!input) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    try {
      const res = await fetch('http://localhost:3001/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, card: params.card && { slug: params.card } }),
      });
      const data = await res.json();
      const aiMsg: Message = {
        role: 'assistant',
        content: data.interpretation || 'No response',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error fetching response' },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        style={styles.list}
        renderItem={({ item }) => (
          <Text style={item.role === 'user' ? styles.userText : styles.aiText}>
            {item.content}
          </Text>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask a question"
        />
        <Button title="Send" onPress={send} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  list: { flex: 1 },
  userText: { alignSelf: 'flex-end', marginVertical: 4 },
  aiText: { alignSelf: 'flex-start', marginVertical: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', marginRight: 8, padding: 8 },
});
