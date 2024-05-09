function LoadingLineRun({ quality }) {
  quality = 10;
  const lines = [];
  for (let i = 1; i <= quality; i++) {
    lines.push(
      <div key={i} className="line-parent">
        <div className="line-child child-1">
          <div className="load"></div>
        </div>
        <div className="line-child child-2">
          <div className="load"></div>
        </div>
        <div className="line-child child-3">
          <div className="load"></div>
        </div>
      </div>
    );
  }
  return <div className="loading-run-line ">{lines}</div>;
}

export default LoadingLineRun;
