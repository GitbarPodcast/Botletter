// Message represent a message sent to the bot
// it's an abstraction on the full message struct. see https://core.telegram.org/bots/api#messageentity

// This number may have more than 32 significant bits and some programming languages may have 
// difficulty/silent defects in interpreting it. 
// But it has at most 52 significant bits, so a signed 64-bit integer or double-precision 
// float type are safe for storing this identifier
export type TelegramID = number;

export interface User {
    ID: TelegramID
    Username?: string
}

export interface Chat {
    ID: TelegramID
    Title?: string
}

export interface Message {
    ID: string
    From: User
    Chat: Chat
    Date: Date
    Hashtags: string[]
    Urls: string[]
    Text: string
}

export const messageHasHashtags = (message: Message): boolean => message.Hashtags.length > 0
export const messageHasUrls = (message: Message): boolean => message.Urls.length > 0
export const messageIsFromRecognizedAuthor = (message: Message, author: TelegramID) : boolean => message.From.ID === author 