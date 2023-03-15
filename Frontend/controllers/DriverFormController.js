let baseURL = "http://localhost:8080/Backend_war/driver/";

getAllDrivers();

$("#saveDriver").on('click', function () {
    saveDriver();
});

function saveDriver() {
    let formData = $("#driverFormController").serialize();
    $.ajax({
        url: baseURL + "save_driver", method: "post", data: formData, dataType: "json", success: function (res) {
            getAllDrivers();
            // alert(res.message);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                background:'#27ae60',
                showConfirmButton: false,
                color: "#fff",
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Saved successfully !'
            });
        }, error: function (error) {
            var errorMessage = JSON.parse(error.responseText);
            alert(errorMessage.message);
        }
    });
}

function getAllDrivers() {
    $("#driverTableBody").empty();
    $.ajax({
        url: baseURL + "get_all", success: function (res) {
            for (let c of res.data) {

                let id = c.id;
                let firstname = c.name.firstName;
                let lastname = c.name.lastName;
                let address = c.address;
                let drivingLicenseNo = c.drivingLicenseNo;
                let email = c.email;
                let contactNo = c.contactNo;
                let driverAvailability = c.driverAvailability;
                let userName = c.user.userName;
                let user_id = c.user.userId;
                let nic = c.nic;
                let password = c.user.password;

                let row = "<tr>" + "<td>" + id + "</td>" + "<td>" + firstname + "</td>" + "<td>" + lastname + "</td>" + "<td>" + address + "</td>" + "<td>" + drivingLicenseNo + "</td>" + "<td>" + email + "</td>" + "<td>" + contactNo + "</td>" + "<td>" + driverAvailability + "</td>" + "<td>" + userName + "</td>" + "<td>" + user_id + "</td>" + "<td>" + nic + "</td>" + "<td>" + password + "</td>" + "</tr>";

                $("#driverTableBody").append(row);
            }

            bindRowClickEventsForDriver();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
    genarateID();
}


function genarateID() {
    $.ajax({
        url: baseURL + "?test=", success: function (res) {
            $('#id').val(res.data);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}


$("#deleteDriver").on('click', function () {
    $.ajax({
        url: baseURL + "?code=" + $("#id").val(), method: "delete", dataType: "json", success: function (resp) {
            getAllDrivers();
            // alert(resp.message);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                background:'#27ae60',
                showConfirmButton: false,
                color: "#fff",
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'delete successfully !'
            });
        }, error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

$("#updateDriver").on('click', function () {

    let id = $('#id').val();
    let address = $('#address').val();
    let contactNo = $('#contactNo').val();
    let driverAvailability = $('#driverAvailability').val();
    let drivingLicenseNo = $('#drivingLicenseNo').val();
    let email = $('#email').val();
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let userName = $('#userName').val();
    let userId = $('#userId').val();
    let password = $('#password').val();
    let nic = $('#nic').val();
    let role = $('#role').val();

    var driver = {
        id: id,
        address: address,
        contactNo: contactNo,
        driverAvailability: driverAvailability,
        drivingLicenseNo: drivingLicenseNo,
        email: email,
        name: {firstName: firstName, lastName: lastName},
        user: {userId: userId, userName: userName, password: password, role: role},
        nic: nic,
    }

    $.ajax({
        url: baseURL + "update",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(driver),
        dataType: "json",
        success: function (res) {
            getAllDrivers();
            // alert(res.message);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                background:'#27ae60',
                showConfirmButton: false,
                color: "#fff",
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Updated successfully !'
            });
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function bindRowClickEventsForDriver() {
    $("#driverTableBody>tr").on('click', function () {
        $('#id').val($(this).children(":eq(0)").text());
        $('#firstName').val($(this).children(":eq(1)").text());
        $('#lastName').val($(this).children(":eq(2)").text());
        $('#address').val($(this).children(":eq(3)").text());
        $('#drivingLicenseNo').val($(this).children(":eq(4)").text());
        $('#email').val($(this).children(":eq(5)").text());
        $('#contactNo').val($(this).children(":eq(6)").text());
        $('#driverAvailability').val($(this).children(":eq(7)").text());
        $('#userName').val($(this).children(":eq(8)").text());
        $('#userId').val($(this).children(":eq(9)").text());
        $('#nic').val($(this).children(":eq(10)").text());
        $('#password').val($(this).children(":eq(11)").text());

    });
}


$('#id,#firstName,#lastName,#address,#drivingLicenseNo,#email,#contactNo,#driverAvailability,#userName,#userId,#nic,#password').on('keydown', function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
})

validator('#id', /^D00-00[0-9]{1,5}$/, "Your input can't be validated", '#driver_id_label', '#address');
validator('#address', /^[A-z]{3,30}$/, "Your input can't be validated", '#address_lbl', '#contactNo');
validator('#contactNo', /^(07([1245678])|091)(-)[0-9]{7}$/, "Your input can't be validated", '#contact_lbl', '#drivingLicenseNo');
validator('#drivingLicenseNo', /^[0-9]{12}$/, "Your input can't be validated", '#licence_lbl', '#email');
validator('#email', /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Your input can't be validated", '#eemail_lbl', '#firstName');
validator('#firstName', /^[A-z]{3,30}$/, "Your input can't be validated", '#f_name_lbl', '#lastName');
validator('#lastName', /^[A-z]{3,30}$/, "Your input can't be validated", '#l_name_lbl', '#userName');
validator('#userName', /^[A-z]{3,12}$/, "Your input can't be validated", '#userName_lbl', '#password');
validator('#userId', /^[0-9]{1,4}$/, "Your input can't be validated", '#user_id_lbl', '#nic');
validator('#password', /^[A-z]{4,30}$/, "Your input can't be validated", '#password_lbl', '#nic');
validator('#nic', /^[0-9]{12}$/, "Your input can't be validated", '#nic_lbl', '#nic');
