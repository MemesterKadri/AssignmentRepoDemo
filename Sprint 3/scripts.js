// Common Logout Functionality
function logout() {
    localStorage.removeItem("userData");
    window.location.href = "vitalsLogin.html";
  }
  
  // Check authentication status
  function checkAuth(role) {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user || user.role !== role) {
      window.location.href = "vitalsLogin.html";
    }
  }
  
  // Email Verification Redirect
  function goToHome() {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      window.location.href =
        user.role === "patient" ? "patient-homepage.html" : "provider-homepage.html";
    } else {
      window.location.href = "vitalsLogin.html";
    }
  }
  
  // Load and display messages for the logged-in user (if chat-box exists)
  function loadMessages() {
    const user = JSON.parse(localStorage.getItem("userData"));
    const messageContainer = document.getElementById("messageContainer");
    if (!user || !messageContainer) return;
  
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const relevantMessages = messages.filter(
      (msg) => msg.patientEmail === user.email || msg.providerEmail === user.email
    );
  
    if (relevantMessages.length > 0) {
      messageContainer.innerHTML = "";
      relevantMessages.forEach((msg) => {
        const msgEl = document.createElement("div");
        msgEl.classList.add("mb-2", "p-2", "border", "rounded", "bg-white");
  
        const senderLabel =
          user.role === "patient"
            ? `To ${msg.providerName || msg.providerEmail}`
            : `To ${msg.patientName || msg.patientEmail}`;
  
        msgEl.textContent = `${senderLabel}: ${msg.content}`;
        messageContainer.appendChild(msgEl);
      });
    } else {
      messageContainer.innerHTML =
        "<div class='card p-3 bg-light text-dark'>No new messages.</div>";
    }
  }
  
  // Send a new reply and store it
  function sendReply() {
    const user = JSON.parse(localStorage.getItem("userData"));
    const replyInput = document.getElementById("replyBox");
    if (!user || !replyInput) return;
  
    const reply = replyInput.value.trim();
    if (!reply) return;
  
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
  
    let recipientEmail = "unknown@provider.com";
    let patientName = "", patientEmail = "", providerName = "", providerEmail = "";
  
    if (user.role === "patient") {
      providerEmail = "provider@clinic.com"; // simplified fallback
      const lastMsg = messages.find(m => m.patientEmail === user.email);
      if (lastMsg) providerEmail = lastMsg.providerEmail;
      patientEmail = user.email;
      patientName = user.name;
      providerName = "Provider";
    } else {
      const firstMsgFromPatient = messages.find(m => m.providerEmail === user.email);
      if (firstMsgFromPatient) {
        patientEmail = firstMsgFromPatient.patientEmail;
        patientName = firstMsgFromPatient.patientName || "Patient";
      } else {
        patientEmail = "unknown@patient.com";
        patientName = "Unknown Patient";
      }
      providerEmail = user.email;
      providerName = user.name;
    }
  
    const newMessage = {
      patientEmail,
      providerEmail,
      patientName,
      providerName,
      content: reply,
    };
  
    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));
    replyInput.value = "";
    loadMessages(); // refresh UI
  }
  
  // Run on page load if chat box exists
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".chat-box")) {
      loadMessages();
    }
  });
  