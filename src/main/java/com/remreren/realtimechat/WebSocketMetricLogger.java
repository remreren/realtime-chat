package com.remreren.realtimechat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Component
@EnableScheduling
public class WebSocketMetricLogger implements ChannelInterceptor {
    private static final Logger log = LoggerFactory.getLogger(WebSocketMetricLogger.class);
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
        } else if (command == StompCommand.DISCONNECT) {
            connectedSessionIds.remove(sessionId);
        }

        return message;
    }

    @Scheduled(fixedRate = 2, initialDelay = 0, timeUnit = TimeUnit.SECONDS)
    public void logConnectedUsers() {
        log.info("Connected users: " + connectedSessionIds.size());
    }
}

