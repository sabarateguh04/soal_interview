const express = require("express");
const fs = require('fs');
const crypto = require("crypto");
const moment = require("moment");
const mmt = moment();
const app = express();
const port = 3000;

app.use(express.json());

function genereteId(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charsLength =  chars.length;
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex =  crypto.randomInt(0, charsLength);
        randomString += chars[randomIndex];
        
    }
    return randomString;
}

app.get('/data_kelurahan/',(req,res) => {
    const file = fs.readFileSync('kelurahan.json');
    const json = JSON.parse(file.toString())
    fs.writeFileSync("kelurahan.json", JSON.stringify(json))
    res.status(200).json({data : json ,message : "Berhasil Mengambil data"});
})
app.get('/data_pasien/',(req,res) => {
    const file = fs.readFileSync('pasien.json');
    const json = JSON.parse(file.toString())
    fs.writeFileSync("pasien.json", JSON.stringify(json))
    res.status(200).json({data : json ,message : "Berhasil Mengambil data"});
})
app.post('/admin/data_kelurahan/',(req,res) => {

    const {user,password} =  req.headers
    const {kelurahan,kecamatan,kota} =  req.body
    if (user == "admin" && password == "admin") {
        //check if file exist
    if (!fs.existsSync('kelurahan.json')) {
        //create new file if not exist
        fs.closeSync(fs.openSync('kelurahan.json', 'w'));
    }

    const file = fs.readFileSync('kelurahan.json');
    const data_kelurahan = [];
    if (file.length == 0) {
        data_kelurahan.push({
            id : genereteId(10),
            kelurahan: kelurahan,
            kecamatan : kecamatan,
            kota: kota
        });
        fs.writeFileSync("kelurahan.json", JSON.stringify(data_kelurahan))
        res.status(200).json({data : data_kelurahan ,message : "Berhasil insert data!"});
    }else{
        const json = JSON.parse(file.toString())
        json.push({
            id : genereteId(10),
            kelurahan: kelurahan,
            kecamatan : kecamatan,
            kota: kota
        });
        fs.writeFileSync("kelurahan.json", JSON.stringify(json))
        res.status(200).json({data : json ,message : "Berhasil insert data"});
    }
    }else{
        res.status(500).json({message : "Invalid username password Admin!"});
    }
})
app.put('/admin/data_kelurahan/:id',(req,res) => {

    const {user,password} =  req.headers
    const id = req.params.id;
    const {kelurahan,kecamatan,kota} =  req.body
    if (user == "admin" && password == "admin") {
        const file = fs.readFileSync('kelurahan.json');
        if (file.length <= 0) {
            res.status(500).json({message : "Tidak ada data!"});
        }else{
            const json = JSON.parse(file.toString())
            const dt_update = [];
            const dt_all = [];
            for (let i = 0; i < json.length; i++) {
                if (json[i].id == id) {
                    dt_update.push({
                        id : id,
                        kelurahan: kelurahan,
                        kecamatan : kecamatan,
                        kota: kota
                    })
                }else{
                    dt_all.push({
                        id : json[i].id,
                        kelurahan: json[i].kelurahan,
                        kecamatan : json[i].kecamatan,
                        kota: json[i].kota
                    })
                }        
            }
    
            const final_update  =  dt_all.concat(dt_update);
            fs.writeFileSync("kelurahan.json", JSON.stringify(final_update))
            res.status(200).json({data : dt_update ,message : "Berhasil update data"});
        
        }        
    }else{
        res.status(500).json({message : "User Password Admin Salah!"});
    }

})
app.post('/operator/data_pasien/',(req,res) => {

    const {user,password} =  req.headers
    const {nama,alamat,telp,rt_rw,kelurahan,tgl_lahir,gender} =  req.body
    if (user == "operator" && password == "operator") {
        //check if file exist
    if (!fs.existsSync('pasien.json')) {
        //create new file if not exist
        fs.closeSync(fs.openSync('pasien.json', 'w'));
    }

    const file = fs.readFileSync('pasien.json');
    const data_pasien = [];
    if (file.length == 0) {
        let tahun =  mmt.format('YY')
        let bulan =  mmt.format('MM')
        let hari =   mmt.format('DD')
        data_pasien.push({
            id : genereteId(10),
            id_pasien : tahun+bulan+hari+genereteId(10),
            nama: nama,
            alamat : alamat,
            telp: telp,
            rt_rw : rt_rw,
            kelurahan : kelurahan,
            tgl_lahir : tgl_lahir,
            gender : gender
        });
        fs.writeFileSync("pasien.json", JSON.stringify(data_pasien))
        res.status(200).json({data : data_pasien ,message : "Berhasil insert data!"});
    }else{
        const json = JSON.parse(file.toString())
        json.push({
            id : genereteId(10),
            id_pasien : mmt.format('YYYY-MM-DD')+genereteId(10),
            nama: nama,
            alamat : alamat,
            telp: telp,
            rt_rw : rt_rw,
            kelurahan : kelurahan,
            tgl_lahir : tgl_lahir,
            gender : gender
        });
        fs.writeFileSync("pasien.json", JSON.stringify(json))
        res.status(200).json({data : json ,message : "Berhasil insert data"});
    }
    }else{
        res.status(500).json({message : "Invalid username password Admin!"});
    }
})

app.listen(port, () => {
    console.log('Server is running on port : 3000');
})