import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import { FaCreditCard } from "react-icons/fa"; // Font Awesome Icon

const BankCart = ({
  title = "",
  availableBalance = "0",
  availableBalanceTitle = "Available Balance",
  totalCashIn = "0",
  totalCashOut = "0",
  cardColor = "white",
  onSwap,
  hideSwapButton = false,
  transactions = [],
}) => {
  return (
    <Card
      className="mb-4 rounded shadow border-0"
      style={{ backgroundColor: cardColor }}
    >
      <CardBody className="d-flex flex-column justify-content-between h-100 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <FaCreditCard size={32} className="text-primary" />
          <CardTitle tag="h5" className="text-primary">
            {title}
          </CardTitle>
        </div>
        <div className="text-center mb-3">
          <h2 className="display-4 font-weight-bold">{availableBalance}</h2>
          <p className="text-muted mb-0">{availableBalanceTitle}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="mr-3">
            <h5 className="d-inline-block mb-0 ml-2">Cash In</h5>
            <h5 className="mb-0 " style={{ color: "green" }}>
              + {totalCashIn}
            </h5>
          </div>
          <div>
            <h5 className="d-inline-block mb-0 ml-2">Cash Out</h5>
            <h5 className="text-danger mb-0">- {totalCashOut}</h5>
          </div>
        </div>
        {!hideSwapButton && (
          <div className="mt-3 justify-center">
            <Button
              className="bg-white mb-0"
              style={{ color: "black" }}
              onClick={() => onSwap()}
            >
              Swap
            </Button>
          </div>
        )}
        <div>
          <p className="text-muted mb-0">Recent Transactions</p>
          {transactions.length && (
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>From UserId</th>
                  <th>To UserId</th>
                  <th>From BankId</th>
                  <th>To BankId</th>
                  <th>Ammount</th>
                  <th>Created At</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 4).map((item, index) => {
                  return (
                    <tr>
                      <th scope="row">{index}</th>
                      <td>{item?.from_user_id}</td>
                      <td>{item?.to_user_id}</td>
                      <td>{item?.from_bank_id}</td>
                      <td>{item?.to_bank_id}</td>
                      <td>{item?.ammount}</td>
                      <td>{item?.created_at}</td>
                      <td>{item?.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export { BankCart };
