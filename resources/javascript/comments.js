<script>
const API_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

// Extract ?text=ARTICLE_ID from URL
function getPageId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("text") || "default";
}

const PAGE_ID = getPageId();

// Fetch comments
async function loadComments() {
  try {
    const res = await fetch(
      `${API_URL}?action=get&page=${encodeURIComponent(PAGE_ID)}`
    );
    const comments = await res.json();
    const container = document.getElementById("comments-list");
    container.innerHTML = "";

    if (comments.length === 0) {
      container.innerHTML = "<p>No comments yet.</p>";
      return;
    }

    comments.forEach(c => {
      const div = document.createElement("div");
      div.className = "comment-item";
      div.innerHTML = `
        <strong>${escapeHtml(c.name)}</strong>
        <em>${new Date(c.timestamp).toLocaleString()}</em><br>
        ${escapeHtml(c.comment)}
      `;
      container.appendChild(div);
    });
  } catch (e) {
    console.error("Failed to load comments", e);
  }
}

// Post comment
async function postComment() {
  const name = document.getElementById("comment-name").value || "Anonymous";
  const comment = document.getElementById("comment-text").value.trim();

  if (!comment) return alert("Comment cannot be empty");

  try {
    await fetch(
      `${API_URL}?action=post&page=${encodeURIComponent(PAGE_ID)}&name=${encodeURIComponent(name)}&comment=${encodeURIComponent(comment)}`
    );
    document.getElementById("comment-text").value = "";
    document.getElementById("comment-name").value = "";
    loadComments();
  } catch (e) {
    console.error("Failed to post comment", e);
  }
}

// Basic XSS protection
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

// Load on page open
loadComments();
</script>
