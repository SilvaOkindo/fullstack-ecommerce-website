import paypal from "paypal-rest-sdk";
paypal.configure({
  mode: "sandbox",
  client_id:
    "AdNVJ9AyjuZ-DYf3hb_xJz66VGli31uQ-fNrJYuYx_iec4lqvBrw0xvHwurqaqqUWJDKr108dnKFzO8C",
  client_secret:
    "EKz-HZWfW4SEbdUMdF-ziCiicFrvUge6OdUELIagQcUGpU2ioiqXSl15Pj5HW-TzzeRD5Ns6_lPiRork",
});

export default paypal;
