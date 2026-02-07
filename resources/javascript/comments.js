const API_URL =
  "https://script.google.com/macros/s/AKfycbz4cc8jSe91ADsF5Mpzn30Rfq7kOxVK2lyoaI6YAfXtcoTVFHu3rKhhABs9tT75wLgTOA/exec"; // Your Google Apps Script URL
const PAGE_ID = window.location.pathname;

// Fetch and display comments
async function loadComments() {
  try {
    const res = await fetch(
      `${API_URL}?action=get&page=${encodeURIComponent(PAGE_ID)}`,
    );
    const comments = await res.json();
    const container = document.getElementById("comments-list");
    container.innerHTML = "";
    if (comments.length === 0)
      container.innerHTML = "<p>Δεν υπάρχουν σχόλια ακόμη.</p>";
    comments.forEach((c) => {
      const div = document.createElement("div");
      div.className = "comment-item";
      div.innerHTML = `<strong>${c.name}</strong> <em>${new Date(c.timestamp).toLocaleString()}</em><br>${c.comment}`;
      container.appendChild(div);
    });
  } catch (e) {
    console.error(e);
  }
}

async function postComment() {
  const name = document.getElementById("comment-name").value || "Anonymous";
  const comment = document.getElementById("comment-text").value;
  if (!comment) return alert("Comment cannot be empty");
  try {
    await fetch(
      `${API_URL}?action=post&page=${encodeURIComponent(PAGE_ID)}&name=${encodeURIComponent(name)}&comment=${encodeURIComponent(comment)}`,
    );
    document.getElementById("comment-text").value = "";
    document.getElementById("comment-name").value = "";
    loadComments();
  } catch (e) {
    console.error(e);
  }
}

loadComments();
