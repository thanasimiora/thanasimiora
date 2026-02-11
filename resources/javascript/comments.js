const API_URL =
  "https://script.google.com/macros/s/AKfycby-C1jB5kHoELxa__j5k09aJIlpafvAMCp923kKRJvshqExHGhD4mqHys-GDX235ZYUaQ/exec";
const params = new URLSearchParams(window.location.search);
const articles = 28;
const v = articles - params.get("text");


const PAGE_ID = window.location.pathname+"?text="+v;

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
 
  if (!comment) return alert("Comment cannot be empty");
  try {
    const params = new URLSearchParams(window.location.search);
  const v = articles.length - params.get("text");
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








