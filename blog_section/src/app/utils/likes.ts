// Utility functions for managing likes with localStorage
// This tracks likes per machine without requiring login

const LIKES_KEY_PREFIX = "blog_like_";
const MACHINE_ID_KEY = "blog_machine_id";

// Generate a unique machine ID if it doesn't exist
function getMachineId(): string {
  let machineId = localStorage.getItem(MACHINE_ID_KEY);
  
  if (!machineId) {
    // Generate a random ID for this machine
    machineId = `machine_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(MACHINE_ID_KEY, machineId);
  }
  
  return machineId;
}

// Check if the current machine has liked a specific blog post
export function hasLiked(blogId: string): boolean {
  const key = `${LIKES_KEY_PREFIX}${blogId}`;
  return localStorage.getItem(key) === "true";
}

// Toggle like for a blog post
export function toggleLike(blogId: string): boolean {
  const key = `${LIKES_KEY_PREFIX}${blogId}`;
  const currentlyLiked = hasLiked(blogId);
  
  if (currentlyLiked) {
    localStorage.removeItem(key);
    return false;
  } else {
    localStorage.setItem(key, "true");
    return true;
  }
}

// Get machine ID (useful for analytics)
export { getMachineId };
