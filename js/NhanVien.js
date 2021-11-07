function NhanVien(account, fullName, email, pass, date, salaryBasic, position, time, salaryTotal, rank) {
    // property
    this.taiKhoanNV = account;
    this.fullName = fullName;
    this.email = email;
    this.matKhau = pass;
    this.ngayLamViec = date;
    this.luongCoBan = salaryBasic;
    this.chucVu = position;
    this.gioLam = time;
    this.tongLuong = salaryTotal;
    this.xepLoai = rank;
}