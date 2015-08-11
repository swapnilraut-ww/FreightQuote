using FreightQuote.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreightQuote.Web.Controllers
{
    public class BaseController : Controller
    {
        private FreightQuoteEntities _db;
        public FreightQuoteEntities db
        {
            get
            {
                if (_db == null)
                {
                    _db = new FreightQuoteEntities();
                }
                return _db;
            }
        }
	}
}