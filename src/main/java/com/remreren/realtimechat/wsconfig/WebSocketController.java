package com.remreren.realtimechat.wsconfig;

import com.remreren.realtimechat.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;

@Controller
public class WebSocketController {

    @MessageMapping("/chat.send/{roomName}")
    @SendTo("/topic/{roomName}")
    public Message sendMessageToRoom(@Payload Message chatMessage, Principal principal) {
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
