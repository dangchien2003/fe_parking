import Header from "../components/header";
import HistoryBuyCode from "../components/dashboard/buy-code";
import HistoryDeposit from "../components/dashboard/deposit-history";
function Dashboard() {
  return (
    <div>
      <Header />
      <div className="dashboard">
        <div className="row">
          <h3 className="name">DASHBOARD</h3>
          <div className="col-lg-6">
            <HistoryBuyCode />
          </div>
          <div className="col-lg-6">
            <HistoryDeposit />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
