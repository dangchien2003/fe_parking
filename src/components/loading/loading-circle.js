function LoadingCircle({ width, center }) {
  return (
    <div className="mt-3" style={center && { textAlign: "center" }}>
      <img className="loading" src="/svg/loading.svg" style={{ width }} />
    </div>
  );
}

export { LoadingCircle };
