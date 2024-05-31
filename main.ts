import inquirer from "inquirer";

// Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void 
    deposite(amount: number): void
    checkBalance(): void
}

//Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    // Debit Money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`Withdrawl of $${amount} successful. Remaining balance: $${this.balance}`);  
        } else {
            console.log("Insufficient balance.");
            
        }
    }
    // Credit money
    deposite(amount: number): void {
        if(amount >100){
            amount -= 1; // $1 fee charged if more thn $100 is deposited. 

        }this.balance += amount; 
        console.log(`Deposite of $${amount} success. Remaining balance: $${this.balance}`);
        
    }

    // Check balance
    checkBalance(): void {
        console.log(`Current balance : $${this.balance}`);
        
    }
}

// Customer class 
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account:BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    } 
}

// Create  bank account

const accounts: BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000),
];

//Creat ustomers 

const customers: Customer[]= [
    new Customer ("Hamza", "Khan","Male", 35, 3162223334, accounts[0] ),
    new Customer ("Qurat", "Khan","Female", 43, 3332223334, accounts[1] ),
    new Customer ("Samir", "Khan","Male", 36, 3412223334, accounts[2] )
]

// Function to interact with bank account

async function service() {
    do{
      const accountNumberInput = await inquirer.prompt({
       name: "accountNumber",
       type: "number",
       message: "Enter your account number:"
      })

      const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
      if(customer){
        console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
        const ans = await inquirer.prompt([{
            name: "select",
            type: "list",
            message: " Slect an operation",
            choices: ["Deposite","Withdraw","Check Balance","Exit"]
        }]);
        switch (ans.select){
            case "Deposite":
                const depositeAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to deposite:"
                })
                customer.account.deposite(depositeAmount.amount);
                break;
                case "Withdraw":
                const WithdrawAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                })
                customer.account.withdraw(WithdrawAmount.amount)
                break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                    case "Exit":
                        console.log("Exiting bank programe");
                        console.log("\n Thank You for using our bank services. Have a Great Day!");
                        return;

                        
                        
        }
        
      } else {
        console.log("Invalid account number. Please try again!");
        
      }
    } while(true)
}

service()

