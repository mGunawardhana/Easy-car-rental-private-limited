let baseURL = "http://localhost:8080/Backend_war";
setUserCount();
// setUserCunt();
function setUserCount() {
    $.ajax({
        url: baseURL + "/customer/customerCount/{count}", method: "GET", dataType: "json", success: function (res) {
            console.log(res.data);
            $("#lbl2").text(res.data);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}


setCarQuantity();
function setCarQuantity() {
    $.ajax({
        url: baseURL + "/vehicle/vehicleCount/{count}", method: "GET", dataType: "json", success: function (res) {
            console.log(res.data);
            $("#lbl3").text(res.data);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}