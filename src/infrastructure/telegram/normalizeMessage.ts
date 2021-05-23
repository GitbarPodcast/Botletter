import {
    Message as apiMessage,
    MessageEntity,
} from "typegram";
import { Message } from "@/infrastructure/telegram";

const extractEntitiesFromText = (text: string) => (e: MessageEntity) : string => text.substring(e.offset, e.offset + e.length)

export const normalizeTelegramMessage = (apiMessage: apiMessage.TextMessage) : Message => {
    const hashtags = (apiMessage.entities || []).filter((e) => e.type === "hashtag").map(extractEntitiesFromText(apiMessage.text))
    const urls = (apiMessage.entities || []).filter((e) => e.type === 'url').map(extractEntitiesFromText(apiMessage.text))

    return {
        id: apiMessage.message_id,
        chat: {
            id: apiMessage.chat.id,
            title: apiMessage.chat.type === 'group' ? apiMessage.chat.title : undefined,
        },
        urls: urls,
        hashtags: hashtags,
        from: {
            id: apiMessage.from?.id,
            username: apiMessage.from?.username,
        },
        date: new Date(apiMessage.date).toISOString(),
        text: apiMessage.text,
    }
}