import { useEffect, useState } from 'react';
import { TextInput, Button, FlatList } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface Comment {
  id: number;
  content: string;
  created_at: string;
}

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Post' });
    fetchComments();
  }, [id]);

  async function fetchComments() {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: false });
    if (data) setComments(data as Comment[]);
  }

  async function addComment() {
    if (!newComment) return;
    const { error } = await supabase.from('comments').insert({ post_id: id, content: newComment });
    if (!error) {
      setNewComment('');
      fetchComments();
    }
  }

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <ThemedText>{item.content}</ThemedText>
          </ThemedView>
        )}
      />
      <TextInput
        placeholder="Add a comment"
        value={newComment}
        onChangeText={setNewComment}
        style={{ backgroundColor: '#fff', padding: 8, marginVertical: 8 }}
      />
      <Button title="Comment" onPress={addComment} />
    </ThemedView>
  );
}
