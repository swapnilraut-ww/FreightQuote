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
function BindVendorList(divId) {
    $("#" + divId).kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: quote.quoteList
            },
            pageSize: 10
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
                title: "Reference No",
            },
            {
                field: "PickupLocation",
                title: "Pickup Location",
            },
            {
                field: "DeliveryLocation",
                title: "Delivery Location",
            },
             {
                 field: "ShipDate",
                 title: "Ship Date",
                 type: "date",
                 format: "{0:MM/dd/yyyy}"
             },
             {
                 field: "CreationDate",
                 title: "Creation Date",
                 type: "date",
                 format: "{0:MM/dd/yyyy}"
             },
            {
                field: "Description",
                title: "Description",
            },
            {
                field: "Comments",
                title: "Comments",
            },
            {
                field: "QuoteId",
                title: "Vender",
                width: 80,
                template: '<select><option value="open">Open</option></select>',
                sortable: false
            },
            {
                field: "Status",
                title: "Status",
            },
            {
                field: "QuoteId",
                title: "Edit",
                width: 80,
                template: '<span id="#=QuoteId#" class="editMsg" ><img id="#=QuoteId#" class="btnEdit" src="/Content/Images/edit.jpg" style="cursor: pointer;" /></span>',
                sortable: false
            },
            {
                field: "QuoteId",
                title: "Delete",
                width: 80,
                template: '<span id="#=QuoteId#"  class="removeMsg" ><img id="#=QuoteId#" class="removeMsg" src="/Content/Images/deleteicon.png" style="cursor: pointer;" /></span>',
                sortable: false
            }
        ]
    });

}