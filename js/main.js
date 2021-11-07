var dsnv = new DanhSachNhanVien();
var validation = new Validation();


function getELE(id) {
    return document.getElementById(id);
}

function setLocalStorage(mangNV) {
    localStorage.setItem("DSNV", JSON.stringify(mangNV));
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        showTable(dsnv.mangNV);
    }
}
getLocalStorage();

function layThongTinNV() {
    var account = getELE("tknv").value;
    var fullName = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var date = getELE("datepicker").value;
    var salaryBasic = getELE("luongCB").value;
    var position = getELE("chucvu").value;
    var time = getELE("gioLam").value;
    var salaryTotal = dsnv.luongTong(salaryBasic);
    var rank = dsnv.xepHang(time);

    var isValid = true;

    isValid &= validation.checkEmpty(account, "Tài khoản không được để trống", "tbTKNV") && validation.checkAccount(account, "Tài khoản không được trùng", "tbTKNV", dsnv.mangNV);

    isValid &= validation.checkEmpty(fullName, "Họ tên không được để trống", "tbTen") && validation.checkName(fullName, "Họ tên phải là kiểu chữ", "tbTen");

    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email phải đúng định dạng", "tbEmail");

    isValid &= validation.checkEmpty(pass, "Mật khẩu không được để trống", "tbMatKhau") && validation.checkPass(pass, "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt", "tbMatKhau");

    isValid &= validation.checkEmpty(date, "Ngày làm không được để trống", "tbNgay") && validation.checkDate(date, "Ngày làm phải đúng định dạng dd/mm/yyyy", "tbNgay");

    isValid &= validation.checkEmpty(salaryBasic, "Lương cơ bản không được để trống", "tbLuongCB") && validation.checkSalary(salaryBasic, "Lương cơ bản phải từ 1000000 đến 20000000", "tbLuongCB");

    isValid &= validation.checkSelect("chucvu", "Chức vụ không hợp lệ", "tbChucVu");


    isValid &= validation.checkEmpty(time, "Giờ làm không được để trống", "tbGiolam") && validation.checkTime(time, "Giờ làm phải từ 80 đến 200 giờ", "tbGiolam");

    if (isValid) {
        var nv = new NhanVien(account.trim(), fullName, email, pass, date, salaryBasic, position, time, salaryTotal, rank);
        dsnv.themNV(nv);
        setLocalStorage(dsnv.mangNV);
        showTable(dsnv.mangNV);
    }
}


function showTable(mangNV) {
    var content = "";
    for (var i = 0; i < mangNV.length; i++) {
        var trNV = `<tr>
            <td>${mangNV[i].taiKhoanNV}</td>
            <td>${mangNV[i].fullName}</td>
            <td>${mangNV[i].email}</td>
            <td>${mangNV[i].ngayLamViec}</td>
            <td>${mangNV[i].chucVu}</td>
            <td>${mangNV[i].tongLuong}</td>
            <td>${mangNV[i].xepLoai}</td>
            <td>
            <button class = "btn btn-danger" onclick = "xoaNhanVien('${mangNV[i].taiKhoanNV}')">Xóa</button>
            <button class = "btn btn-info" data-toggle="modal"
            data-target="#myModal" onclick = "xemChiTiet('${mangNV[i].taiKhoanNV}')">Xem</button>
            </td>
            
        </tr>`
        content += trNV
    }

    getELE("tableDanhSach").innerHTML = content;
}


function xoaNhanVien(account) {
    dsnv.xoaNV(account);
    setLocalStorage(dsnv.mangNV);
    showTable(dsnv.mangNV);
}

