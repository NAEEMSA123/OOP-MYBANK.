#!user/bin/env node
import inquirer from "inquirer";

// Bank Account interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

// Bank Account Class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  // Debit money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `withdrawal of $${amount} successful. Remaining balance $${this.balance}`
      );
    } else {
      console.log("Insufficient balance");
    }
  }

  // Credit money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; // $1 fee charges if more then $100 is deposited
    }
    this.balance + amount;
    console.log(
      `Deposit of $${amount} successful. Remaining balance $${this.balance}`
    );
  }
  // Check Balance
  checkBalance(): void {
    console.log(`Current balance $${this.balance}`);
  }
}

// customer class
class customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobilNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobilNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobilNumber = mobilNumber;
    this.account = account;
  }
}

// Creat bank account

const accounts: BankAccount[] = [
  new BankAccount(2002, 1000),
  new BankAccount(3003, 1000),
  new BankAccount(4004, 1000),
];

// create customers
const customers: customer[] = [
  new customer("Naeem", "Ahmed", "Male", 35, 3163456789, accounts[0]),
  new customer("Sarim", "Ali", "Male", 15, 3363456789, accounts[1]),
  new customer("Abiyan", "Raza", "Male", 35, 4163456789, accounts[2]),
];

// function to interact with bank account

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      name: "accountNumber",
      type: "number",
      message: "Enter your account number",
    });

    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if(customer){
        console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
        const ans = await inquirer.prompt([{
            name:"select",
            type:"list",
            message:"select an operation",
            choices:["Deposit", "Withdraw", "Check balane", "Exit"]
        }]);

        switch (ans.select){
            case "Deposit":
                const depositAmount = await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:"Enter the amount to deposit:"
                });
                customer.account.deposit(depositAmount.amount);
                break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Enter the amount to deposit:"
                    });
                    customer.account.withdraw(WithdrawAmount.amount);
                    break;

                    case "Check balane":
                        customer.account.checkBalance();
                        break;
                        case "Exit":
                            console.log(" Exiting bank programme...");
                            console.log("\n Thank you for using our bank services Have a Great day!");
                             return;
                            
                            
                    
        }
    }else{
        console.log("Invailid account number. please try again");
        
    }
  } while (true);
}
service();
