using FreightQuote.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreightQuote.Web.Controllers
{
    public class QuoteController : BaseController
    {
        //
        // GET: /Vendor/
        public ActionResult List()
        {
            return View();
        }

        /// <summary>
        /// get Vendor list
        /// </summary>
        /// <returns></returns>
        public ActionResult GetQuoteList()
        {
            return Json(db.Quotes.Select(x =>
                  new
                  {
                      ReferenceNo = x.ReferenceNo,
                      PickupLocation = x.PickupLocation,
                      DeliveryLocation = x.DeliveryLocation,
                      ShipDate = x.ShipDate,
                      CreationDate = x.CreationDate,
                      Description = x.Description,
                      Comments = x.Comments,
                      Status = x.Status
                  }), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Quote quote)
        {
            db.Quotes.Add(quote);
            db.SaveChanges();
            return RedirectToAction("List");
        }
	}
}