using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Newtonsoft.Json;
using System.IO;
using System.Web.Script.Serialization;
using System.Runtime.Serialization.Json;
using System.Web.Script.Services;

public partial class TajAngular_index : System.Web.UI.Page
{
    [WebMethod]
    public static string GetFacilityDetails(int prodOptionId)
    {
        eBrochureDataContext eConnect6 = new eBrochureDataContext();
        DidgigoDB.BennelongDataContext dbconnect6 = DidgigoDB.connectDB();
        int LongDescriptionTypeId = -1;
        int ShortDescriptionTypeId = -1;

        var shortdesc = (from a in dbconnect6.Product_Desc_Type
                         where a.Type == "Short_Description"
                         select a.Product_Description_Type_Id).Single();

        var longdesc = (from a in dbconnect6.Product_Desc_Type
                        where a.Type == "Long_Description"
                        select a.Product_Description_Type_Id).Single();

        if (longdesc != null)
        {
            LongDescriptionTypeId = longdesc;
        }



        if (shortdesc != null)
        {
            ShortDescriptionTypeId = shortdesc;
        }

        String jsonData = null;
        var facilityDetails = (from o in eConnect6.pProduct_Option_Mappings
                               where o.Product_Option_Id == prodOptionId
                               select new
                               {

                                   FacilityName = (from optDetails in eConnect6.v_eFact_Product_Option_Details
                                                   where optDetails.Product_Option_Id == prodOptionId
                                                   select optDetails.Option_Name).FirstOrDefault(),

                                   longDescription = (from ld in eConnect6.Benn_Product_Core_Description2s
                                                      where ld.Product_Option_Id == prodOptionId && ld.Product_Desc_Type_Id == LongDescriptionTypeId
                                                      select ld.Description).FirstOrDefault(),

                                   shortDescription = (from sd in eConnect6.Benn_Product_Core_Description2s
                                                       where sd.Product_Option_Id == prodOptionId && sd.Product_Desc_Type_Id == ShortDescriptionTypeId
                                                       select sd.Description).FirstOrDefault(),

                                   access = (from acc in eConnect6.v_Product_Option_FoodBev_Accesses
                                             where acc.Product_Option_Id == prodOptionId
                                             select acc.Content_Collection).FirstOrDefault(),


                                   awards = (from awrds in eConnect6.v_Product_Option_FoodBev_Awards
                                             where awrds.Product_Option_Id == prodOptionId
                                             select awrds.Content_Collection).FirstOrDefault(),

                                   beverage = (from bev in eConnect6.v_Product_Option_FoodBev_Beverages
                                               where bev.Product_Option_Id == prodOptionId
                                               select bev.Content_Collection).FirstOrDefault(),


                                   cuisine = (from cus in eConnect6.v_Product_Option_FoodBev_Cuisines
                                              where cus.Product_Option_Id == prodOptionId
                                              select cus.Content_Collection).FirstOrDefault(),

                                   entertainment = (from ent in eConnect6.v_Product_Option_FoodBev_Entertainments
                                                    where ent.Product_Option_Id == prodOptionId
                                                    select ent.Content_Collection).FirstOrDefault(),

                                   openingHours = (from op in eConnect6.v_Product_Option_FoodBev_Opening_Hours
                                                   where op.Product_Option_Id == prodOptionId
                                                   select op.Content_Collection).FirstOrDefault(),

                                   privateDining = (from pD in eConnect6.v_Product_Option_FoodBev_Private_Dinings
                                                    where pD.Product_Option_Id == prodOptionId
                                                    select pD.Content_Collection).FirstOrDefault(),

                                   service = (from serv in eConnect6.v_Product_Option_FoodBev_Services
                                              where serv.Product_Option_Id == prodOptionId
                                              select serv.Content_Collection).FirstOrDefault(),

                                   tastings = (from tst in eConnect6.v_Product_Option_FoodBev_Tastings
                                               where tst.Product_Option_Id == prodOptionId
                                               select tst.Content_Collection).FirstOrDefault(),

                                   Images = (from cI in eConnect6.Benn_Product_Core_Image2s
                                             where cI.Product_Option_Id == prodOptionId
                                             orderby cI.Hero_Order
                                             select new
                                             {
                                                 cI.Product_Option_Id,
                                                 cI.Product_Image,
                                                 cI.Hero_Image,
                                                 cI.Hero_Order,
                                             })
                               }).SingleOrDefault();

        try
        {


            if (facilityDetails != null)
            {
                jsonData = JsonConvert.SerializeObject(facilityDetails);
            }

        }
        catch (Exception ex)
        {
            jsonData = ex.Message;
        }

        return jsonData;
    }


