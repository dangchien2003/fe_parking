function LoadingCircle(input) {
  return (
    <div className="text-center mt-3">
      <img
        className="loading"
        src="/svg/loading.svg"
        style={{ width: input.width }}
      />
    </div>
  );
}

export { LoadingCircle };
