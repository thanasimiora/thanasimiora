const API_URL =
  "https://script.google.com/macros/s/AKfycby-C1jB5kHoELxa__j5k09aJIlpafvAMCp923kKRJvshqExHGhD4mqHys-GDX235ZYUaQ/exec";


// Unique per page + query
const PAGE_ID = window.location.pathname + window.location.search;

console.log("PAGE_ID:", PAGE_ID);

async function loadComments() {
  try {
    const res = await fetch(
      API_URL +
        "?action=get&page=" +
        encodeURIComponent(PAGE_ID)
    );

    const comments = await res.json();
    const container = document.getElementById("comments-list");
    container.innerHTML = "";

    if (!comments || comments.length === 0) {
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
  } catch (err) {
    console.error("Load failed", err);
  }
}

async function postComment() {
  const name =
    document.getElementById("comment-name").value || "Ανώνυμος";
  const comment =
    document.getElementById("comment-text").value.trim();

  if (!comment) return alert("Comment cannot be empty");

  try {
    await fetch(
      API_URL +
        "?action=post" +
        "&page=" + encodeURIComponent(PAGE_ID) +
        "&name=" + encodeURIComponent(name) +
        "&comment=" + encodeURIComponent(comment)
    );

    document.getElementById("comment-text").value = "";
    document.getElementById("comment-name").value = "";
    loadComments();
  } catch (err) {
    console.error("Post failed", err);
  }
}

// Simple XSS protection
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, c =>
    ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;" }[c])
  );
}

loadComments();







