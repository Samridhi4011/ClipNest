const clipboardData = [
  {
    id: 1,
    text: "npm install react-router",
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    favorite: false,
  },
  {
    id: 2,
    text: "git push origin main",
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    favorite: false,
  },
  {
    id: 3,
    text: "Leetcode DP Notes",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    favorite: false,
  },
  {
    id: 4,
    text: "React Hooks",
    createdAt: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    favorite: true,
  },
];

export default clipboardData;