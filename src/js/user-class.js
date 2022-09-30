export class User {
  constructor() {
    this.email = '';
    this.id = '';
    this.idLocal = '';
    this.isLogin = false;
  }

  userLogin(email, id, idLocal) {
    this.email = email;
    this.id = id;
    this.idLocal = idLocal;
    this.isLogin = true;
  }
  userLogout() {
    this.email = '';
    this.id = '';
    this.idLocal = '';
    this.isLogin = false;
  }
}
