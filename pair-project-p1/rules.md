==STEP 1== (home) ('/')
tampilkan data category, beserta tombol edit, delete, dan detail

==STEP 2== ('/:categoryId')
tampilkan data courses dalam bentuk table, yang isinya ada name, duration, linkVideo, nama category(tinggal di include dalam findAll), dan tombol ACTION (DETAIL) untuk melihat detail courses, (DELETE) untuk menghapus courses, dan (EDIT) untuk edit informasi courses. (Jangan lupa tombol diatas, diluar dari table untuk ADD)

==STEP 3== (/:categoryId/courses/add) get & post
buat form add courses, yang isinya name(text), description(text area), duration(number), nama kategori (select, VALUENYA dari categori "id") dan link video (text (tolong pilih video yang langsung playlist))

==STEP 4== (/:categoryId/courses/:courseId)
tampilkan detail data seperti dalam foto "foto1"

==STEP 5== (/:categoryId/courses/:courseId/delete)
buat codingan untuk delete by id

==STEP 6== (/:categoryId/courses/:courseId/edit) get & post
buat codingan untuk edit by id

==STEP 7== (/category/add) get & post
buat codingan untuk add category

==STEP 8== (/category/delete) get
buat codingan untuk delete category

==STEP 9== (/category/edit) get & post
buat codingan untuk edit category

==STEP 10== (validate)
validate semua form add dan edit agar tidak ada kosong,
khusus untuk durasi tidak boleh dibawah 120
