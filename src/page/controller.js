import { useState } from "react";

function Controller() {
  const [message, setMessage] = useState("");
  const loadApi = async (url) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE}/${url}`, {
        method: "GET",
      });
      const data = await response.json();
      setMessage(JSON.stringify(data));
    } catch (err) {
      setMessage(err.toString());
    }
  };

  const handleRunLoadApi = () => {
    loadApi("load/run");
  };
  const handleStopLoadApi = () => {
    loadApi("load/stop");
  };
  const handleRunTpbank = () => {
    loadApi("tpbank/run?author=admin");
  };
  const handleStopTpbank = () => {
    loadApi("tpbank/stop?author=admin");
  };
  return (
    <div>
      <div>{message}</div>
      <div>
        <h3>Load api</h3>
        <button
          style={{ margin: "5px" }}
          onClick={handleRunLoadApi}
          className="btn btn-success"
        >
          Chạy
        </button>
        <button
          style={{ margin: "5px" }}
          onClick={handleStopLoadApi}
          className="btn btn-danger"
        >
          Dừng
        </button>
      </div>
      <div>
        <h3>Run auto tpbank</h3>
        <button
          style={{ margin: "5px" }}
          onClick={handleRunTpbank}
          className="btn btn-success"
        >
          Chạy
        </button>
        <button
          style={{ margin: "5px" }}
          onClick={handleStopTpbank}
          className="btn btn-danger"
        >
          Dừng
        </button>
      </div>
    </div>
  );
}

export default Controller;
