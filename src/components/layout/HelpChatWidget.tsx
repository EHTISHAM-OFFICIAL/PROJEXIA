import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  findHelpAnswer,
  suggestWhileTyping,
  type HelpResponse,
} from "../../utils/helpBot";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const CHAT_WINDOW_POSITION: "center" | "left" | "right" = "left";

const WINDOW_HORIZONTAL = "20px";
const WINDOW_BOTTOM = "20px";

/* Resize limits */
const MIN_WIDTH = 320;
const MAX_WIDTH = 620;

const MIN_HEIGHT = 420;
const MAX_HEIGHT = 760;

const DEFAULT_WIDTH = 448;
const DEFAULT_HEIGHT = 620;

/* Launcher position */
const LAUNCHER_RIGHT = "94.5rem";
const LAUNCHER_BOTTOM = "1.5rem";

/* Typing */
const TYPING_DELAY = 450;

/* =========================================================
   GLOBAL CHATBOT COLORS
   Change colors HERE only.
   ========================================================= */

const CHATBOT_THEME = {
  accent: "#f97316",
  accentHover: "#ea580c",

  windowBackground: "#ffffff",

  headerBackground: "#111827",
  headerText: "#ffffff",
  headerMuted: "#cbd5e1",

  assistantBubble: "#dedad9",
  assistantText: "#0f172a",

  userBubble: "#f97316",
  userText: "#ffffff",

  inputBackground: "#ffffff",
  inputText: "#0f172a",
  inputPlaceholder: "#94a3b8",
  inputBorder: "#e2e8f0",

  suggestionsBackground: "#fff7ed",
  suggestionsBorder: "#fed7aa",
  suggestionsText: "#9a3412",
  suggestionsHover: "#ffedd5",

  actionBackground: "#f97316",
  actionText: "#ffffff",
  actionHover: "#ea580c",

  divider: "#e5e7eb",

  closeButtonBackground: "rgba(255,255,255,0.10)",
  closeButtonHover: "rgba(255,255,255,0.18)",

  userAvatarBackground: "#f97316",
  assistantAvatarBackground: "#111827",

  statusOnline: "#22c55e",

  shadow: "0 24px 70px rgba(15, 23, 42, 0.22)",
};

/* =========================================================
   TYPES
   ========================================================= */

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  response?: HelpResponse;
};

