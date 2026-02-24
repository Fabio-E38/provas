export type ChatSender = 'user' | 'bot';

export interface ChatMessage {
	id: string;
	sender: ChatSender;
	text: string;
	createdAt: Date;
}