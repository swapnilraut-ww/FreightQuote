using FreightQuote.Data;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
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
                      QuoteId = x.QuoteId,
                      ReferenceNo = x.ReferenceNo,
                      PickupLocation = x.PickupLocation,
                      DeliveryLocation = x.DeliveryLocation,
                      ShipDate = x.ShipDate,
                      CreationDate = x.CreationDate,
                      Description = x.Description,
                      Comments = x.Comments,
                      VendorName = x.Vender != null ? x.Vender.Name : "",
                      Status = x.Status
                  }), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create()
        {
            ViewData["StatusList"] =
                new SelectList(new[] { "Open", "Quote Send", "Quote Received", "Shipped", "Completed" }
                .Select(x => new { value = x, text = x }),
                "value", "text");

            return View();
        }

        [HttpPost]
        public ActionResult Create(Quote quote)
        {
            try
            {
                quote.CreationDate = System.DateTime.Now;
                db.Quotes.Add(quote);
                db.SaveChanges();

                MailMessage Msg = new MailMessage();

                Msg.From = new MailAddress(ConfigurationManager.AppSettings["Email"]);

                StreamReader reader = new StreamReader(Server.MapPath("~/SendMail.html"));
                string readFile = reader.ReadToEnd();
                string StrContent = "";
                StrContent = readFile;
                //Here replace the name with [MyName]
                StrContent = StrContent.Replace("[Reference]", quote.ReferenceNo);
                StrContent = StrContent.Replace("[PickUpLocation]", quote.PickupLocation);
                StrContent = StrContent.Replace("[DeliveryLocation]", quote.DeliveryLocation);
                StrContent = StrContent.Replace("[ShipDate]", quote.ShipDate.ToShortDateString());
                StrContent = StrContent.Replace("[Description]", quote.Description);
                StrContent = StrContent.Replace("[Comments]", quote.Comments);
                Msg.Subject = string.Format("Subject – Request Quote – Reference# {0}", quote.ReferenceNo);
                Msg.Body = StrContent.ToString();
                Msg.IsBodyHtml = true;

                // your remote SMTP server IP.
                SmtpClient smtp = new SmtpClient();
                smtp.Host = ConfigurationManager.AppSettings["MailServer"];
                System.Net.NetworkCredential NetworkCred = new System.Net.NetworkCredential();
                NetworkCred.UserName = ConfigurationManager.AppSettings["Email"];
                NetworkCred.Password = ConfigurationManager.AppSettings["Password"];
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = int.Parse(ConfigurationManager.AppSettings["MailPort"]);
                smtp.EnableSsl = Convert.ToBoolean(ConfigurationManager.AppSettings["IsSSLEnabled"].ToString());

                List<Vender> vendorList = db.Venders.Where(x => x.IsActive == true).ToList();
                string userState = "test message1";
                foreach (var item in vendorList)
                {
                    Msg.To.Add(item.Email);
                    smtp.Send(Msg);
                }

                return RedirectToAction("List");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult Edit(int id)
        {
            Quote quote = db.Quotes.Where(x => x.QuoteId == id).SingleOrDefault();
            ViewData["StatusList"] =
                new SelectList(new[] { "Open", "Quote Send", "Quote Received", "Shipped", "Completed" }
                .Select(x => new { value = x, text = x }),
                "value", "text", quote.Status);

            return View(quote);
        }

        [HttpPost]
        public ActionResult Edit(Quote quote)
        {
            db.Quotes.Attach(quote);
            db.SaveChanges();
            return RedirectToAction("List");
        }

        public ActionResult Remove(int Id)
        {
            Quote quote = db.Quotes.Where(x => x.QuoteId == Id).SingleOrDefault();
            db.Quotes.Remove(quote);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}