<?php

date_default_timezone_set('Europe/London');

//TODO accept params from POST and find a way to process them for a query
//set sql login details
$servername = "localhost";
$username = "dev";
$password = "cctv4568";

//create PDO object
$conn = new PDO("mysql:host=$servername;dbname=devdata", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//search by shelf code
if (isset($_POST['shelfCode']) )
{
    //query database for provided shelf code, return nothing if shelf code is not found
    $shelfCode = $_POST['shelfCode'];
    //echo $test;
    $stmt = $conn->prepare("SELECT * FROM stock");
    $stmt->execute();

    $xml = new SimpleXMLElement('<responseData/>');
    $meta = $xml->addChild("meta",$stmt->rowCount());

    while($row = $stmt->fetch(PDO::FETCH_ASSOC))
    {
      $case = $xml->addChild("StockItem", $row['stockid']);
      $case->addChild("PartNumber", $row['partnumber']);
      $case->addChild("Location", $row['stockcode']);
      $case->addChild("Brand", $row['brand']);
      $case->addChild("ItemDesc", $row['itemdesc']);
      $case->addChild("CurrStock", $row['currstock']);
      $case->addChild("MinStock", $row['minstock']);
      $case->addChild("MaxStock", $row['maxstock']);
    }

    Header('Content-type: text/xml');
}
else {
  if (isset($_POST['searchDesc']))
  {
      //perform search based on posted critrea, possibly return pre-prepared blank
      //record if no result is found
      $searchDesc = $_POST['searchDesc'];

      $searchDesc = "%" . $searchDesc . "%";

      $stmt = $conn->prepare("SELECT * FROM stock WHERE itemdesc LIKE :searchDesc");
      $stmt->execute(['searchDesc' => $searchDesc]);

      $xml = new SimpleXMLElement('<responseData/>');
      $meta = $xml->addChild("meta",$stmt->rowCount());

      while($row = $stmt->fetch(PDO::FETCH_ASSOC))
      {
        $case = $xml->addChild("StockItem", $row['stockid']);
        $case->addChild("PartNumber", $row['partnumber']);
        $case->addChild("Location", $row['stockcode']);
        $case->addChild("Brand", $row['brand']);
        $case->addChild("ItemDesc", $row['itemdesc']);
        $case->addChild("CurrStock", $row['currstock']);
        $case->addChild("MinStock", $row['minstock']);
        $case->addChild("MaxStock", $row['maxstock']);
      }

      Header('Content-type: text/xml');
  }
  else {
    //prepare statement
    $stmt = $conn->prepare("SELECT * FROM stock");
    $stmt->execute();

    $xml = new SimpleXMLElement('<responseData/>');
    $meta = $xml->addChild("meta",$stmt->rowCount());

    while($row = $stmt->fetch(PDO::FETCH_ASSOC))
    {
      $case = $xml->addChild("StockItem", $row['stockid']);
      $case->addChild("PartNumber", $row['partnumber']);
      $case->addChild("Location", $row['stockcode']);
      $case->addChild("Brand", $row['brand']);
      $case->addChild("ItemDesc", $row['itemdesc']);
      $case->addChild("CurrStock", $row['currstock']);
      $case->addChild("MinStock", $row['minstock']);
      $case->addChild("MaxStock", $row['maxstock']);
    }

    Header('Content-type: text/xml');
  }
}

//search by keyword (WIP)





echo $xml->asXML();

?>
