"use client";
import { AiChat, ChatAdapter, StreamingAdapterObserver } from "@nlux/react";
import "@nlux/themes/nova.css";

export function Chat() {
  const chatAdapter: ChatAdapter = {
    streamText: async (prompt: string, observer: StreamingAdapterObserver) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ prompt: prompt }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) {
        observer.error(new Error("Failed to connect to the server"));
        return;
      }

      if (!response.body) {
        return;
      }

      // Read a stream of server-sent events
      // and feed them to the observer as they are being generated
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        const content = textDecoder.decode(value);
        if (content) {
          observer.next(content);
        }
      }

      observer.complete();
    },
  };

  return (
    <div className="w-full p-4">
      <AiChat
        adapter={chatAdapter}
        personaOptions={{
          assistant: {
            name: "UM GPT",
            avatar:
              "https://images.deepai.org/chat-style-image/f1b52380075e4f2e9742d1703ebf35d8/output.jpg",
            tagline: "Chat with Unified Mindfulness AI ✨",
          },
          user: {
            name: "You",
            avatar:
              "https://st2.depositphotos.com/5266903/8930/i/450/depositphotos_89307232-stock-photo-alien-operator-flat-icon.jpg",
          },
        }}
        conversationOptions={{
          conversationStarters: [
            {
              icon: <span className="text-md">🧘</span>,
              prompt: "What is Unified Mindfulness?",
            },
            {
              icon: <span className="text-md">🤔</span>,
              prompt: "How do I practice Unified Mindfulness?",
            },
            {
              icon: <span className="text-md">🌟</span>,
              prompt: "What are the benefits of Unified Mindfulness?",
            },
          ],
        }}
      />
    </div>
  );
}
