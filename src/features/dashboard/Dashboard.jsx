import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChatroom, deleteChatroom } from "../../store/chatSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import {
  FiPlusCircle,
  FiSearch,
  FiTrash2,
  FiMessageCircle,
} from "react-icons/fi";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import WelcomeModal from "../../components/WelcomeModal";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [chatroomToDeleteId, setChatroomToDeleteId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatrooms = useSelector((state) => state.chat.chatrooms);

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Chatroom title required!");
      return;
    }
    dispatch(createChatroom({ title }));
    toast.success("Chatroom created successfully!");
    setTitle("");
  };

  const handleDeleteClick = (id) => {
    setChatroomToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (chatroomToDeleteId) {
      dispatch(deleteChatroom(chatroomToDeleteId));
      toast.success("Chatroom deleted!");
    }
    setIsDeleteDialogOpen(false);
    setChatroomToDeleteId(null);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setChatroomToDeleteId(null);
  };

  const filteredChatrooms = chatrooms.filter((room) =>
    room.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  useEffect(() => {
  const hasSeen = localStorage.getItem("welcome_shown");
  if (!hasSeen) {
    setShowWelcome(true);
    localStorage.setItem("welcome_shown", "true");
  }
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-850 p-6 sm:p-8 md:p-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-900 dark:text-white text-center drop-shadow-md">
          Gemini Chat Spaces
        </h2>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <FiPlusCircle className="mr-2 text-blue-500" /> Create New Chatroom
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="e.g., Team Discussion, Project Alpha Chat"
              className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-gray-50 dark:bg-gray-700 
                         text-gray-900 dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-500
                         transition-all duration-200 text-base"
            />
            <button
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                         text-white font-semibold py-3 px-6 rounded-lg 
                         shadow-md hover:shadow-lg transition-all duration-200
                         focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-500
                         flex items-center justify-center"
            >
              <FiPlusCircle className="mr-2" /> Create Chatroom
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <FiSearch className="mr-2 text-purple-500" /> Find Chatrooms
          </h3>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chatrooms by title..."
              className="p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg w-full
                         bg-gray-50 dark:bg-gray-700 
                         text-gray-900 dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-3 focus:ring-purple-400 dark:focus:ring-purple-500
                         transition-all duration-200 text-base"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredChatrooms.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg col-span-full py-8">
              No chatrooms found. Create one to get started!
            </p>
          ) : (
            filteredChatrooms.map((room) => (
              <div
                key={room.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 
                           flex flex-col justify-between items-start
                           border border-gray-200 dark:border-gray-700
                           hover:shadow-xl dark:hover:shadow-gray-700/50 transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  onClick={() => navigate(`/chatroom/${room.id}`)}
                  className="cursor-pointer flex-grow w-full mb-3"
                >
                  <h4
                    className="text-lg font-semibold text-gray-800 dark:text-white 
                                 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex items-center"
                  >
                    <FiMessageCircle className="mr-2 text-blue-400 dark:text-blue-300" />
                    {room.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Click to join conversation
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteClick(room.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300
                             bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg text-sm font-medium
                             hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-200
                             flex items-center"
                >
                  <FiTrash2 className="mr-1" /> Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
{showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${
          chatrooms.find((room) => room.id === chatroomToDeleteId)?.title ||
          "this chatroom"
        }"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default Dashboard;
