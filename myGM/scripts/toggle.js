var order_tab_on = true;
var other_tab_on = true;


$(document).ready(function() {
    $("#orderArrow").click(function() {
        $("#orderFilter").slideToggle("slow");
        if (order_tab_on) {
            order_tab_on = false;
            $("#orderArrow").html('&#9650;');
        } else {
            $("#orderArrow").html('&#9660;');
            order_tab_on = true;
        }
    });
	$("#otherArrow").click(function() {
        $("#otherFilter").slideToggle("slow");
        if (other_tab_on) {
            other_tab_on = false;
            $("#otherArrow").html('&#9650;');
        } else {
            $("#otherArrow").html('&#9660;');
            other_tab_on = true;
        }
    });
});




