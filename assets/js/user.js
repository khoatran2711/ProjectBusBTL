
class User {

    constructor() {
        this.localKey = 'tbl_users';
        this.admin = [{
            userName: 'admin',
            fullName: 'admin',
            password: 'admin',
            email: 'admin@gmail.com',
            gender: 'nam',
            role: 'admin',
            date: '20/2/2022',
        },
        {
            userName: 'company',
            fullName: 'company',
            password: 'company',
            email: 'company@gmail.com',
            gender: 'nam',
            role: 'company',
            date: '20/2/2022',
        }],
            this.data = this.load();
        this.userName = '';
        this.fullName = '';
        this.password = '';
        this.email = '';
        this.date = '';
        this.gender = '';
        this.role = 'member';

    }

    save() {
        localStorage.setItem(this.localKey, JSON.stringify(this.data))
    }

    load() {
        let userList = this.admin;
        if (localStorage.hasOwnProperty(this.localKey)) {
            return JSON.parse(localStorage.getItem(this.localKey))
        } else {
            return userList
        }

    }

    add() {

        this.data.push({
            userName: this.userName,
            fullName: this.fullName,
            password: this.password,
            email: this.email,
            gender: this.gender,
            role: this.role,
            date: this.date,
        });
        this.save()
    }

    check(index) {
        if (index in this.data) {
            this.userName = this.data[index].userName;
            this.fullName = this.data[index].fullName;
            this.email = this.data[index].email;
            this.gender = this.data[index].gender;
            this.role = this.data[index].role;
            this.date = this.data[index].date;
            return true;
        }
        return false;
    }
    update(index) {
        this.data[index].userName = this.userName;
        this.data[index].fullName = this.fullName;
        this.data[index].email = this.email;
        this.data[index].gender = this.gender;
        this.data[index].role = this.role;
        this.data[index].date = this.date;
        this.save()
    }

}



function register() {

    //obj viết tắt của Object = đối tượng
    let objUser = new User;
    console.log(objUser.data)
    let day = document.querySelector('#day').value
    let month = document.querySelector('#month').value
    let year = document.querySelector('#year').value
    objUser.userName = document.querySelector('#userName').value;
    objUser.fullName = document.querySelector('#fullName').value;
    objUser.password = document.querySelector('#password').value;
    objUser.email = document.querySelector('#email').value;
    objUser.date = day + '/' + month + '/' + year;
    objUser.gender = document.querySelector("input[name='sex']").value;
    for (let key in objUser.data) {
        if (objUser.data[key].userName == objUser.userName || objUser.data[key].email == objUser.email) {
            document.querySelector('#userName').value = '',
                document.querySelector('#fullName').value = '',
                document.querySelector('#password').value = '',
                document.querySelector('#email').value = '',
                document.querySelector('#day').value = '',
                document.querySelector('#month').value = '',
                document.querySelector('#year').value = '',
                document.querySelector("input[name='sex']").value = '';
            return alert('tài khoản đã tồn tại')
        } else {
            objUser.add()
            document.querySelector('#userName').value = '',
                document.querySelector('#fullName').value = '',
                document.querySelector('#password').value = '',
                document.querySelector('#email').value = '',
                document.querySelector('#day').value = '',
                document.querySelector('#month').value = '',
                document.querySelector('#year').value = '',
                document.querySelector("input[name='sex']").value = '';
            alert('đăng ký thành công')
            return location.href = 'login.html'
        }
    }
}
function login() {

    //obj viết tắt của Object = đối tượng
    let objUser = new User;
    objUser.userName = document.querySelector('#userName').value;
    objUser.password = document.querySelector('#password').value;
    if (objUser.userName != null && objUser.password != null) {
        for (let key in objUser.data) {
            if (objUser.userName == objUser.data[key].userName && objUser.password == objUser.data[key].password) {
                sessionStorage.setItem(objUser.localKey, JSON.stringify(objUser.data[key]));
                alert('đăng nhập thành công')
                switch (objUser.data[key].role) {
                    case 'member':
                        window.location.href = 'home.html'
                        break;
                    case 'admin':
                        window.location.href = 'admin.html'
                        break;
                    case 'company':
                        window.location.href = 'page-company.html'
                        break;
                    default:
                        break;
                }
                return 0;
            }

        }
        alert('tài khoản mật khẩu không chính xác')
        document.querySelector('#userName').value = '';
        document.querySelector('#password').value = '';
    } else {
        alert('vui lòng nhập tài khoản và mật khẩu trước khi đăng nhập')
    }
}
function permission(index) {
    let objUser = new User;

    let user_login = JSON.parse(sessionStorage.getItem(objUser.localKey))
    if (user_login != null) {
        if (user_login.role == index) {
            return true
        } else {
            return false
        }

    } else {
        return false
    }
}
function editUser(index) {
    let objUser = new User;
    if (objUser.check(index)) {
        document.location.hash = '#edit'
        document.querySelector('#edit-userName').value = objUser.userName;
        document.querySelector('#edit-email').value = objUser.email;
        document.querySelector('#btn-edit-user').setAttribute('data-index', index);
    }
}
function updateUser() {
    let objUser = new User;
    let index = document.querySelector('#btn-edit-user').getAttribute('data-index');
    objUser.userName = document.querySelector('#edit-userName').value;
    objUser.email = document.querySelector('#edit-email').value;
    objUser.update(index)
    location.hash = '#finish'
    showUser();
}
function remove(index) {
    let objUser = new User;
    if (confirm('Bạn có muốn xóa user ??')) {
        objUser.data.splice(index, 1);
        objUser.save();
        showUser()
    }

}
function showUser() {
    let tableBody = document.querySelector('#tbUser tbody');
    let tr = ' ';
    let stt = 0
    let objUser = new User;
    for (let key in objUser.data) {
        stt++
        tr += '<tr>';
        tr += '<td>' + stt + '</td>' + '<td>' + objUser.data[key].userName + '</td>' + '<td>' + objUser.data[key].password + '</td>' + '<td>' + objUser.data[key].email + '</td>' + '<td>' + objUser.data[key].role + '</td>' + '<td>' + '<button class="buton" onclick="editUser(' + key + ')"> sửa </button>' + '<button class="buton" onclick="remove(' + key + ')"> xóa </button>' + '</td>'
        tr += '</tr>'
    }
    tableBody.innerHTML = tr;
}
function showCompany() {
    let table = document.querySelector('#tbl_showCompany tbody');
    let objUser = new User;
    let objBus = new Bus;
    let tr = '';
    let stt = 0;
    let count = 0;
    for (let key in objBus.data) {
        if (objBus.data[key].status == 'đang hoạt động') {
            count++;
        }
    }
    for (let key in objUser.data) {
        if (objUser.data[key].role == 'company') {
            stt++;
            tr += '<tr>';
            tr += '<td>' + stt + '</td>' + '<td>' + objUser.data[key].fullName + '</td>' + '<td>' + objUser.data[key].email + '</td>' + '<td>' + count + '</td>';
        }
    }
    table.innerHTML = tr;

}
function getOut(){
    if(confirm('Hủy hợp đồng chứ ??')){
        location.hash = 'admin.html'
    }

}
