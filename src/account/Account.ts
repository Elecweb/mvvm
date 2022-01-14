class Account {
  private name: string;
  private lastname: string;
  constructor({ name, lastname }: { name: string; lastname: string }) {
    this.name = name;
    this.lastname = lastname;
  }

  getFullName = () => {
    return `${this.name} ${this.lastname}`;
  };
}

export default Account;
