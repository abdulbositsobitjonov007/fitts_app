import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Bot, Send, User, Lightbulb, Dumbbell, Apple, Droplets, Moon } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing, Radius } from '@/constants/spacing';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO: Replace sendMessage with real API call:
//   POST /api/ai/chat  →  { messages: [...], userContext: { goals, weight, activity } }

type Message = { id: string; from: 'ai' | 'user'; text: string; tag?: string };

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    from: 'ai',
    text: 'Привет! 👋 Сегодня ты молодец — уже {stepsCount} шагов и правильный завтрак. Хочешь совет по питанию или тренировке?',
    tag: 'welcome',
  },
  {
    id: '2',
    from: 'ai',
    text: '📌 Рекомендация дня\nДобавь куриную грудку и орехи в рацион — они ускорят восстановление мышц после тренировки.',
    tag: 'tip',
  },
];

// Pre-defined quick replies so user can tap instead of typing
const QUICK_REPLIES = [
  { label: 'Дай совет по питанию', icon: Apple },
  { label: 'Что потренировать сегодня?', icon: Dumbbell },
  { label: 'Сколько пить воды?', icon: Droplets },
  { label: 'Как улучшить сон?', icon: Moon },
];

// Contextual AI responses based on keywords
function generateAIResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('питан') || q.includes('еда') || q.includes('еж')) {
    return '🥗 Совет по питанию:\nСтарайся есть 4–5 раз в день небольшими порциями. Белок — главный друг твоих мышц. Норма: 1.5–2г на кг веса тела.';
  }
  if (q.includes('трен') || q.includes('упражнен')) {
    return '💪 Совет по тренировке:\nСегодня хорошо подойдёт тренировка верхней части тела. Не забудь разминку 5–10 минут перед началом!';
  }
  if (q.includes('вод') || q.includes('пить')) {
    return '💧 Норма воды:\nПри твоей активности рекомендуется выпивать 2.5–3 литра в день. Пей равномерно в течение дня, особенно до и после тренировки.';
  }
  if (q.includes('сон') || q.includes('уста')) {
    return '😴 Совет по сну:\nОптимальная продолжительность сна — 7–9 часов. Старайся ложиться в одно и то же время. Избегай экранов за час до сна.';
  }
  if (q.includes('вес') || q.includes('похуде')) {
    return '⚖️ Совет по весу:\nДефицит 300–500 ккал в день — безопасный темп снижения веса. Не голодай и держи белок высоким, чтобы сохранить мышцы.';
  }
  return '🤔 Это интересный вопрос! Я анализирую твои данные и скоро дам персональный ответ. Пока что — продолжай двигаться вперёд! 💪';
}

function ChatBubble({ msg }: { msg: Message }) {
  const isAI = msg.from === 'ai';
  const isCard = msg.tag === 'tip';
  return (
    <View style={[bubble.wrapper, !isAI && bubble.wrapperUser]}>
      {isAI && (
        <View style={bubble.avatar}>
          <Bot size={16} color={Colors.accentGreen} />
        </View>
      )}
      <View style={[bubble.box, isAI ? bubble.boxAI : bubble.boxUser, isCard && bubble.boxCard]}>
        {isCard && (
          <View style={bubble.cardBadge}>
            <Lightbulb size={12} color="#F59E0B" />
            <Text style={bubble.cardLabel}>NexFit AI</Text>
          </View>
        )}
        <Text style={[bubble.text, !isAI && bubble.textUser]}>{msg.text}</Text>
      </View>
      {!isAI && (
        <View style={bubble.avatar}>
          <User size={16} color={Colors.textPrimary} />
        </View>
      )}
    </View>
  );
}

const bubble = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginVertical: 4 },
  wrapperUser: { flexDirection: 'row-reverse' },
  avatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.backgroundElevated, alignItems: 'center', justifyContent: 'center' },
  box: { maxWidth: '75%', borderRadius: 16, padding: 12 },
  boxAI: { backgroundColor: Colors.backgroundCard, borderBottomLeftRadius: 4 },
  boxUser: { backgroundColor: Colors.accentPurple, borderBottomRightRadius: 4 },
  boxCard: { borderLeftWidth: 3, borderLeftColor: Colors.accentPurple },
  cardBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  cardLabel: { color: '#F59E0B', fontSize: 11, fontWeight: 'bold' },
  text: { color: Colors.textPrimary, fontSize: 14, lineHeight: 22 },
  textUser: { color: '#FFF' },
});

export default function AICoachScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const flatRef = useRef<FlatList>(null);

  function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: content };
    // TODO: POST /api/ai/chat { message: content, userId: user.id }
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      from: 'ai',
      text: generateAIResponse(content),
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAvatar}>
          <Bot size={22} color={Colors.accentGreen} />
        </View>
        <View>
          <Text style={styles.headerTitle}>AI-советник</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.headerSub}>NexFit AI • онлайн</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <ChatBubble msg={item} />}
        contentContainerStyle={styles.messages}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Quick replies */}
      <FlatList
        data={QUICK_REPLIES}
        horizontal
        keyExtractor={(q) => q.label}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickList}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity style={styles.quickChip} onPress={() => sendMessage(item.label)} activeOpacity={0.8}>
              <Icon size={14} color={Colors.accentPurple} />
              <Text style={styles.quickChipText}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Написать сообщение..."
          placeholderTextColor={Colors.textMuted}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => sendMessage()}
          returnKeyType="send"
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage()} activeOpacity={0.85}>
          <ExpoLinearGradient colors={['#8B5CF6', '#3B82F6']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.sendGradient}>
            <Send size={18} color="#FFF" />
          </ExpoLinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.base, paddingTop: 56, backgroundColor: Colors.backgroundCard, borderBottomWidth: 1, borderBottomColor: Colors.border },
  headerAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(16,185,129,0.15)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: Colors.textPrimary, fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.accentGreen },
  headerSub: { color: Colors.accentGreen, fontSize: Typography.fontSize.xs },
  messages: { padding: Spacing.base, paddingBottom: Spacing.sm },
  quickList: { paddingHorizontal: Spacing.base, paddingBottom: 8, gap: Spacing.sm },
  quickChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.backgroundCard, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: Colors.border },
  quickChipText: { color: Colors.textSecondary, fontSize: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm, padding: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.backgroundCard },
  textInput: { flex: 1, backgroundColor: Colors.backgroundElevated, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, color: Colors.textPrimary, fontSize: Typography.fontSize.base, maxHeight: 100, borderWidth: 1, borderColor: Colors.border },
  sendBtn: { width: 44, height: 44, borderRadius: 22, overflow: 'hidden' },
  sendGradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
