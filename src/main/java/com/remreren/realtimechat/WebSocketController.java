package com.remreren.realtimechat;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebSocketController {

    @MessageMapping("/chat.register")
    @SendTo("/topic/public")
    public Message greeting(@Payload Message chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.sender());
        return chatMessage;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.send/{roomName}")
    @SendTo("/topic/{roomName}")
    public Message sendMessageToRoom(@Payload Message chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.register/{roomName}")
    @SendTo("/topic/{roomName}")
    public Message registerToRoom(@Payload Message chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.sender());
        return chatMessage;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> greetings(@RequestParam String message) {
        return ResponseEntity.ok("Hello, " + message + "!");
    }
}
