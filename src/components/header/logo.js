import { memo } from "react";

function Logo({ hideText }) {
  return (
    <div>
      <img src={`/img/logo.png`} className="size-logo" alt="logo" />
      <span
        className="logo-text text-white hide"
        style={
          hideText ? { animation: "resize-logo 1s ease", fontSize: "18px" } : {}
        }
      >
        arking
      </span>
    </div>
  );
}

export default memo(Logo);
