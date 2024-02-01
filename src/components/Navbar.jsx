import { FaGithub } from 'react-icons/fa';
import { CiViewList } from 'react-icons/ci';

function Navbar() {
  return (
    <div className="flex shrink-0 basis-14 items-center justify-between px-7">
      {/* A logo should be added on future updates. */}
      <div className="flex items-center gap-2">
        <CiViewList size="1.4rem" />
        <span className="text-2xl">Kan-Do</span>
      </div>

      {/* Links to Github repo and socials. */}
      <div>
        <a href="https://github.com/ADPenrose/kan-do">
          <FaGithub size="1.4rem" />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
