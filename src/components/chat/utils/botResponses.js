// src/components/chat/utils/botResponses.js

const responses = [
  {
    keywords: ["hello", "hi", "hey"],
    reply: "Hi there! 👋 How can I assist you on SikshaWeb today?"
  },
  {
    keywords: ["course", "enroll", "learning"],
    reply: "To enroll in a course, just go to the Courses page, click on a course, and hit 'Enroll Now'!"
  },
  {
    keywords: ["quiz", "test"],
    reply: "Quizzes are available under the Quizzes section in your dashboard. Complete them to earn rewards and track progress!"
  },
  {
    keywords: ["dashboard", "profile", "account"],
    reply: "You can access your personalized dashboard from the top menu. It includes your progress, courses, and more."
  },
  {
    keywords: ["ai", "chatbot", "bot"],
    reply: "I'm your AI assistant 🤖 here to help with basic queries. Advanced AI features will be available soon!"
  },
  {
    keywords: ["dark", "theme", "toggle"],
    reply: "You can toggle between light and dark theme using the switch available on your dashboard or settings."
  },
  {
    keywords: ["not working", "issue", "problem"],
    reply: "Oops! Please refresh the page or report the issue using the Contact form in the footer. We'll fix it ASAP!"
  },
  {
    keywords: ["bye", "goodbye"],
    reply: "Goodbye! Hope you have a great learning experience on SikshaWeb! 👋"
  },
  {
    keywords: ["help"],
    reply: "Sure! You can ask me about courses, dashboard, quizzes, enrollment, or any issue you're facing."
  },
  {
    keywords: ["better", "why sikshaweb", "why this platform"],
    reply: "SikshaWeb stands out with its all-in-one learning experience: live code compiler, AI chatbot, personalized dashboards, interactive quizzes, and certification – all in a beautifully designed interface."
  },
  {
    keywords: ["compare", "other platforms", "udemy", "coursera"],
    reply: "Unlike other platforms, SikshaWeb offers integrated tools like live compiler, quiz performance tracking, and real-time assistance – making learning more interactive and efficient."
  }
];

export function getBotReply(message) {
  const lower = message.toLowerCase();

  for (const item of responses) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.reply;
    }
  }

  return "I'm not sure how to respond to that yet. Try asking about courses, dashboard, or quizzes.";
}
