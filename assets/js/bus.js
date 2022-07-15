
class Bus {

    constructor() {
        this.storage_key = 'tbl_bus';
        this.data = this.load();

        this.status = 'Chờ xét duyệt';
        this.ironNumber = '';
        this.mainPeople = '';
        this.seccondPeople = '';
        this.time = ''
    }

    //hàm có chức năng load dư liệu từ stoage
    load() {
        if (localStorage.hasOwnProperty(this.storage_key)) {
            return JSON.parse(localStorage.getItem(this.storage_key));
        }
        return [];
    }

    //hàm có chức năng check key xem có tồn tại trong dữ liệu hay ko
    check(index) {
        if (index in this.data) {
            this.ironNumber = this.data[index].ironNumber;
            this.time = this.data[index].time;
            this.mainPeople = this.data[index].mainPeople;
            this.seccondPeople = this.data[index].seccondPeople;
            return true;
        }
        return false;
    }

    update(index) {
        this.data[index].status = this.status
        this.data[index].ironNumber = this.ironNumber;
        this.data[index].time = this.time;
        this.data[index].mainPeople = this.mainPeople;
        this.data[index].seccondPeople = this.seccondPeople;
        this.save();
    }

    add() {

        this.data.push({
            ironNumber: this.ironNumber,
            status: this.status,
            mainPeople: this.mainPeople,
            seccondPeople: this.seccondPeople,
            time: this.time
        });

        this.save();
    }


    save() {
        localStorage.setItem(this.storage_key, JSON.stringify(this.data));
    }
    delete_all() {
        this.data.splice(0, this.data.length)
    }


}

function add() {
    let objBus = new Bus;
    objBus.ironNumber = document.querySelector('#add-ironNumber').value;
    objBus.time = document.querySelector('#add-time').value;
    objBus.mainPeople = document.querySelector('#add-mainPeople').value;
    objBus.seccondPeople = document.querySelector('#add-peopleNd').value;
    objBus.add();
    // document.querySelector('#add-ironNumber').value = '';
    // document.querySelector('#add-time').value = '';
    // document.querySelector('#add-mainPeople').value = '';
    // document.querySelector('#add-peopleNd').value = '';
    document.location.hash = '#finish';
    show();
}

function destroy(index) {
    if (confirm('Bạn có đồng ý xóa không?')) {
        let objBus = new Bus;
        if (index > -1) {
            objBus.data.splice(index, 1);
            objBus.save();
            show();
        }
    }
}

function edit(index) {

    let objBus = new Bus;
    if (objBus.check(index)) {
        document.location.hash = '#edit';
        document.querySelector('#edit-ironNumber').value = objBus.ironNumber;
        document.querySelector('#edit-time').value = objBus.time;
        document.querySelector('#edit-mainPeople').value = objBus.mainPeople;
        document.querySelector('#edit-peopleNd').value = objBus.seccondPeople;
        document.querySelector('#btn-edit-bus').setAttribute('data-index', index);
    }

}

function update() {

    let index = document.querySelector('#btn-edit-bus').getAttribute('data-index');
    let objBus = new Bus;
    if (objBus.check(index)) {
        objBus.ironNumber = document.querySelector('#edit-ironNumber').value;
        objBus.time = document.querySelector('#edit-ironNumber').time;
        objBus.mainPeople = document.querySelector('#edit-mainPeople').value;
        objBus.seccondPeople = document.querySelector('#edit-peopleNd').value;
        objBus.update(index);
    }
    document.location.hash = '#finish';
    show();

}

function show() {
    let objBus = new Bus;
    let table = document.querySelector('#tblList tbody');
    let tr = '';
    let stt = 0;
    objBus.data.reverse();
    for (let key in objBus.data) {
        stt++;
        let reverse_key = objBus.data.length - key - 1;
        let bus = objBus.data[key];
        tr += '<tr>';
        tr += '<td>' + stt + '</td><td>' + bus.ironNumber + '</td><td>' + bus.mainPeople + '</td><td>' + bus.seccondPeople + '</td><td>' + bus.status + '</td>';
        tr += '<td><button type="button" onclick="edit(' + reverse_key + ')" class="btn-edit">Sửa</button><button type="button" onclick="destroy(' + reverse_key + ')" class="btn-delete">Xóa</button></td>';
        tr += '</tr>';
    }
    table.innerHTML = tr;

}
function delete_all() {
    if (confirm('Bạn có muốn xóa tất cả bus ??')) {
        let objBus = new Bus;
        objBus.delete_all();
        objBus.save();
        show();
    }

}
function acceptBus(index) {
    let objBus = new Bus;
    if (objBus.check(index)) {
        objBus.status = 'đang hoạt động'
        objBus.update(index);
    }
    document.location.hash = '#finish';
    showBus_manager();

}