type ResizeDirection =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/* =========================================================
   HELPERS
   ========================================================= */

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export function HelpChatWidget() {
  const navigate = useNavigate();

  /* -------------------------------------------------------
     CHAT STATE
     ------------------------------------------------------- */

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createMessageId(),
      role: "assistant",
      text: "Hi! I'm the MECTEC Help Assistant. Ask me about our services, electronics projects, components, website, requests, pricing, or anything else I can help you with.",
      response: {
        answer:
          "Hi! I'm the MECTEC Help Assistant. Ask me about our services, electronics projects, components, website, requests, pricing, or anything else I can help you with.",
        suggestedQuestions: [
          "What services does MECTEC provide?",
          "How can I request a project?",
          "What information do I need to provide?",
          "How can I contact MECTEC?",
        ],
      },
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  /* -------------------------------------------------------
     WINDOW SIZE
     ------------------------------------------------------- */

  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const [resizeDirection, setResizeDirection] =
    useState<ResizeDirection | null>(null);

  /* -------------------------------------------------------
     REFS
     ------------------------------------------------------- */

  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const responseTimerRef = useRef<number | null>(null);

  const resizeStartRef = useRef<{
    direction: ResizeDirection;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  /* =========================================================
     DEFERRED LIVE INPUT
     ========================================================= */

  const deferredInput = useDeferredValue(input);

  /* =========================================================
     LAST ASSISTANT SUGGESTIONS
     ========================================================= */

  const latestAssistantSuggestions = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const message = messages[i];

      if (
        message.role === "assistant" &&
        message.response?.suggestedQuestions &&
        message.response.suggestedQuestions.length > 0
      ) {
        return message.response.suggestedQuestions;
      }
    }

    return [];
  }, [messages]);

  /* =========================================================
     LIVE SUGGESTIONS

     IMPORTANT:
     suggestWhileTyping() is ONLY called here.

     It never runs inside onChange.
     findHelpAnswer() never runs while typing.
     ========================================================= */

  const liveSuggestions = useMemo(() => {
    if (!isOpen) {
      return [];
    }

    const trimmedInput = deferredInput.trim();

    if (trimmedInput.length < 2) {
      return latestAssistantSuggestions;
    }

    return suggestWhileTyping(trimmedInput);
  }, [deferredInput, latestAssistantSuggestions, isOpen]);

  /* =========================================================
     AUTO SCROLL
     ========================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping, isOpen]);

  /* =========================================================
     AUTO FOCUS
     ========================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Keep the conversation keyboard-friendly. The input is temporarily
    // disabled while the assistant is "typing"; refocus it immediately
    // when that state ends so the user can type the next message without
    // manually clicking the field.
    const timeout = window.setTimeout(() => {
      if (!isTyping) {
        inputRef.current?.focus();
      }
    }, isTyping ? 40 : 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isOpen, isTyping]);

  /* =========================================================
     CLEANUP RESPONSE TIMER
     ========================================================= */

  useEffect(() => {
    return () => {
      if (responseTimerRef.current !== null) {
        window.clearTimeout(responseTimerRef.current);
      }
    };
  }, []);

  /* =========================================================
     SEND MESSAGE
     ========================================================= */

  const sendMessage = useCallback(
    (questionOverride?: string) => {
      const question = (questionOverride ?? input).trim();

      if (!question || isTyping) {
        return;
      }

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: "user",
        text: question,
      };

      setMessages((current) => [...current, userMessage]);
      setInput("");
      setIsTyping(true);

      /*
       * IMPORTANT:
       *
       * The actual answer engine runs ONLY after sending.
       * It does not execute during typing.
       */
      responseTimerRef.current = window.setTimeout(() => {
        const response = findHelpAnswer(question);

        const assistantMessage: ChatMessage = {
          id: createMessageId(),
          role: "assistant",
          text: response.answer,
          response,
        };

        setMessages((current) => [...current, assistantMessage]);
        setIsTyping(false);
        responseTimerRef.current = null;
      }, TYPING_DELAY);
    },
    [input, isTyping],
  );

  /* =========================================================
     ENTER TO SEND
     ========================================================= */

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (!isTyping && input.trim()) {
      sendMessage();
    }
  };

  /* =========================================================
     SUGGESTION CLICK
     ========================================================= */

  const handleSuggestionClick = (question: string) => {
    if (isTyping) {
      return;
    }

    sendMessage(question);
  };

  /* =========================================================
     ACTION BUTTON
     ========================================================= */

  const handleAction = (action: HelpResponse["action"]) => {
    if (!action) {
      return;
    }

    navigate(action.path);
    setIsOpen(false);
  };

  /* =========================================================
     CLEAR CHAT
     ========================================================= */

  const clearChat = () => {
    if (responseTimerRef.current !== null) {
      window.clearTimeout(responseTimerRef.current);
      responseTimerRef.current = null;
    }

    setIsTyping(false);

    setMessages([
      {
        id: createMessageId(),
        role: "assistant",
        text: "Hi! I'm the MECTEC Help Assistant. What would you like to know?",
        response: {
          answer:
            "Hi! I'm the MECTEC Help Assistant. What would you like to know?",
          suggestedQuestions: [
            "What services does MECTEC provide?",
            "How can I request a project?",
            "What information do I need to provide?",
            "How can I contact MECTEC?",
          ],
        },
      },
    ]);

    setInput("");
  };

  /* =========================================================
     RESIZE
     ========================================================= */

  const startResize = (
    event: React.PointerEvent<HTMLDivElement>,
    direction: ResizeDirection,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    resizeStartRef.current = {
      direction,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: width,
      startHeight: height,
    };

    setResizeDirection(direction);

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  useEffect(() => {
    if (!resizeDirection) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const start = resizeStartRef.current;

      if (!start) {
        return;
      }

      const deltaX = event.clientX - start.startX;
      const deltaY = event.clientY - start.startY;

      const direction = start.direction;

      let nextWidth = start.startWidth;
      let nextHeight = start.startHeight;

      if (direction.includes("right")) {
        nextWidth = start.startWidth + deltaX;
      }

      if (direction.includes("left")) {
        nextWidth = start.startWidth - deltaX;
      }

      if (direction.includes("bottom")) {
        nextHeight = start.startHeight + deltaY;
      }

      if (direction.includes("top")) {
        nextHeight = start.startHeight - deltaY;
      }

      setWidth(clamp(nextWidth, MIN_WIDTH, MAX_WIDTH));
      setHeight(clamp(nextHeight, MIN_HEIGHT, MAX_HEIGHT));
    };

    const handlePointerUp = () => {
      resizeStartRef.current = null;
      setResizeDirection(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [resizeDirection]);

  /* =========================================================
     WINDOW POSITION
     ========================================================= */

  const chatWindowPositionStyle = useMemo<React.CSSProperties>(() => {
    const size: React.CSSProperties = {
      width: `min(${width}px, calc(100vw - 2rem))`,
      height: `min(${height}px, calc(100vh - 2rem))`,
      bottom: WINDOW_BOTTOM,
    };

    if (CHAT_WINDOW_POSITION === "center") {
      return {
        ...size,
        left: "50%",
        transform: "translateX(-50%)",
      };
    }

    if (CHAT_WINDOW_POSITION === "left") {
      return {
        ...size,
        left: WINDOW_HORIZONTAL,
      };
    }

    return {
      ...size,
      right: WINDOW_HORIZONTAL,
    };
  }, [width, height]);

  /* =========================================================
     THEME VARIABLES
     ========================================================= */

  const themeVariables = {
    "--chat-accent": CHATBOT_THEME.accent,
    "--chat-accent-hover": CHATBOT_THEME.accentHover,

    "--chat-window-bg": CHATBOT_THEME.windowBackground,

    "--chat-header-bg": CHATBOT_THEME.headerBackground,
    "--chat-header-text": CHATBOT_THEME.headerText,
    "--chat-header-muted": CHATBOT_THEME.headerMuted,

    "--chat-assistant-bg": CHATBOT_THEME.assistantBubble,
    "--chat-assistant-text": CHATBOT_THEME.assistantText,

    "--chat-user-bg": CHATBOT_THEME.userBubble,
    "--chat-user-text": CHATBOT_THEME.userText,

    "--chat-input-bg": CHATBOT_THEME.inputBackground,
    "--chat-input-text": CHATBOT_THEME.inputText,
    "--chat-input-placeholder": CHATBOT_THEME.inputPlaceholder,
    "--chat-input-border": CHATBOT_THEME.inputBorder,

    "--chat-suggestions-bg": CHATBOT_THEME.suggestionsBackground,
    "--chat-suggestions-border": CHATBOT_THEME.suggestionsBorder,
    "--chat-suggestions-text": CHATBOT_THEME.suggestionsText,
    "--chat-suggestions-hover": CHATBOT_THEME.suggestionsHover,

    "--chat-action-bg": CHATBOT_THEME.actionBackground,
    "--chat-action-text": CHATBOT_THEME.actionText,
    "--chat-action-hover": CHATBOT_THEME.actionHover,

    "--chat-divider": CHATBOT_THEME.divider,

    "--chat-close-bg": CHATBOT_THEME.closeButtonBackground,
    "--chat-close-hover": CHATBOT_THEME.closeButtonHover,

    "--chat-user-avatar": CHATBOT_THEME.userAvatarBackground,
    "--chat-assistant-avatar": CHATBOT_THEME.assistantAvatarBackground,

    "--chat-online": CHATBOT_THEME.statusOnline,
    "--chat-shadow": CHATBOT_THEME.shadow,
  } as React.CSSProperties;

  /* =========================================================
     RESIZE HANDLE
     ========================================================= */

  const renderResizeHandle = (direction: ResizeDirection) => {
    const cursorMap: Record<ResizeDirection, string> = {
      top: "ns-resize",
      bottom: "ns-resize",
      left: "ew-resize",
      right: "ew-resize",
      "top-left": "nwse-resize",
      "top-right": "nesw-resize",
      "bottom-left": "nesw-resize",
      "bottom-right": "nwse-resize",
    };

    const positionMap: Record<ResizeDirection, React.CSSProperties> = {
      top: {
        top: 0,
        left: 12,
        right: 12,
        height: 10,
      },

      bottom: {
        bottom: 0,
        left: 12,
        right: 12,
        height: 10,
      },

      left: {
        left: 0,
        top: 12,
        bottom: 12,
        width: 10,
      },

      right: {
        right: 0,
        top: 12,
        bottom: 12,
        width: 10,
      },

      "top-left": {
        top: 0,
        left: 0,
        width: 18,
        height: 18,
      },

      "top-right": {
        top: 0,
        right: 0,
        width: 18,
        height: 18,
      },

      "bottom-left": {
        bottom: 0,
        left: 0,
        width: 18,
        height: 18,
      },

      "bottom-right": {
        bottom: 0,
        right: 0,
        width: 18,
        height: 18,
      },
    };

    return (
      <div
        key={direction}
        onPointerDown={(event) => startResize(event, direction)}
        style={{
          position: "absolute",
          zIndex: 100,
          cursor: cursorMap[direction],
          touchAction: "none",
          ...positionMap[direction],
        }}
        aria-hidden="true"
      />
    );
  };

  /* =========================================================
     ROBOT AVATAR
     ========================================================= */

  const RobotAvatar = ({ small = false }: { small?: boolean }) => {
    const size = small ? 30 : 40;

    return (
      <div
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          flexShrink: 0,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: small ? 10 : 13,

          background: "var(--chat-assistant-avatar)",

          color: "#ffffff",

          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <svg
          width={small ? 18 : 23}
          height={small ? 18 : 23}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3V6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          <circle cx="12" cy="2.5" r="1.2" fill="currentColor" />

          <rect
            x="4"
            y="6"
            width="16"
            height="13"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.7"
          />

          <circle cx="9" cy="12" r="1.4" fill="currentColor" />

          <circle cx="15" cy="12" r="1.4" fill="currentColor" />

          <path
            d="M8.5 15.5C9.5 16.4 10.7 16.8 12 16.8C13.3 16.8 14.5 16.4 15.5 15.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  };

  /* =========================================================
     HUMAN AVATAR
     ========================================================= */

  const HumanAvatar = () => {
    return (
      <div
        aria-hidden="true"
        style={{
          width: 30,
          height: 30,
          flexShrink: 0,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: 10,

          background: "var(--chat-user-avatar)",

          color: "#ffffff",

          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="3.3" fill="currentColor" />

          <path
            d="M5.5 20C5.9 16.3 8.2 14.3 12 14.3C15.8 14.3 18.1 16.3 18.5 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  };

  /* =========================================================
     LAUNCHER
     ========================================================= */

  if (!isOpen) {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open MECTEC Help Assistant"
          title="MECTEC Help Assistant"
          style={{
            position: "fixed",
            right: LAUNCHER_RIGHT,
            bottom: LAUNCHER_BOTTOM,

            width: 58,
            height: 58,

            border: "none",
            borderRadius: "50%",

            background: CHATBOT_THEME.accent,
            color: "#ffffff",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            cursor: "pointer",

            boxShadow: "0 12px 30px rgba(249,115,22,0.35)",

            zIndex: 9998,

            transition:
              "transform 160ms ease, background 160ms ease, box-shadow 160ms ease",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = CHATBOT_THEME.accentHover;

            event.currentTarget.style.transform = "scale(1.06)";

            event.currentTarget.style.boxShadow =
              "0 15px 34px rgba(249,115,22,0.45)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = CHATBOT_THEME.accent;
            event.currentTarget.style.transform = "scale(1)";
            event.currentTarget.style.boxShadow =
              "0 12px 30px rgba(249,115,22,0.35)";
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6.8C5 5.81 5.81 5 6.8 5H17.2C18.19 5 19 5.81 19 6.8V14.2C19 15.19 18.19 16 17.2 16H12L8.2 19V16H6.8C5.81 16 5 15.19 5 14.2V6.8Z"
              fill="currentColor"
            />

            <circle cx="9" cy="10.5" r="1" fill={CHATBOT_THEME.accent} />
            <circle cx="12" cy="10.5" r="1" fill={CHATBOT_THEME.accent} />
            <circle cx="15" cy="10.5" r="1" fill={CHATBOT_THEME.accent} />
          </svg>
        </button>
      </>
    );
  }

  /* =========================================================
     MAIN CHAT WINDOW
     ========================================================= */

  return (
    <div
      className="mectec-help-chat"
      style={{
        ...themeVariables,
        position: "fixed",
        zIndex: 9999,
        ...chatWindowPositionStyle,
      }}
    >
      <div
        style={{
          position: "relative",

          width: "100%",
          height: "100%",

          display: "flex",
          flexDirection: "column",

          overflow: "hidden",

          background: "var(--chat-window-bg)",

          border: "1px solid var(--chat-divider)",
          borderRadius: 22,

          boxShadow: "var(--chat-shadow)",
        }}
      >
        {/* ===================================================
            HEADER
            =================================================== */}

        <div
          style={{
            flexShrink: 0,

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            padding: "16px 16px 15px",

            background: "var(--chat-header-bg)",
            color: "var(--chat-header-text)",

            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              minWidth: 0,
            }}
          >
            <RobotAvatar />

            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,

                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                MECTEC Help Assistant
                <span
                  style={{
                    width: 7,
                    height: 7,
                    flexShrink: 0,

                    borderRadius: "50%",

                    background: "var(--chat-online)",

                    boxShadow: "0 0 0 3px rgba(34,197,94,0.12)",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: 4,

                  color: "var(--chat-header-muted)",

                  fontSize: 12,
                  lineHeight: 1.3,
                }}
              >
                Online • Here to help
              </div>
            </div>
          </div>

          {/* Header controls */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginLeft: 10,
            }}
          >
            <button
              type="button"
              onClick={clearChat}
              title="Clear chat"
              aria-label="Clear chat"
              style={{
                width: 34,
                height: 34,

                border: "none",
                borderRadius: 10,

                background: "var(--chat-close-bg)",
                color: "var(--chat-header-text)",

                cursor: "pointer",

                fontSize: 17,
                lineHeight: 1,

                transition: "background 140ms ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background =
                  "var(--chat-close-hover)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "var(--chat-close-bg)";
              }}
            >
              ↻
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              title="Close"
              aria-label="Close chat"
              style={{
                width: 34,
                height: 34,

                border: "none",
                borderRadius: 10,

                background: "var(--chat-close-bg)",
                color: "var(--chat-header-text)",

                cursor: "pointer",

                fontSize: 20,
                lineHeight: 1,

                transition: "background 140ms ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background =
                  "var(--chat-close-hover)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "var(--chat-close-bg)";
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* ===================================================
            MESSAGES
            =================================================== */}

        <div
          style={{
            flex: 1,

            overflowY: "auto",
            overflowX: "hidden",

            padding: "18px 15px 12px",

            background: "var(--chat-window-bg)",

            scrollbarWidth: "thin",
          }}
        >
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  flexDirection: isUser ? "row-reverse" : "row",

                  alignItems: "flex-end",

                  gap: 8,

                  marginBottom: 14,
                }}
              >
                {/* Avatar */}

                {isUser ? <HumanAvatar /> : <RobotAvatar small />}

                {/* Bubble */}

                <div
                  style={{
                    maxWidth: "82%",

                    padding: "11px 13px",

                    borderRadius: isUser
                      ? "16px 16px 5px 16px"
                      : "16px 16px 16px 5px",

                    background: isUser
                      ? "var(--chat-user-bg)"
                      : "var(--chat-assistant-bg)",

                    color: isUser
                      ? "var(--chat-user-text)"
                      : "var(--chat-assistant-text)",

                    fontSize: 13.5,
                    lineHeight: 1.55,

                    whiteSpace: "pre-wrap",

                    overflowWrap: "anywhere",

                    boxShadow: isUser
                      ? "none"
                      : "0 1px 2px rgba(15,23,42,0.05)",
                  }}
                >
                  {message.text}
                </div>
              </div>
            );
          })}

          {/* =================================================
              TYPING INDICATOR
              ================================================= */}

          {isTyping && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,

                marginBottom: 14,
              }}
            >
              <RobotAvatar small />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,

                  padding: "12px 14px",

                  borderRadius: "16px 16px 16px 5px",

                  background: "var(--chat-assistant-bg)",
                }}
              >
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    style={{
                      width: 5,
                      height: 5,

                      borderRadius: "50%",

                      background: "#64748b",

                      animation: `mectecHelpDot 1.2s ${
                        index * 0.15
                      }s infinite ease-in-out`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ===================================================
            TRY ASKING

            Suggestions NEVER appear inside message bubbles.
            =================================================== */}

        {liveSuggestions.length > 0 && (
          <div
            style={{
              flexShrink: 0,

              padding: "10px 13px",

              background: "var(--chat-suggestions-bg)",

              borderTop: "1px solid var(--chat-suggestions-border)",
            }}
          >
            <div
              style={{
                marginBottom: 8,

                color: "var(--chat-suggestions-text)",

                fontSize: 11,
                fontWeight: 700,

                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Try asking
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {liveSuggestions.slice(0, 4).map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSuggestionClick(question)}
                  disabled={isTyping}
                  style={{
                    border: "1px solid var(--chat-suggestions-border)",

                    borderRadius: 999,

                    padding: "7px 10px",

                    background: "#ffffff",

                    color: "var(--chat-suggestions-text)",

                    fontSize: 11.5,
                    lineHeight: 1.25,

                    cursor: isTyping ? "not-allowed" : "pointer",

                    opacity: isTyping ? 0.55 : 1,

                    transition:
                      "background 140ms ease, border-color 140ms ease",
                  }}
                  onMouseEnter={(event) => {
                    if (!isTyping) {
                      event.currentTarget.style.background =
                        "var(--chat-suggestions-hover)";
                    }
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "#ffffff";
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================
            ACTION BUTTON
            =================================================== */}

        {messages.length > 0 &&
          messages[messages.length - 1].role === "assistant" &&
          messages[messages.length - 1].response?.action && (
            <div
              style={{
                flexShrink: 0,

                padding: "10px 13px",

                borderTop: "1px solid var(--chat-divider)",

                background: "var(--chat-window-bg)",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  handleAction(messages[messages.length - 1].response?.action)
                }
                style={{
                  width: "100%",

                  border: "none",
                  borderRadius: 12,

                  padding: "10px 13px",

                  background: "var(--chat-action-bg)",
                  color: "var(--chat-action-text)",

                  fontSize: 13,
                  fontWeight: 700,

                  cursor: "pointer",

                  transition: "background 140ms ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background =
                    "var(--chat-action-hover)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background =
                    "var(--chat-action-bg)";
                }}
              >
                {messages[messages.length - 1].response?.action?.label}
              </button>
            </div>
          )}

        {/* ===================================================
            INPUT
            =================================================== */}

        <div
          style={{
            flexShrink: 0,

            padding: "11px 12px 12px",

            background: "var(--chat-window-bg)",

            borderTop: "1px solid var(--chat-divider)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,

              padding: 5,

              background: "var(--chat-input-bg)",

              border: "1px solid var(--chat-input-border)",
              borderRadius: 15,

              boxShadow: "0 2px 7px rgba(15,23,42,0.04)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => {
                /*
                 * IMPORTANT:
                 *
                 * Only update state here.
                 *
                 * No:
                 * - suggestWhileTyping()
                 * - findHelpAnswer()
                 * - semantic matching
                 * - scoring
                 * - knowledge scanning
                 */
                setInput(event.target.value);
              }}
              onKeyDown={handleInputKeyDown}
              disabled={isTyping}
              placeholder="Ask MECTEC anything..."
              aria-label="Ask MECTEC anything"
              style={{
                flex: 1,

                minWidth: 0,

                border: "none",
                outline: "none",

                background: "transparent",

                color: "var(--chat-input-text)",

                fontSize: 13.5,

                padding: "8px 9px",
              }}
            />

            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
              title="Send message"
              style={{
                width: 38,
                height: 38,
                flexShrink: 0,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                border: "none",
                borderRadius: 11,

                background:
                  isTyping || !input.trim() ? "#cbd5e1" : "var(--chat-accent)",

                color: "#ffffff",

                cursor: isTyping || !input.trim() ? "not-allowed" : "pointer",

                fontSize: 17,

                transition: "background 140ms ease",
              }}
            >
              ➤
            </button>
          </div>

          <div
            style={{
              marginTop: 7,

              textAlign: "center",

              color: "#94a3b8",

              fontSize: 10.5,
            }}
          >
            MECTEC Help Assistant
          </div>
        </div>

        {/* ===================================================
            RESIZE HANDLES
            =================================================== */}

        {renderResizeHandle("top")}
        {renderResizeHandle("bottom")}
        {renderResizeHandle("left")}
        {renderResizeHandle("right")}
        {renderResizeHandle("top-left")}
        {renderResizeHandle("top-right")}
        {renderResizeHandle("bottom-left")}
        {renderResizeHandle("bottom-right")}
      </div>

      {/* =====================================================
          ANIMATION + RESPONSIVE CSS
          ===================================================== */}

      <style>
        {`
          @keyframes mectecHelpDot {
            0%,
            60%,
            100% {
              transform: translateY(0);
              opacity: 0.45;
            }

            30% {
              transform: translateY(-3px);
              opacity: 1;
            }
          }

          .mectec-help-chat input::placeholder {
            color: var(--chat-input-placeholder);
          }

          .mectec-help-chat button:focus-visible,
          .mectec-help-chat input:focus-visible {
            outline: 2px solid var(--chat-accent);
            outline-offset: 2px;
          }

          @media (max-width: 700px) {
            .mectec-help-chat {
              left: 1rem !important;
              right: 1rem !important;
              bottom: 1rem !important;

              width: auto !important;

              height: min(
                760px,
                calc(100vh - 2rem)
              ) !important;

              transform: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}
