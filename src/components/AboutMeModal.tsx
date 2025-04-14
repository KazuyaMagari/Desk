import "./AboutMe.css";

interface AboutMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AboutMeModal({ isOpen, onClose }: AboutMeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="window" onClick={(e) => e.stopPropagation()}>
        <div className="window__title-bar">
          <div className="window__title">About Me</div>
          <button className="window__btn" onClick={onClose}>
            &times;
            <span>Close</span>
          </button>
        </div>
        <div className="window__body">
          <h2>About Me</h2>
          <p>
            Hello! I'm a passionate developer with experience in web development
            and 3D graphics. I love creating interactive and visually appealing
            web applications.
          </p>
          <h3>Skills</h3>
          <ul>
            <li>
              Languages: HTML, CSS, JavaScript, TypeScript, Python, C#, C++, C,
              R
            </li>
            <li>
              Frameworks: React, Node.js, Express, Tailwind CSS, Bootstrap,
              Django
            </li>
            <li>Tools: Git, GitHub, VSCode, Cursor</li>
            <li>Databases: MongoDB, MySQL, Firebase, SupaBase</li>
            <li>3D Graphics: Three.js, WebGL</li>
            <li>Web Development: Responsive Design, API Integration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default AboutMeModal;
