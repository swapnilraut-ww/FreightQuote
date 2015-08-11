/// <reference path="Common.js" />
$(document).ready(function () {
    BindVendorList("divQuoteList");

    $(document).on("click", ".btnEdit", function (e) {
        var url = quote.editQuote + '?id=' + $(this).attr("id");
        window.location = url;
    });

    $(document).on("click", ".removeMsg", function (e) {
        var url = quote.removeQuote + "?Id=" + $(this).attr("id");
        alertify.confirm("are you sure to remove this ?", function (e) {
            if (e) {
                CallAjaxMethod(url, 'Get', "", AfterRemoveQuote);
            }
        });
    });
});

function AfterRemoveQuote(data) {
    alertify.success("Quote removed successfully");
    BindVendorList("divQuoteList");

}
var itmCondOptions = [
                        { text: "Swapnil", value: "1" },
];
function BindVendorList(divId) {
    $("#" + divId).kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: quote.quoteList
            },
            pageSize: 10
        },
        dataBound: function (e) {
            $(".itemcond").kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: itmCondOptions,
            });
        },
        height: 450,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
            {
                field: "ReferenceNo",
                title: "Ref #",
                width: 60,
                
            },
            {
                field: "PickupLocation",
                title: "Pick Location",
                width: 120,
            },
            {
                field: "DeliveryLocation",
                title: "Delivery Location",
                width: 120,
            },
             {
                 field: "ShipDate",
                 title: "Ship Date",
                 width: 100,
                 type: "date",
                 format: "{0:MM/dd/yyyy}"
             },
             {
                 field: "CreationDate",
                 title: "Creation Date",
                 type: "date",
                 width: 100,
                 format: "{0:MM/dd/yyyy}"
             },
            {
                field: "Description",
                title: "Description",
                width: 140,
            },
            {
                field: "Comments",
                title: "Comments",
                width: 80,
            },
            {
                field: "QuoteId",
                title: "Vender",
                width: 120,
                template: kendo.template($("#itmCondTemplate").html()),
                sortable: false
            },
            {
                field: "Status",
                title: "Status",
                width: 60,
            },
            {
                field: "QuoteId",
                title: "Edit",
                width: 50,
                template: '<span id="#=QuoteId#" class="editMsg" ><img id="#=QuoteId#" class="btnEdit" src="/Content/Images/edit.jpg" style="cursor: pointer;" /></span>',
                sortable: false
            },
            {
                field: "QuoteId",
                title: "Delete",
                width: 60,
                template: '<span id="#=QuoteId#"  class="removeMsg" ><img id="#=QuoteId#" class="removeMsg" src="/Content/Images/deleteicon.png" style="cursor: pointer;" /></span>',
                sortable: false
            }
        ]
    });

}