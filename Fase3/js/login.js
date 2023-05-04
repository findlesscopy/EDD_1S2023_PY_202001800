export class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  login() {
    if (this.email === "admin" && this.password === "admin") {
      return "admin"
    }
  }
}
