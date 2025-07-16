const ChatSkeleton = () => {
  const bubbles = [...Array(6)];

  return (
    <div className="flex flex-col gap-4 animate-pulse px-2">
      {bubbles.map((_, idx) => {
        const isUser = idx % 2 !== 0;
        const width = `${Math.floor(Math.random() * 40 + 40)}%`; 

        return (
          <div
            key={idx}
            className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!isUser && (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
            )}

            <div
              className={`h-[18px] ${isUser ? 'bg-blue-300 dark:bg-blue-700' : 'bg-gray-300 dark:bg-gray-700'} rounded-2xl`}
              style={{ width }}
            />

            {isUser && (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatSkeleton;
