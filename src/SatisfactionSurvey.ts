const dialog = $("#dialog");

$( function() {
    let max = $("#slider-range-max");
    max.slider({
        range: "max",
        min: 1,
        max: 5,
        value: 1,
        slide: function( event, ui ) {
            ui.value ? $("#amount").val(ui.value) : "";
        }
    });
    $("#amount").val(max.slider( "value" ));
} );

$( function() {
    setTimeout(function () {
        dialog.dialog({
            width: "auto",
            autoOpen: true,
            modal: true,
            buttons: {
                Rate: function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    }, 2000);
});