import { useEffect, useState } from 'react';
import { TextInput, Button, FlatList } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface Post {
  id: number;
  content: string;
  created_at: string;
}

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Community' });
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data as Post[]);
  }

  async function addPost() {
    if (!newPost) return;
    const { error } = await supabase.from('posts').insert({ content: newPost });
    if (!error) {
      setNewPost('');
      fetchPosts();
    }
  }

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Share your interpretation"
        value={newPost}
        onChangeText={setNewPost}
        style={{ backgroundColor: '#fff', padding: 8, marginBottom: 8 }}
      />
      <Button title="Post" onPress={addPost} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/community/post?id=${item.id}`}>
            <ThemedView style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ccc' }}>
              <ThemedText>{item.content}</ThemedText>
            </ThemedView>
          </Link>
        )}
      />
    </ThemedView>
  );
}
