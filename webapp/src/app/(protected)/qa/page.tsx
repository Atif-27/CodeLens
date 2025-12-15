"use client";

import useProject from "@/hooks/use-project";
import React, { useState, useRef, useEffect, type FormEvent } from "react";
import ProjectFallback from "../project-fallback";

type Role = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}

const ChatMain: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setProjectId, project, projectId } = useProject();
  const selectedProject = project;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage.content,
          projectId: project?.id,
        }),
      });

      interface QueryResponse {
        answer?: string;
        [key: string]: unknown;
      }
      const data = (await res.json()) as unknown as QueryResponse;
      console.log(data);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer ?? "No response from model.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.log(err);

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "⚠️ Something went wrong while talking to the AI. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  if (!projectId) return <ProjectFallback></ProjectFallback>;

  return (
    <div className="flex h-full flex-col bg-slate-950/40 text-slate-100">
      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
        {messages.length === 0 && !isLoading && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-sm text-slate-400">
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-3">
              <p className="text-xs tracking-wide text-slate-500 uppercase">
                RAG Chatbot
              </p>
              <p className="mt-1 text-sm text-slate-200">
                Ask me anything about your indexed docs / repo.
              </p>
            </div>

            <div className="mt-4 grid w-full max-w-xl gap-2 text-left text-xs text-slate-400 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setInput("Summarise this repository and its main modules.")
                }
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-left hover:border-slate-600 hover:bg-slate-900"
              >
                🔍 Overview of the codebase
              </button>
              <button
                type="button"
                onClick={() =>
                  setInput(
                    "Where is the database connection configured in this project?",
                  )
                }
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-left hover:border-slate-600 hover:bg-slate-900"
              >
                🗂 Find specific logic
              </button>
              <button
                type="button"
                onClick={() =>
                  setInput(
                    "Explain how authentication works in this repository.",
                  )
                }
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-left hover:border-slate-600 hover:bg-slate-900"
              >
                🔐 Explain a feature
              </button>
              <button
                type="button"
                onClick={() =>
                  setInput(
                    "Suggest refactors or improvements for this project’s architecture.",
                  )
                }
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-left hover:border-slate-600 hover:bg-slate-900"
              >
                🛠 Refactor / improvements
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm md:max-w-[70%] md:px-4 md:py-3 ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-blue-600 text-white"
                    : "rounded-bl-sm border border-slate-800 bg-slate-900/80 text-slate-100"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm md:px-4 md:py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 delay-150" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-600 delay-300" />
                <span className="ml-2 text-xs text-slate-400">
                  Thinking with your docs…
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur md:px-6">
        <form onSubmit={handleSubmit} className="flex items-end gap-2 md:gap-3">
          <div className="flex-1">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 md:px-4 md:py-2.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about your repo / documents…"
                className="max-h-32 w-full resize-none bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>
            <p className="mt-1 text-[10px] text-slate-500">
              <span className="rounded bg-slate-800 px-1">Enter</span> for new
              line.
            </p>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="inline-flex h-9 items-center justify-center rounded-2xl border border-blue-500 bg-blue-600 px-3 text-xs font-medium text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatMain;
