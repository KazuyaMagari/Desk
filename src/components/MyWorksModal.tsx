import "./AboutMe.css";

interface MyWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MyWorksModal({ isOpen, onClose }: MyWorksModalProps) {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="window" onClick={(e) => e.stopPropagation()}>
        <div className="window__title-bar">
          <div className="window__title">My Works</div>
          <button className="window__btn" onClick={onClose}>
            &times;
            <span>Close</span>
          </button>
        </div>
        <div className="window__body">
          <h2>My Works</h2>
          <p>
            Here are some of my recent projects and works. Each project
            showcases different aspects of my skills and experience.
          </p>
          <h3>Projects</h3>
          <ul>
            <li>Project 1</li>
            <li>Project 2</li>
            <li>Project 3</li>
            <li>Project 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyWorksModal;
