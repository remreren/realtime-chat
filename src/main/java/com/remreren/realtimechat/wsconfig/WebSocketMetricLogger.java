package com.remreren.realtimechat.wsconfig;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class WebSocketMetricLogger implements ChannelInterceptor {

    private static final Set<String> connectedSessionIds = Collections.newSetFromMap(new ConcurrentHashMap<>());

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        var accessor = StompHeaderAccessor.wrap(message);
        var command = accessor.getCommand();
        var sessionId = accessor.getSessionId();

        if (command == null || sessionId == null) {
            return message;
        }

        if (command == StompCommand.CONNECT) {
            connectedSessionIds.add(sessionId);
            log.info("New user connected: {}, Connected user count: {}", sessionId, connectedSessionIds.size());
        } else if (command == StompCommand.DISCONNECT) {
            connectedSessionIds.remove(sessionId);
            log.info("User disconnected: {}, Connected user count: {}", sessionId, connectedSessionIds.size());
        }

        return message;
    }
}