    [WebMethod]
    public static string GetActivityDetails(int prodOptionId)
    {
        eBrochureDataContext eConnect5 = new eBrochureDataContext();
        DidgigoDB.BennelongDataContext dbconnect5 = DidgigoDB.connectDB();
        int LongDescriptionTypeId = -1;
        int ShortDescriptionTypeId = -1;

        var shortdesc = (from a in dbconnect5.Product_Desc_Type
                         where a.Type == "Short_Description"
                         select a.Product_Description_Type_Id).Single();

        var longdesc = (from a in dbconnect5.Product_Desc_Type
                        where a.Type == "Long_Description"
                        select a.Product_Description_Type_Id).Single();

        if (longdesc != null)
        {
            LongDescriptionTypeId = longdesc;
        }



        if (shortdesc != null)
        {
            ShortDescriptionTypeId = shortdesc;
        }

        String jsonData = null;
        var activityDetails = (from o in eConnect5.pProduct_Option_Mappings
                               where o.Product_Option_Id == prodOptionId
                               select new
                               {

                                   ActivityName = (from optDetails in eConnect5.v_eFact_Product_Option_Details
                                                   where optDetails.Product_Option_Id == prodOptionId
                                                   select optDetails.Option_Name).FirstOrDefault(),

                                   longDescription = (from ld in eConnect5.Benn_Product_Core_Description2s
                                                      where ld.Product_Option_Id == prodOptionId && ld.Product_Desc_Type_Id == LongDescriptionTypeId
                                                      select ld.Description).FirstOrDefault(),

                                   shortDescription = (from sd in eConnect5.Benn_Product_Core_Description2s
                                                       where sd.Product_Option_Id == prodOptionId && sd.Product_Desc_Type_Id == ShortDescriptionTypeId
                                                       select sd.Description).FirstOrDefault(),

                                   Images = (from cI in eConnect5.Benn_Product_Core_Image2s
                                             where cI.Product_Option_Id == prodOptionId
                                             orderby cI.Hero_Order
                                             select new
                                             {
                                                 cI.Product_Option_Id,
                                                 cI.Product_Image,
                                                 cI.Hero_Image,
                                                 cI.Hero_Order,
                                             })
                               }).SingleOrDefault();

        try
        {


            if (activityDetails != null)
            {
                jsonData = JsonConvert.SerializeObject(activityDetails);
            }

        }
        catch (Exception ex)
        {
            jsonData = ex.Message;
        }

        return jsonData;
    }

