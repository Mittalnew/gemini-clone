import { toast } from "react-toastify";

const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text);
      toast.info("Message copied!");
    }
  };

  return (
    <div
      onClick={handleCopy}
      className={`max-w-[70%] p-3 rounded-lg shadow text-white cursor-pointer text-sm ${
        isUser ? "ml-auto bg-blue-600" : "mr-auto bg-gray-700"
      }`}
      title={message.text ? "Click to copy" : ""}
    >
      {message.image && (
        <img
          src={message.image}
          alt="sent"
          className="rounded mb-2 max-w-full max-h-60 object-contain"
        />
      )}

      {message.text && <div>{message.text}</div>}

      <div className="text-[10px] text-right opacity-60 mt-1">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default MessageBubble;
