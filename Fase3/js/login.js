export class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  login() {
    if (this.email === "admin" && this.password === "admin") {
      return "admin"
    }else if(this.email === "estudiante" && this.password === "estudiante"){
      return "estudiante"
    }
  }
}