function showBus_manager() {

    let objBus = new Bus;
    console.log(objBus.data)
    let tr = '';
    let stt = 0;
    let table = document.querySelector('#acpt-bus #tbl-apct tbody')
    console.log(table)

    if (objBus.data != null) {
        for (let key in objBus.data) {
            stt++
            if (objBus.data[key].status === 'Chờ xét duyệt') {
                tr += '<tr>';
                tr += '<td>' + stt + '</td>' + '<td>' + objBus.data[key].ironNumber + '</td>' + '<td><button type="button" onclick ="acceptBus(' + key + ')">accept </button></td>' + '<td><button type="button" onclick ="acceptBus(' + key + ')">accept </button></td>';
                tr += '</tr>';

            }

        }
        console.log(tr)
        table.innerHTML = tr;



    } else {
        alert('khong co')
    }

}
function countdow(time) {
    var xtime = new Date();
    var findtime = xtime.getHours() * 60 + xtime.getMinutes();
    var changeTime = time.split(':');
    var time = parseInt(changeTime[0], 10) * 60 + parseInt(changeTime[1], 10);
    var minutes = time - findtime;
    var seconds = 60 - xtime.getSeconds();
    if (minutes <= 60) {
        return [minutes, seconds];
    } else {
        var hours = Math.floor(minutes / 60);
        var minute = Math.floor((minutes / 60 - hours) * 60);
        return [minute, seconds, hours]
    }
}
function findBus() {
    let fd_bus = [];
    let busFind = document.querySelector('#findBus').value;
    console.log(busFind)
    let objBus = new Bus;
    let tblFind = document.querySelector('#resultFind');
    let div = '';
    for (let key in objBus.data) {
        if (objBus.data[key].status == 'đang hoạt động' && objBus.data[key].ironNumber == busFind) {
            fd_bus.push(objBus.data[key]);
        }

    }
    console.log(fd_bus)

    if (fd_bus.length == 0) {
        div += '<div class = "findChild"><div class="col-6 text-center">' + "không tìm thấy kết quả" + '</div>';
        tblFind.innerHTML = div;
    } else {
        for (let key in fd_bus) {
            div += '<div class = "findChild"><div class="col-6 text-center">' + fd_bus[key].ironNumber + '</div> <div class="col-6 text-center">' + setInterval(function () {

                if (countdow(fd_bus[key].time)[0] >= 0 && countdow(fd_bus[key].time)[1] > 0) {
                    countdow(fd_bus[key].time)[0] + 'p ' + countdow(fd_bus[key].time)[1] + 's';

                } else if (countdow(fd_bus[key].time)[0] >= 0 && countdow(fd_bus[key].time)[1] > 0 && countdow(fd_bus[key].time)[2] > 0) {
                    countdow(fd_bus[key].time)[2] + 'h' + ' ' + countdow(fd_bus[key].time)[0] + 'p ' + countdow(fd_bus[key].time)[1] + 's';
                }
            }, 1000) + '</div> </div>'
            console.log(fd_bus[key].time)

        }
        tblFind.innerHTML = div;


    }


}
function show_company() {
    let objBus = new Bus;
    let objUser = new User;
    let h1 = document.querySelector(".admin-manager h1");
    let stt=0;
    let table = document.querySelector('#shown-company-manager tbody')
    let tr = ''
    for (key in objUser.data) {
        if (objUser.data[key].role == 'company')
            h1.innerHTML = objUser.data[key].fullName;
    }
    for (let key in objBus.data) {
        stt++
        tr+='<tr id="child" class=" text-center" >';
        tr+='<td>'+stt+'</td>'+'<td>'+objBus.data[key].ironNumber+'</td>'+'<td>'+objBus.data[key].status+'</td>'+'<td>'+objBus.data[key].mainPeople+'</td>'+'<td>'+objBus.data[key].seccondPeople+'</td>';
        tr+='</tr>';

    }
    table.innerHTML = tr;

}


