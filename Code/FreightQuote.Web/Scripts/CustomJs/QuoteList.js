/// <reference path="Common.js" />
$(document).ready(function () {
    BindVendorList("divQuoteList");
});

$(document).on("click", ".btnEdit", function (e) {
    window.location = vendor.editVendor + '?id=' + $(this).attr("id");
});

$(document).on("click", ".remove", function (e) {
    var url = vendor.removeVendor + "?Id=" + $(this).attr("id");
    alertify.confirm("are you sure to remove this ?", function (e) {
        if (e) {
            CallAjaxMethod(url, 'Get', "", AfterRemoveVendor);
        }
    });
});

function AfterRemoveVendor(data) {
    alertify.success("vendor removed successfully");
    BindVendorList("divQuoteList");

}
function BindVendorList(divId) {
    $("#" + divId).kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: vendor.vendorList
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
                field: "Status",
                title: "Status",
            }
        ]
    });

}