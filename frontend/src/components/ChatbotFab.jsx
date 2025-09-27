import { useState } from "react";

function ChatbotFab() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I'm your Cyclone Assistant. How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // user message
    const userMsg = { from: "user", text: input };
    setMessages([...messages, userMsg]);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", text: "⚠️ Error connecting to server" }]);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden border">
          <div className="bg-blue-600 text-white p-3 font-bold">Cyclone Assistant</div>
          <div className="p-3 h-64 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[75%] ${
                  msg.from === "user"
                    ? "ml-auto bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-2 outline-none dark:bg-gray-900 dark:text-white"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatbotFab;
