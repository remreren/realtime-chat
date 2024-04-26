package com.remreren.realtimechat;

public record Message(
        String content,
        String sender,
        MessageType type
) {
    public enum MessageType {
        CHAT, LEAVE, JOIN
    }
}