    [WebMethod]
    public static string GetRoomDetails(int prodOptionId)
    {
        eBrochureDataContext eConnect4 = new eBrochureDataContext();
        DidgigoDB.BennelongDataContext dbconnect4 = DidgigoDB.connectDB();

        int LongDescriptionTypeId = -1;
        int ShortDescriptionTypeId = -1;

        var shortdesc = (from a in dbconnect4.Product_Desc_Type
                         where a.Type == "Short_Description"
                         select a.Product_Description_Type_Id).Single();

        var longdesc = (from a in dbconnect4.Product_Desc_Type
                        where a.Type == "Long_Description"
                        select a.Product_Description_Type_Id).Single();

        if (longdesc != null)
        {
            LongDescriptionTypeId = longdesc;
        }



        if (shortdesc != null)
        {
            ShortDescriptionTypeId = shortdesc;
        }


        String jsonData = null;
        var roomDetails = (from roomDetailsInfo in eConnect4.v_eFact_ProductOptionRooms
                           join optDetails in eConnect4.v_eFact_Product_Option_Details on roomDetailsInfo.Product_Option_Id equals optDetails.Product_Option_Id

                           where roomDetailsInfo.Product_Option_Id == prodOptionId
                           select new
                           {
                               roomDetailsInfo.Option_Id,
                               roomDetailsInfo.Product_Option_Id,
                               roomDetailsInfo.Product_Name,
                               roomDetailsInfo.Classification,
                               roomDetailsInfo.Number_of_Rooms,
                               roomDetailsInfo.Room_Size,

                               optDetails.Option_Name,
                               //description 
                               longDescription = (from ld in eConnect4.Benn_Product_Core_Description2s
                                                  where ld.Product_Option_Id == prodOptionId && ld.Product_Desc_Type_Id == LongDescriptionTypeId
                                                  select ld.Description).FirstOrDefault(),

                               shortDescription = (from sd in eConnect4.Benn_Product_Core_Description2s
                                                   where sd.Product_Option_Id == prodOptionId && sd.Product_Desc_Type_Id == ShortDescriptionTypeId
                                                   select sd.Description).FirstOrDefault(),
                               //room Overview
                               roomOverview = (from roomOv in eConnect4.v_Product_Option_Room_Overview_Room_Details
                                               where roomOv.Product_Option_Id == prodOptionId
                                               select roomOv.Content_Collection).FirstOrDefault(),

                               roomFeature = (from roomFeat in eConnect4.v_Product_Option_Room_Overview_Room_Features
                                              where roomFeat.Product_Option_Id == prodOptionId
                                              select roomFeat.Content_Collection).FirstOrDefault(),

                               roomFacilities = (from roomFacil in eConnect4.v_Product_Option_Room_Overview_Room_Facilities
                                                 where roomFacil.Product_Option_Id == prodOptionId
                                                 select roomFacil.Content_Collection).FirstOrDefault(),

                               roomProvisions = (from roomProv in eConnect4.v_Product_Option_Room_Overview_Room_Provisions
                                                 where roomProv.Product_Option_Id == prodOptionId
                                                 select roomProv.Content_Collection).FirstOrDefault(),

                               roomSpaces = (from roomSp in eConnect4.v_Product_Option_Room_Overview_Spaces
                                             where roomSp.Product_Option_Id == prodOptionId
                                             select roomSp.Content_Collection).FirstOrDefault(),

                               roomAccess = (from roomAcc in eConnect4.v_Product_Option_Room_Overview_Room_Accesses
                                             where roomAcc.Product_Option_Id == prodOptionId
                                             select roomAcc.Content_Collection).FirstOrDefault(),

                               roomServices = (from roomServ in eConnect4.v_Product_Option_Room_Overview_Room_Services
                                               where roomServ.Product_Option_Id == prodOptionId
                                               select roomServ.Content_Collection).FirstOrDefault(),
                               //bed room features

                               bedroomFeatures = (from bedFeat in eConnect4.v_Product_Option_Room_Bedroom_Features_Beds
                                                  where bedFeat.Product_Option_Id == prodOptionId
                                                  select bedFeat.Content_Collection).FirstOrDefault(),

                               bedroomFacilities = (from bedFacil in eConnect4.v_Product_Option_Room_Bedroom_Facilities
                                                    where bedFacil.Product_Option_Id == prodOptionId
                                                    select bedFacil.Content_Collection).FirstOrDefault(),

                               bedroomProvisions = (from bedProv in eConnect4.v_Product_Option_Room_Bedoom_Provisions
                                                    where bedProv.Product_Option_Id == prodOptionId
                                                    select bedProv.Content_Collection).FirstOrDefault(),

                               //bath room features

                               bathroomFeatures = (from bathFeat in eConnect4.v_Product_Option_Room_Bathroom_Features
                                                   where bathFeat.Product_Option_Id == prodOptionId
                                                   select bathFeat.Content_Collection).FirstOrDefault(),

                               bathroomFittings = (from bathFit in eConnect4.v_Product_Option_Room_Bathroom_Fittings
                                                   where bathFit.Product_Option_Id == prodOptionId
                                                   select bathFit.Content_Collection).FirstOrDefault(),

                               bathroomProvisions = (from bathProv in eConnect4.v_Product_Option_Room_Bathroom_Provisions
                                                     where bathProv.Product_Option_Id == prodOptionId
                                                     select bathProv.Content_Collection).FirstOrDefault(),


                               roomImages = (from o in eConnect4.Benn_Product_Core_Image2s
                                             where o.Product_Option_Id == prodOptionId
                                             orderby o.Hero_Order
                                             select new
                                             {
                                                 o.Product_Option_Id,
                                                 o.Product_Image,
                                                 o.Hero_Image,
                                                 o.Hero_Order,
                                             })
                           }).FirstOrDefault();

        try
        {


            if (roomDetails != null)
            {
                jsonData = JsonConvert.SerializeObject(roomDetails);
            }

        }
        catch (Exception ex)
        {
            jsonData = ex.Message;
        }

        return jsonData;
    }
    [WebMethod]
    public static string GetOptionImages(int prodOptionId)
    {
        eBrochureDataContext eConnect3 = new eBrochureDataContext();

        String jsonData = null;
        var optionImages = (from o in eConnect3.Benn_Product_Core_Image2s
                            where o.Product_Option_Id == prodOptionId
                            orderby o.Hero_Order
                            select new
                            {
                                o.Product_Option_Id,
                                o.Product_Image,
                                o.Hero_Image,
                                o.Hero_Order,
                            });
        try
        {


            if (optionImages != null)
            {
                jsonData = JsonConvert.SerializeObject(optionImages);
            }

        }
        catch (Exception ex)
        {
            jsonData = ex.Message;
        }

        return jsonData;
    }
    [WebMethod]
    public static string GetDetails(int prodOptionId, int ccId)
    {

        DidgigoDB.BennelongDataContext dbconnect2 = DidgigoDB.connectDB();

        //int prodId = Convert.ToInt32(HttpContext.Current.Session["productid"]);
        var optionDetails = (from d in dbconnect2.Content_Collection_Submissions_Text

                             where d.Product_Option_Id == prodOptionId && d.Content_Collection_Id == ccId
                             select new
                             {
                                 d.Product_Option_Id,
                                 d.Product_Id,
                                 d.Content_Collection_Submission_Text_Id,
                                 d.Content_Collection_Id,
                                 d.Submitted_Text

                             }).FirstOrDefault();
        String jsonData = null;

        try
        {


            if (optionDetails != null)
            {
                jsonData = JsonConvert.SerializeObject(optionDetails);
            }

        }
        catch (Exception ex)
        {
            jsonData = ex.Message;
        }

        return jsonData;
    }

