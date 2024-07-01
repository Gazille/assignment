import "./styles.css";
import avatar from "../../assets/avatar.svg";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Button,
} from "reactstrap";
import { useEffect, useState } from "react";
import { ReactComponent as Power } from "../../assets/power.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Container, Row, Col } from "reactstrap";
import {
  createBankAccount,
  getBank,
  getBankAccounts,
  getBankAccountsById,
  swapBankAccount,
} from "../../appSlice";
import { BankCart } from "../../components/Card";
import React from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bankAccountsById, setBankAccountsById] = useState([]);
  const [allBankAccounts, setAllBankAccounts] = useState([]);
  const [allBank, setAllBank] = useState([]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { user } = useSelector((state) => state.apps.user.data);
  const [componentState, setComponentState] = useState({
    totalCashIn: 0,
    totalCashOut: 0,
  });
  const [pageKey, setPageKey] = useState(new Date());

  const generateRandomColor = () => {
    const rand = Math.floor(Math.random() * 10);
    const colorQ =
      "rgb(" +
      (215 - rand * 3) +
      "," +
      (185 - rand * 5) +
      "," +
      (185 - rand * 10) +
      " )";
    return colorQ;
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/login");
  };

  const fetchInitData = async () => {
    dispatch(getBankAccountsById()).then((data) => {
      setBankAccountsById(data?.payload?.data);
    });

    dispatch(getBankAccounts()).then((data) => {
      setAllBankAccounts(data?.payload?.data);
    });

    dispatch(getBank()).then((data) => {
      setAllBank(data?.payload?.data);
    });
  };

  useEffect(() => {
    fetchInitData();
  }, [pageKey]);

  useEffect(() => {
    const allTransactions = bankAccountsById.flatMap(
      (bankAccount) => bankAccount.transactions
    );
    const totalCashIn = allTransactions.reduce((accumulator, currentValue) => {
      return currentValue?.to_user_id === user?.id &&
        currentValue?.from_user_id !== currentValue?.to_user_id
        ? accumulator + currentValue?.ammount
        : accumulator;
    }, 0);

    const totalCashOut = allTransactions.reduce((accumulator, currentValue) => {
      return currentValue?.from_user_id === user?.id &&
        currentValue?.from_user_id !== currentValue?.to_user_id
        ? accumulator + currentValue?.ammount
        : accumulator;
    }, 0);

    setComponentState({
      ...componentState,
      totalCashIn,
      totalCashOut,
    });
  }, [bankAccountsById, user?.id]);

  const [swapModal, setSwapModal] = useState({
    visible: false,
    fromBankAccount: {},
  });
  const toggleModal = (bankAccount) => {
    setSwapModal({
      ...swapModal,
      visible: !swapModal.visible,
      fromBankAccount: bankAccount?.id,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const payload = {
      fromBankAccountId: swapModal.fromBankAccount,
      toBankAccountId: Number(e.target.elements.toBankAccount.value),
      note: e.target.elements.note.value,
      ammount: Number(e.target.elements.ammount.value),
    };

    dispatch(swapBankAccount(payload)).then((data) => {
      if (!data.error) {
        setSwapModal({
          visible: false,
          fromBankAccount: null,
        });
        setPageKey(new Date());
      } else {
      }
    });
  };

  const [modalAddAccount, setModalAddAccount] = useState(false);

  const toggleAddAccountModal = () => {
    setModalAddAccount(!modalAddAccount);
  };

  const handleSubmitFormAddAccount = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.elements.name.value,
      bankId: Number(e.target.elements.bankId.value),
    };
    dispatch(createBankAccount(payload)).then((data) => {
      if (!data.error) {
        setModalAddAccount(false);
        setPageKey(new Date());
      } else {
      }
    });
  };

  return (
    <React.Fragment>
      <Modal isOpen={modalAddAccount} toggle={toggleAddAccountModal}>
        <ModalHeader>Add Account</ModalHeader>
        <ModalBody>
          <Form name="add-account" onSubmit={handleSubmitFormAddAccount}>
            <FormGroup>
              <Label className="label-required" for="name">
                Name
              </Label>
              <Input id="name"></Input>
            </FormGroup>
            <FormGroup>
              <Label className="label-required" for="bankId">
                Bank
              </Label>
              <Input id="bankId" name="select" type="select">
                {allBank.map((bank) => {
                  return <option value={bank.id}>{bank.name}</option>;
                })}
              </Input>
            </FormGroup>
            <div className="d-flex justify-content-end">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={swapModal.visible} toggle={() => toggleModal()}>
        <ModalHeader toggle={() => toggleModal()}>Card Swap Modal</ModalHeader>
        <ModalBody>
          <Form name="swap-modal" onSubmit={handleSubmitForm}>
            <FormGroup>
              <Label className="label-required" for="fromBankAccount">
                From Bank Account
              </Label>
              <Input
                disabled
                id="fromBankAccount"
                name="select"
                type="select"
                defaultValue={swapModal.fromBankAccount}
              >
                {allBankAccounts.map((bankAccount) => {
                  return (
                    <option
                      value={bankAccount.id}
                    >{`${bankAccount.firstname} ${bankAccount.lastname} - ${bankAccount.name}`}</option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label className="label-required" for="toBankAccount">
                To Bank Account
              </Label>
              <Input id="toBankAccount" name="select" type="select">
                {allBankAccounts
                  .filter((a) => a.id !== swapModal.fromBankAccount)
                  .map((bankAccount) => {
                    return (
                      <option
                        value={bankAccount.id}
                      >{`${bankAccount.firstname} ${bankAccount.lastname} - ${bankAccount.name}`}</option>
                    );
                  })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label className="label-required" for="ammount">
                Ammount
              </Label>
              <Input id="ammount"></Input>
            </FormGroup>
            <FormGroup>
              <Label for="note">Note</Label>
              <Input type="textarea" id="note"></Input>
            </FormGroup>
            <div className="d-flex justify-content-end">
              <Button type="submit">Swap</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      <Container fluid key={pageKey}>
        <Dropdown
          className="vw-100 d-flex justify-content-end px-2 bg-white"
          isOpen={dropdownOpen}
          toggle={toggle}
        >
          <DropdownToggle data-toggle="dropdown" tag="span">
            <div className="p-2">
              <div className="d-flex">
                <div className="me-2">
                  <p className="m-0">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="m-0">Available</p>
                </div>
                <div>
                  <img src={avatar} alt="Avatar" className="avatar" />
                </div>
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <div
                className="d-flex justify-content-between align-items-center"
                onClick={handleLogout}
              >
                <span>Log out</span>
                <Power />
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Container fluid className="p-4 pt-100">
          <Row>
            <Col xs={24} md={24} lg={24}>
              <BankCart
                availableBalance={bankAccountsById?.length}
                availableBalanceTitle="Available Accounts"
                totalCashIn={componentState.totalCashIn}
                totalCashOut={componentState.totalCashOut}
                hideSwapButton
                transactions={bankAccountsById
                  .flatMap((bankAccount) => bankAccount.transactions)
                  .filter((item) => item)}
              />
            </Col>
            <Row className="mb-3">
              <div className="d-flex justify-content-end">
                <Button onClick={toggleAddAccountModal}>Add Account</Button>
              </div>
            </Row>
            {bankAccountsById.map((bankAccount) => {
              return (
                <Col xs={12} md={6} lg={6}>
                  <BankCart
                    title={bankAccount.name}
                    cardColor={generateRandomColor()}
                    availableBalance={
                      Number(bankAccount.debit) -
                      Number(bankAccount.init_deposit)
                    }
                    totalCashIn={(bankAccount.transactions || []).reduce(
                      (accumulator, currentValue) => {
                        return currentValue?.to_bank_id === bankAccount.id
                          ? accumulator + currentValue?.ammount
                          : accumulator;
                      },
                      0
                    )}
                    totalCashOut={(bankAccount.transactions || []).reduce(
                      (accumulator, currentValue) => {
                        return currentValue?.from_bank_id === bankAccount.id
                          ? accumulator + currentValue?.ammount
                          : accumulator;
                      },
                      0
                    )}
                    onSwap={() => toggleModal(bankAccount)}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
