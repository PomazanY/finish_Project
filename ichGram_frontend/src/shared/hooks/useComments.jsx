import { useCallback, useState } from "react";
import {
  addComment as addCommentApi,
  likeComment as likeCommentApi,
} from "../api/comment-api";

export function useComments({ onChanged } = {}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const addComment = useCallback(async ({ postId, description }) => {
    setPending(true);
    setError(null);
    try {
      const created = await addCommentApi({ postId, description });
      onChanged?.(created);
      return created;
    } catch (e) {
      setError(e);
      throw e;
    }
    finally {
      setPending(false);
    }
  }, [onChanged]);



  const likeComment = useCallback(
    async (commentId) => {
      setPending(true);
      setError(null);
      try {
        await likeCommentApi(commentId);
        onChanged?.();
      } catch (e) {
        console.error("Ошибка при лайке комментария", e);
        setError(e);
      } finally {
        setPending(false);
      }
    },
    [onChanged]
  );

  return { addComment, likeComment, pending, error };
}
