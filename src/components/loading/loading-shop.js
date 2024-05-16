import LoadingLineRun from "./loading-line-run";

function LoadingShop({ quantity }) {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push(
      <div className="col-lg-3 item" key={i}>
        <LoadingLineRun />
      </div>
    );
  }
  return <div className="row">{items}</div>;
}
export default LoadingShop;
