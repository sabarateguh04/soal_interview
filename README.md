# soal_interview
akun admin
user : admin
pass : admin

akun operator 
user : operator
pass : operator


STEP
Clone Project -> npm i -> node app.js -> buka postman dan test sesuai method
1. GET DATA KELURAHAN
   API : http://localhost:8082/api/interview/data_kelurahan

2. GET DATA PASIEN
   API : http://localhost:8082/api/interview/data_pasien

3. POST DATA KELURAHAN
   API : http://localhost:8082/api/interview/admin/data_kelurahan
   headers :  user,password (akun admin)
4. POST DATA pasien
   API : http://localhost:8082/api/interview/operator/data_pasien
   headers :  user,password (akun operator)   
5. PUT DATA KELURAHAN
   API : http://localhost:8082/api/interview/admin/data_kelurahan/:id
   headers :  user,password (akun admin)   

   
