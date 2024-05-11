package com.remreren.realtimechat.wsconfig;

import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class WebSocketAuthManager implements ChannelInterceptor {

    private final UserDetailsService detailsService;

    @Override
    public org.springframework.messaging.Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        List<String> auths = Objects.requireNonNull(accessor).getNativeHeader("Authorization");

        if (StompCommand.CONNECT.equals(accessor.getCommand()) && Objects.nonNull(auths)) {
            String token = auths.getFirst();
            User user = parseToken(token);

            if (Objects.isNull(user)) {
                throw new AccessDeniedException("Invalid Authorization Token");
            }

            UserDetails test = detailsService.loadUserByUsername(user.getUsername());

            if (!user.getPassword().equals(test.getPassword())) {
                throw new AccessDeniedException("Unauthorized");
            }

            Authentication auth = new UsernamePasswordAuthenticationToken(user, user.getPassword(), List.of());
            accessor.setUser(auth);
        }
        return message;

    }

    private User parseToken(@Nullable String token) {
        if (Objects.isNull(token)) {
            return null;
        }

        if (!token.toLowerCase().startsWith("basic")) {
            return null;
        }

        String base64Credentials = token.substring("Basic".length()).trim();
        byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
        String credentials = new String(credDecoded);
        final String[] values = credentials.split(":", 2);

        return new User(values[0], values[1], List.of());
    }
}
