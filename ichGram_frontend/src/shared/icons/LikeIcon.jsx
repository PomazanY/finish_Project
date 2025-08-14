const LikeIcon = ({ filled = false, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill={filled ? "#e74c3c" : "none"} 
    stroke="#262626"
    // strokeWidth="2"
    // strokeLinecap="round"
    // strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.53
             C11.09 5.01 12.76 4 14.5 4
             17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default LikeIcon;