function xemChiTiet(account) {
    var nvTimDuoc = dsnv.layChiTiet(account);

    if (nvTimDuoc != undefined) {
        getELE("tknv").disabled = true;
        getELE("tknv").value = nvTimDuoc.taiKhoanNV;
        getELE("name").value = nvTimDuoc.fullName;
        getELE("email").value = nvTimDuoc.email;
        getELE("password").value = nvTimDuoc.matKhau;
        getELE("datepicker").value = nvTimDuoc.ngayLamViec;
        getELE("luongCB").value = nvTimDuoc.luongCoBan;
        getELE("chucvu").value = nvTimDuoc.chucVu;
        getELE("gioLam").value = nvTimDuoc.gioLam;

        getELE("btnThemNV").disabled = true;
        getELE("header-title").innerHTML = "Edit";
        getELE("btnCapNhat").disabled = false;
        getELE("tbTKNV").style.display = "none";
        getELE("tbTen").style.display = "none";
        getELE("tbEmail").style.display = "none";
        getELE("tbMatKhau").style.display = "none";
        getELE("tbNgay").style.display = "none";
        getELE("tbLuongCB").style.display = "none";
        getELE("tbChucVu").style.display = "none";
        getELE("tbGiolam").style.display = "none";
    }
}

function capNhapNV() {
    var account = getELE("tknv").value;
    var fullName = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var date = getELE("datepicker").value;
    var salaryBasic = getELE("luongCB").value;
    var position = getELE("chucvu").value;
    var time = getELE("gioLam").value;
    var salaryTotal = dsnv.luongTong(salaryBasic);
    var rank = dsnv.xepHang(time);

    var isValid = true;

    isValid &= validation.checkEmpty(fullName, "Họ tên không được để trống", "tbTen") && validation.checkName(fullName, "Họ tên phải là kiểu chữ", "tbTen");

    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email phải đúng định dạng", "tbEmail");

    isValid &= validation.checkEmpty(pass, "Mật khẩu không được để trống", "tbMatKhau") && validation.checkPass(pass, "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt", "tbMatKhau");

    isValid &= validation.checkEmpty(date, "Ngày làm không được để trống", "tbNgay") && validation.checkDate(date, "Ngày làm phải đúng định dạng dd/mm/yyyy", "tbNgay");

    isValid &= validation.checkEmpty(salaryBasic, "Lương cơ bản không được để trống", "tbLuongCB") && validation.checkSalary(salaryBasic, "Lương cơ bản phải từ 1000000 đến 20000000", "tbLuongCB");

    isValid &= validation.checkSelect("chucvu", "Chức vụ không hợp lệ", "tbChucVu");

    isValid &= validation.checkEmpty(time, "Giờ làm không được để trống", "tbGiolam") && validation.checkTime(time, "Giờ làm phải từ 80 đến 200 giờ", "tbGiolam");

    if (isValid) {
        var nv = new NhanVien(account.trim(), fullName, email, pass, date, salaryBasic, position, time, salaryTotal, rank);
        dsnv.capNhap(nv);
        setLocalStorage(dsnv.mangNV);
        showTable(dsnv.mangNV);
    }
}


document.getElementById("btnThem").addEventListener("click", function () {
    getELE("tknv").disabled = false;
    getELE("btnThemNV").disabled = false;
    getELE("btnCapNhat").disabled = true;
    getELE("header-title").innerHTML = "Log In";
    getELE("tknv").value = "";
    getELE("name").value = "";
    getELE("email").value = "";
    getELE("password").value = "";
    getELE("datepicker").value = "";
    getELE("luongCB").value = "";
    getELE("chucvu").selectedIndex = 0;
    getELE("gioLam").value = "";

    getELE("tbTKNV").style.display = "none";
    getELE("tbTen").style.display = "none";
    getELE("tbEmail").style.display = "none";
    getELE("tbMatKhau").style.display = "none";
    getELE("tbNgay").style.display = "none";
    getELE("tbLuongCB").style.display = "none";
    getELE("tbChucVu").style.display = "none";
    getELE("tbGiolam").style.display = "none";
})


getELE("searchName").onkeyup = function () {
    var tuKhoa = getELE("searchName").value;
    var mangTK = dsnv.searchName(tuKhoa);
    showTable(mangTK);
}