    [WebMethod]
    public static string GetMapInfo()
    {
        String jsonData = null;

        int prodId = Convert.ToInt32(HttpContext.Current.Session["productid"]);
        eFactchureDataContext dbFact2 = new eFactchureDataContext();

        var map = (from mp in dbFact2.Benn_Product_Maps
                   where mp.Product_Id == prodId
                   select new
                   {
                       mp.Map_Coordinates1,
                       mp.Map_Coordinates2,
                       mp.Marker_Coordiantes1,
                       mp.Marker_Coordiantes2,
                       mp.Marker_Colour,
                       mp.Zoom,
                       mp.Image_File
                   }).SingleOrDefault();
        try
        {
            if (map != null)
            {
                jsonData = JsonConvert.SerializeObject(map);
            }

        }
        catch (Exception ex)
        {
            jsonData = ex.Message;
        }

        return jsonData;
    }

    [WebMethod]
    public static string GetProductInfo()
    {

        //System.Diagnostics.Debug.WriteLine("p" + p);
        DidgigoDB.BennelongDataContext dbconnect1 = DidgigoDB.connectDB();
        eBrochureDataContext eConnect = new eBrochureDataContext();
        eFactchureDataContext dbFact = new eFactchureDataContext();
        //int prodId = Convert.ToInt32(p); //109 get product id

        int prodId = Convert.ToInt32(HttpContext.Current.Session["productid"]);
        int LongDescriptionTypeId = -1;
        int ShortDescriptionTypeId = -1;

        var shortdesc = (from a in dbconnect1.Product_Desc_Type
                         where a.Type == "Short_Description"
                         select a.Product_Description_Type_Id).Single();

        var longdesc = (from a in dbconnect1.Product_Desc_Type
                        where a.Type == "Long_Description"
                        select a.Product_Description_Type_Id).Single();

        if (longdesc != null)
        {
            LongDescriptionTypeId = longdesc;
        }



        if (shortdesc != null)
        {
            ShortDescriptionTypeId = shortdesc;
        }



        String jsonData = null;


        var prodInfo = (from f in eConnect.v_eFact_Product_Details
                        join currProd in eConnect.Benn_Product2s on f.Product_Id equals currProd.Product_Id
                        where f.Product_Id == prodId
                        select new
                        {
                            f.Product_Id,
                            f.Product_Name,
                            f.Address,
                            f.Description,
                            f.Product_Type,
                            f.Company,
                            f.City,
                            f.State,
                            f.Country,
                            f.Post_Code,
                            f.WebSite,
                            f.Rating,
                            f.Product_Latitude,
                            f.Product_Longitude,
                            f.GPS_DMS_Lat_Degrees,
                            f.GPS_DMS_Lat_Min,
                            f.GPS_DMS_Lat_Notation,
                            f.GPS_DMS_Lat_Sec,
                            f.GPS_DMS_Long_Degrees,
                            f.GPS_DMS_Long_Min,
                            f.GPS_DMS_Long_Notation,
                            f.GPS_DMS_Long_Sec,
                            currProd.Email,
                            currProd.Phone,
                            logo = currProd.Product_Logo,


                            heroVideos = (from optMap in eConnect.pProduct_Option_Mappings
                                          where optMap.Product_Id == prodId && optMap.Option_Id == 2
                                          join vid in eConnect.Benn_Product_Core_Video2s on optMap.Product_Option_Id equals vid.Product_Option_Id
                                          where vid.Hero_Image == 'Y'
                                          orderby vid.Hero_Order
                                          select new
                                          {
                                              vid.Product_Core_Video_Id,
                                              vid.Hero_Image,
                                              vid.Hero_Order,
                                              vid.Notes,
                                              vid.Product_Video,

                                          }),

                            videos = (from optMap in eConnect.pProduct_Option_Mappings
                                      where optMap.Product_Id == prodId && optMap.Option_Id == 2
                                      join vid in eConnect.Benn_Product_Core_Video2s on optMap.Product_Option_Id equals vid.Product_Option_Id
                                      where vid.Hero_Image == 'N'
                                      select new
                                      {
                                          vid.Hero_Image,
                                          vid.Hero_Order,
                                          vid.Notes,
                                          vid.Product_Video,

                                      }),

                            heroImages = (//from optMap in eConnect.pProduct_Option_Mappings
                                //where optMap.Product_Id == prodId && optMap.Option_Id == 2
                                          from i in eConnect.v_eFact_Product_Images
                                          where i.Product_Id == f.Product_Id
                                          join coreImg in eConnect.Benn_Product_Core_Image2s on i.Product_Core_Image_Id equals coreImg.Product_Core_Image_Id
                                          where coreImg.Hero_Image == 'Y'
                                          orderby coreImg.Hero_Order
                                          select new
                                          {
                                              coreImg.Product_Core_Image_Id,
                                              coreImg.Product_Image,
                                              coreImg.Hero_Image,
                                              coreImg.Hero_Order,
                                              coreImg.Keywords,
                                              coreImg.Notes,
                                              coreImg.Title,
                                          }),

                            participants = (from part in eConnect.v_Participant_Contact_Detail2s
                                            where part.Participant_Id == currProd.Participant_Id
                                            join prodContact in eConnect.Benn_Product_Contact2s on part.Participant_Contact_Id equals prodContact.Participant_Contact_Id
                                            where prodContact.Product_Id == f.Product_Id
                                            select new
                                            {

                                                part.FullName,

                                                part.Dept,

                                                part.Phone1,
                                                part.Phone2,
                                                part.Fax,
                                                part.www,

                                                part.Address,
                                                part.Destination,
                                                part.Country,
                                                part.Country_State_Name,
                                                part.Post_Code,



                                                part.Delivery_Address,
                                                part.Delivery_City,
                                                part.Delivery_State_Name,
                                                part.Delivery_Post_Code,
                                                part.Notes,



                                                photo = (from i in eConnect.Benn_Participant_Contact_Image2s
                                                         where i.Participant_Contact_Id == part.Participant_Contact_Id
                                                         select i.Filename)
                                            }),


                            images = (from i in eConnect.v_eFact_Product_Images
                                      where i.Product_Id == f.Product_Id

                                      select new
                                      {
                                          i.Product_Core_Image_Id,
                                          i.Product_Image,
                                          i.Notes

                                      }),

                            details = (from m in eConnect.v_eFact_Product_Option_Details


                                       where m.Product_Id == f.Product_Id
                                       select new
                                       {
                                           m.Product_Option_Id,
                                           m.Option_Id,
                                           m.Product_Option_Type_Id,
                                           m.Option_Name,
                                           m.Option_Desc,
                                           m.Option_Type,

                                           Classification = (from o in eConnect.v_eFact_ProductOptionRooms
                                                             where o.Product_Option_Id == m.Product_Option_Id
                                                             select o.Classification).FirstOrDefault(),

                                           Description = (from o in eConnect.pProduct_Option_Mappings
                                                          where o.Product_Id == prodId && o.Option_Id == m.Option_Id
                                                          join coreDesc in eConnect.Benn_Product_Core_Description2s on o.Product_Option_Id equals coreDesc.Product_Option_Id
                                                          where coreDesc.Product_Desc_Type_Id == LongDescriptionTypeId
                                                          select coreDesc.Description
                                                           ).FirstOrDefault(),

                                           ShortDescription = (from o in eConnect.pProduct_Option_Mappings
                                                               where o.Product_Id == prodId && o.Option_Id == m.Option_Id
                                                               join coreDesc in eConnect.Benn_Product_Core_Description2s on o.Product_Option_Id equals coreDesc.Product_Option_Id
                                                               where coreDesc.Product_Desc_Type_Id == ShortDescriptionTypeId
                                                               select coreDesc.Description
                                                           ).FirstOrDefault()



                                       }),
                            /*
                             ccdetails = ( from optMap in eConnect.pProduct_Option_Mappings
                                           where optMap.Product_Id == prodId && optMap.Option_Id != 2
                                           join cc in dbconnect1.Content_Collection_Submissions_Text on optMap.Product_Option_Id equals cc.Product_Option_Id into joinedCC
                                           from cc in joinedCC.DefaultIfEmpty()
                                           select new {
                                                 cc.Content_Collection_Id,
                                                 cc.Content_Collection_Submission_Text_Id,
                                                 cc.Submitted_Text,
                                                 cc.Complimentary,
                                                 cc.Product_Id,
                                                 cc.Product_Option_Id
                                           }),*/



                            option = (from c in eConnect.v_eFact_ProductOption_Core_Images
                                      where c.Product_Id == f.Product_Id
                                      orderby c.Option_Name
                                      select new
                                      {
                                          c.Product_Id,
                                          c.Option_Id,
                                          c.Option_Type_Id,
                                          c.Product_Image_Folder,
                                          c.Product_Image,
                                          c.Participant_Id,
                                          c.Option_Name,
                                          c.Notes,
                                          c.Title,


                                          OptionTypeName = (from a in eConnect.v_eFact_Product_Option_Details
                                                            where a.Product_Option_Type_Id == c.Option_Type_Id
                                                            select a.Option_Type).First()

                                      }),



                            facts = (from a in eConnect.v_eFact_Product_Facts_Accoms
                                     where a.Product_Id == f.Product_Id
                                     select new
                                     {
                                         a.Product_Id,
                                         Facility_Dining_BBQ = a.Facilities___Dining__BBQ_facilities_for_guest_use,
                                         Facility_DiningOnsiteResto = a.Faciltiies___Dining__On_site_restaurant_s_,
                                         Facility_DiningBar = a.Facilities___Dining__On_site_bar_s_,
                                         Facility_DiningCafe = a.Facilities___Dining__On_site_cafe_s_,
                                         Facility_DiningRoomService = a.Facilities___Dining__Room_Service,
                                         Facility_DiningOutdoorDining = a.Facilities___Dining__Outdoor_dining,
                                         Facility_DiningPrivateDining = a.Facilities___Dining__Private_dining,
                                         Facility_FamilyKidsClub = a.Facilities___Family__Kids_Club,
                                         Facility_FamilyBabySitting = a.Facilities___Family__Babysitting_service,
                                         Facility_FamilyChildMinding = a.Facilities___Family__Child_minding_service,
                                         Facility_FamilyOnsitePlayground = a.Facilities___Family__On_site_children_playground,
                                         Facility_FamilyHighChair = a.Facilities___Family__Highchair_s_,
                                         Facility_FamilyCot = a.Facilities___Family__Cot_s_,
                                         Facility_FitnessSki = a.Facilities___Fitness_and_Leisure__Ski_in_ski_out,
                                         Facility_FitnessPool = a.Facilities___Fitness_and_Leisure__On_site_swimming_pool_s_,
                                         Facility_FitnessKidsPool = a.Facilities___Fitness_and_Leisure__Kids_pool_s__or_kids__shallow__section_of_pool_s_,
                                         Facility_FitnessSwimPoolBar = a.Facilities___Fitness_and_Leisure__Swim_up_pool_bar,
                                         Facility_FitnessJacuzzi = a.Facilities___Fitness_and_Leisure__On_site_Jacuzzi,
                                         Facility_FitnessGym = a.Facilities___Fitness_and_Leisure__On_site_gym,
                                         Facility_FitnessDaySpa = a.Facilities___Fitness_and_Leisure__On_site_day_spa,
                                         Property_LocationDistanceFromAirPort = a.Property_Location___Distance_from_City_Centre__Distance_in_kilometres,
                                         Property_LocationDistanceFromCenter = a.Property_Location___Distance_from_main_Airport__Distance_in_kilometres,
                                         Services_InternetOnsite = a.Services___Internet__On_site_Internet_access,
                                         Services_ParkingOnsite = a.Services___Parking__On_site_self_parking,
                                         Services_ParkingValet = a.Services___Parking__Valet_Parking,
                                         Services_LaundryFacility = a.Services___Laundry__Laundry_facilities_for_guest_use,
                                         Services_LaundryOnsite = a.Services___Laundry__On_site_Laundry_service,
                                         Services_BussinessCenter = a.Services___Businesses_services__Business_Centre,
                                         Services_BusinessConferenceRoom = a.Services___Businesses_services__Conference_Rooms,
                                         Services_OtherReception = a.Services___Other__Reception,
                                         Services_Other24HrReception = a.Services___Other__24_hour_Reception,
                                         Services_OtherConcierge = a.Services___Other__24_hour_Concierge,
                                         Services_Other24HrConcierge = a.Services___Other__24_hour_Concierge,
                                         Services_OtherChapel = a.Services___Other__Chapel,
                                         Services_OtherLift = a.Services___Other__Lift,
                                         Ratings_Awards = a.Ratings__Policies_and_Inclusions___Awards_and_Affiliations__Award_Description,
                                         Ratings_TransportAirport = a.Ratings__Policies_and_Inclusions___Transport__Complimentary_airport_transfers_included,
                                         Ratings_TransportCity = a.Ratings__Policies_and_Inclusions___Transport__City_or_local_transfers_provided_by_property,
                                         Ratings_MealPlan = a.Ratings__Policies_and_Inclusions___Meal_Plan___Lead_in_price_inclusive_of_,
                                         Ratings_InsurancePublicLiability = a.Ratings__Policies_and_Inclusions___Insurance__Public_Liability,
                                         Ratings_InsurancePersonal = a.Ratings__Policies_and_Inclusions___Insurance__Personal_Indemnity,
                                         Ratings_MinStay = a.Ratings__Policies_and_Inclusions___Minimum_Stay__Minimum_stay,
                                         Ratings_ChildPolicyAdultsOnly = a.Ratings__Policies_and_Inclusions___Child_Policy__Adults_Only,
                                         Ratings_ChildPolicyChildFree = a.Ratings__Policies_and_Inclusions___Child_Policy__Children_free_when_using_existing_bedding,
                                         Ratings_Servicing = a.Ratings__Policies_and_Inclusions___Servicing__Servicing_,
                                         Ratings_SpecialOffersStayPay = a.Ratings__Policies_and_Inclusions___Special_Offers__Stay_pay_offer,
                                         Ratings_SpecialOffersUpgrade = a.Ratings__Policies_and_Inclusions___Special_Offers__Upgrade_offer,
                                         Ratings_SpecialOffersMeal = a.Ratings__Policies_and_Inclusions___Special_Offers__Meal_offer,
                                         Ratings_SpecialOfferAirportTransfer = a.Ratings__Policies_and_Inclusions___Specials_Offers__Airport_transfer_offer,
                                         Ratings_SpecialOfferResortVoucher = a.Ratings__Policies_and_Inclusions___Special_Offers__Resort_voucher_offer,
                                         Ratings_SpecialOfferFlowers = a.Ratings__Policies_and_Inclusions___Special_Offers__Flowers_or_wine_on_arrival_offer,
                                         Ratings_SpecialOfferHoneymoon = a.Ratings__Policies_and_Inclusions___Special_Offers__Honeymoon_offer,
                                         Ratings_SpecialOfferOthers = a.Ratings__Policies_and_Inclusions___Special_Offers__Other_offers_including_details_and_validity,
                                         Activities_FeatureComplimentaryTouring = a.Activities___Feature_Activities__Complimentary_touring,
                                         Activities_FeatureOnsiteGolf = a.Activities___Feature_Activities__On_site_Golf,
                                         Activities_FeatureTennisCourt = a.Activities___Feature_Activities_On_site_full_size_tennis_court_s_,
                                         Activities_FeaturePrivateBeach = a.Activities___Feature_Activities_Private_Beach,
                                         Activities_FeaturePrivateGardens = a.Activities___Feature_Activities_Private_Gardens,
                                         Activities_FeatureEntertainment = a.Activities___Feature_Activities_Complimentary_on_site_entertainment,
                                         Activities_IndoorGuestLounge = a.Activities___Indoor_Pursuits__Guest_lounge,
                                         Activities_IndoorLibrary = a.Activities___Indoor_Pursuits__Library,
                                         Activities_IndoorBookSwap = a.Activities___Indoor_Pursuits__Book_Swap,
                                         Activities_IndoorGames = a.Activities___Indoor_Pursuits__Indoor_Games,
                                         Activities_IndoorOther = a.Activities___Indoor_Pursuits__Other_indoor_pursuits,
                                         Activities_OtherActivitiesCulinary = a.Activities___Other_Activities__On_site_culinary_activities,
                                         Activities_OtherActivitiesWater = a.Activities___Other_Activities__On_site_water_activities,
                                         Activities_OtherActivitiesOther = a.Activities___Other_Activities__On_site_other_activities,
                                         Activities_OtherActivitiesNearby = a.Activities___Other_Activities__Nearby_off_site__activities

                                     }),

                            productDescription = (from o in eConnect.pProduct_Option_Mappings
                                                  where o.Product_Id == prodId && o.Option_Id == 2
                                                  join coreDesc in eConnect.Benn_Product_Core_Description2s on o.Product_Option_Id equals coreDesc.Product_Option_Id
                                                  where coreDesc.Product_Desc_Type_Id == LongDescriptionTypeId
                                                  select coreDesc.Description)

                        


                        }).SingleOrDefault();

        try
        {
            if (prodInfo != null)
            {
                jsonData = JsonConvert.SerializeObject(prodInfo);
            }

        }
        catch (Exception ex)
        {
            jsonData = ex.Message;
        }

        return jsonData;

    }

    protected void Page_Load(object sender, EventArgs e)
    {

        Session["productid"] = Request.QueryString["productid"];
        Session["templateid"] = Request.QueryString["templateid"];
        DidgigoDB.BennelongDataContext dbconnect = DidgigoDB.connectDB();
        /*
       var a = (from cc in dbconnect.Content_Collection_Submissions_Text
                 join opt in dbconnect.Product_Option_Mapping on cc.Product_Option_Id equals opt.Product_Option_Id
                 where opt.Product_Id == 17734
                 select new
                 {
                     cc.Content_Collection_Id,
                     cc.Content_Collection_Submission_Text_Id,
                     cc.Submitted_Text,
                     cc.Complimentary,
                     cc.Product_Id,
                     cc.Product_Option_Id
                 });

        if (a != null)
        {
            Response.Write(a);
        }
        */
        /*
        if (Session["templateid"] == null)
        {
            Response.Redirect("index.html");
        }
        else {
            string template = Convert.ToString(Session["templateid"]);
            Response.Redirect( template);

        }*/
    }
}