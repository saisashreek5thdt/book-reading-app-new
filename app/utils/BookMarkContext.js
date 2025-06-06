import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const { user } = useAuth(); // This might be null initially
  const userId = user?.id || 1; // Fallback to 1 only for testing

  const fetchBookmarks = async () => {
    if (!user) {
      console.warn("User not logged in. Skipping bookmark fetch.");
      return;
    }
    

    try {
      const response = await fetch(
        `https://book-reading-app-api-o9ts.vercel.app/api/bookmarks?userId=${userId}`
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to fetch bookmarks: ${response.status} - ${errText}`);
      }

      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user]);

  const addBookmark = async (book) => {
    if (!user) {
      console.warn("Cannot bookmark: User not logged in");
      return;
    }

    const alreadyExists = bookmarks.some((b) => b.bookId === book.id);

    if (!alreadyExists) {
      try {
        const response = await fetch(
          "https://book-reading-app-api-o9ts.vercel.app/api/bookmarks",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookId: book.id,
              userId,
              progress: 0,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to add bookmark");

        const newBookmark = await response.json();
        setBookmarks((prev) => [...prev, newBookmark]);
        await fetchBookmarks();
        // console.log("Bookmark added successfully:", newBookmark);
      } catch (error) {
        console.error("Error adding bookmark:", error);
      }
    }
  };

  const updateBookmarkProgress = async (bookmarkId, progress) => {
    try {
      const response = await fetch(
        `https://book-reading-app-api-o9ts.vercel.app/api/bookmarks/${bookmarkId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ progress }),
        }
      );

      if (!response.ok) throw new Error("Failed to update bookmark");

      const updated = await response.json();
      setBookmarks((prev) =>
        prev.map((b) => (b.id === bookmarkId ? updated : b))
      );
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const removeBookmark = async (bookmarkId) => {
    try {
      const response = await fetch(
        `https://book-reading-app-api-o9ts.vercel.app/api/bookmarks/${bookmarkId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete bookmark");

      setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        updateBookmarkProgress,
        removeBookmark,
        fetchBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};