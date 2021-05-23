// Message represent a message sent to the bot
// it's an abstraction on the full message struct. see https://core.telegram.org/bots/api#messageentity

// This number may have more than 32 significant bits and some programming languages may have 
// difficulty/silent defects in interpreting it. 
// But it has at most 52 significant bits, so a signed 64-bit integer or double-precision 
// float type are safe for storing this identifier
export type TelegramID = number;

export interface User {
    id?: TelegramID
    username?: string
}

export interface Chat {
    id: TelegramID
    title?: string
}

export interface Message {
    id: TelegramID
    from: User
    chat: Chat
    date: string // iso8601
    hashtags: string[]
    urls: string[]
    text: string
}

export const messageHasHashtags = (message: Message): boolean => message.hashtags.length > 0
export const messageHasUrls = (message: Message): boolean => message.urls.length > 0
export const messageIsFromRecognizedAuthor = (message: Message, author: TelegramID) : boolean => message.from.id === author 