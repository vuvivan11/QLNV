function DanhSachNhanVien(){
    this.mangNV = [];

    this.themNV = function(nv){
        this.mangNV.push(nv);
    }

    this.xepHang = function(time){
        if(time >= 192){
            return "Xuất sắc";
        }else if(176 <= time && time < 192){
            return "Giỏi";
        }else if(160 <= time && time < 176){
            return "Khá";
        }else{
            return "Trung bình";    
        }
    }

    this.luongTong = function(salaryBasic){
        var index = document.getElementById("chucvu").selectedIndex;
        if(index == 1){
            return salaryBasic * 3;
        }else if(index == 2){
            return salaryBasic * 2;
        }else if(index == 3){
            return salaryBasic;
        }else{
            return false;
        }
    }

    this.timViTri = function(account){
        var viTri = -1;
        this.mangNV.map(function(nv, index){
            if (nv.taiKhoanNV == account) {
                viTri = index;
            }
        });
        return viTri;
    }

    this.xoaNV = function(account){
        var viTri = this.timViTri(account);
        if (viTri > -1) {
            this.mangNV.splice(viTri, 1);
        }
    }

    this.layChiTiet = function(account){
        var viTri = this.timViTri(account);
        if (viTri > -1) {
            return this.mangNV[viTri];
        }
    }

    this.capNhap = function(nv){
        var viTri = this.timViTri(nv.taiKhoanNV);
        if (viTri > -1) {
            this.mangNV[viTri] = nv;
        }
    }
}

DanhSachNhanVien.prototype.searchName = function(tuKhoa){
    var mangTK = [];
    var tuTK = tuKhoa.trim().toLowerCase();

    this.mangNV.map(function(nv){
        var ten = nv.xepLoai.toLowerCase();
        if (ten.indexOf(tuTK) > -1) {
            mangTK.push(nv);
        }
    })

    return mangTK;
}